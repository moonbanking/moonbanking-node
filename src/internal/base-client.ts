import { APIPromise } from '../core/api-promise';
import {
  APIConnectionError,
  APIConnectionTimeoutError,
  APIError,
  APIUserAbortError,
} from '../core/error';
import {
  PagePromise,
  type AbstractPage,
  type PageConstructor,
  type PaginationClient,
} from '../core/pagination';
import { formatRequestDetails, loggerFor, parseLogLevel, type Logger, type LogLevel } from './log';
import { defaultParseResponse, type APIResponseProps } from './parse';
import type {
  FinalRequestOptions,
  HeadersLike,
  HTTPMethod,
  MergedRequestInit,
  Query,
  RequestOptions,
} from './request-options';
import { buildHeaders, isEmptyObj, readEnv, sleep, stringifyQuery, uuid4 } from './utils';

/** A `fetch`-compatible function. */
export type Fetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

export interface ClientOptions {
  /**
   * Defaults to process.env['MOON_BANKING_API_KEY'].
   */
  bearerToken?: string | undefined;

  /**
   * Override the default base URL for the API, e.g., "https://api.example.com/v2/"
   *
   * Defaults to process.env['MOON_BANKING_BASE_URL'].
   */
  baseURL?: string | null | undefined;

  /**
   * The maximum amount of time (in milliseconds) that the client should wait for a response
   * from the server before timing out a single request.
   *
   * Note that request timeouts are retried by default, so in a worst-case scenario you may wait
   * much longer than this timeout before the promise succeeds or fails.
   *
   * @unit milliseconds
   */
  timeout?: number | undefined;

  /**
   * Additional `RequestInit` options to be passed to `fetch` calls.
   * Properties will be overridden by per-request `fetchOptions`.
   */
  fetchOptions?: MergedRequestInit | undefined;

  /**
   * Specify a custom `fetch` function implementation.
   *
   * If not provided, we expect that `fetch` is defined globally.
   */
  fetch?: Fetch | undefined;

  /**
   * The maximum number of times that the client will retry a request in case of a
   * temporary failure, like a network error or a 5XX error from the server.
   *
   * @default 2
   */
  maxRetries?: number | undefined;

  /**
   * Default headers to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * header to `null` in request options.
   */
  defaultHeaders?: HeadersLike | undefined;

  /**
   * Default query parameters to include with every request to the API.
   *
   * These can be removed in individual requests by explicitly setting the
   * param to `undefined` in request options.
   */
  defaultQuery?: Query | undefined;

  /**
   * Set the log level.
   *
   * Defaults to process.env['MOON_BANKING_LOG'] or 'warn' if it isn't set.
   */
  logLevel?: LogLevel | undefined;

  /**
   * Set the logger.
   *
   * Defaults to globalThis.console.
   */
  logger?: Logger | undefined;
}

const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_INITIAL_RETRY_DELAY_MS = 500;
const MAX_RETRY_DELAY_MS = 8_000;

/**
 * Transport layer shared by every generated resource: URL building, auth,
 * retries, timeouts and logging.
 */
export abstract class BaseClient implements PaginationClient {
  baseURL: string;
  maxRetries: number;
  timeout: number;
  logger: Logger | undefined;
  logLevel: LogLevel;
  fetchOptions: MergedRequestInit | undefined;

  protected bearerToken: string | undefined;
  protected defaultHeadersOption: HeadersLike;
  protected defaultQueryOption: Query | undefined;
  protected fetchImpl: Fetch | undefined;

  constructor(options: ClientOptions & { defaultBaseURL: string; userAgent: string }) {
    const {
      defaultBaseURL,
      userAgent,
      bearerToken = readEnv('MOON_BANKING_API_KEY'),
      baseURL = readEnv('MOON_BANKING_BASE_URL'),
      timeout = DEFAULT_TIMEOUT_MS,
      maxRetries = DEFAULT_MAX_RETRIES,
      logLevel,
      logger,
      fetch: fetchImpl,
      fetchOptions,
      defaultHeaders,
      defaultQuery,
    } = options;

    this.baseURL = (baseURL || defaultBaseURL).replace(/\/+$/, '');
    this.timeout = timeout;
    this.maxRetries = maxRetries;
    this.logger = logger;
    this.logLevel = parseLogLevel(logLevel ?? readEnv('MOON_BANKING_LOG'), 'warn');
    this.fetchOptions = fetchOptions;
    this.fetchImpl = fetchImpl;
    this.bearerToken = bearerToken;
    this.defaultHeadersOption = defaultHeaders;
    this.defaultQueryOption = defaultQuery;
    this.userAgent = userAgent;
  }

  protected userAgent: string;

  /** Headers sent with every request. */
  protected buildRequestHeaders(options: FinalRequestOptions): Headers {
    return buildHeaders([
      {
        accept: 'application/json',
        'user-agent': this.userAgent,
        ...(this.bearerToken ? { authorization: `Bearer ${this.bearerToken}` } : {}),
        ...(options.body === undefined ? {} : { 'content-type': 'application/json' }),
      },
      this.defaultHeadersOption,
      options.headers,
    ]);
  }

  /** Build a fully-qualified URL for a request. */
  buildURL(path: string, query: Query | null | undefined, baseURL?: string): string {
    const base = (baseURL ?? this.baseURL).replace(/\/+$/, '');
    const url = new URL(`${base}${path.startsWith('/') ? path : `/${path}`}`);

    const merged: Query = { ...(this.defaultQueryOption ?? {}), ...(query ?? {}) };

    if (!isEmptyObj(merged)) {
      const search = stringifyQuery(merged);
      if (search.length > 0) url.search = url.search ? `${url.search}&${search}` : `?${search}`;
    }

    return url.toString();
  }

  protected getFetch(): Fetch {
    if (this.fetchImpl) return this.fetchImpl;

    const globalFetch = (globalThis as { fetch?: Fetch }).fetch;
    if (!globalFetch) {
      throw new Error(
        '`fetch` is not defined as a global; pass a `fetch` function to the client options.',
      );
    }

    return globalFetch;
  }

  /**
   * Whether a failed attempt is worth retrying. Mirrors the documented policy:
   * connection errors, 408, 409, 429 and 5xx.
   */
  protected shouldRetry(response: Response): boolean {
    const shouldRetryHeader = response.headers.get('x-should-retry');
    if (shouldRetryHeader === 'true') return true;
    if (shouldRetryHeader === 'false') return false;

    if (response.status === 408) return true;
    if (response.status === 409) return true;
    if (response.status === 429) return true;
    if (response.status >= 500) return true;

    return false;
  }

  /** Honour `retry-after` when present, else exponential backoff with jitter. */
  protected retryDelayMs(response: Response | undefined, retriesRemaining: number): number {
    const retryAfterMs = (() => {
      if (!response) return undefined;

      const retryAfterMsHeader = response.headers.get('retry-after-ms');
      if (retryAfterMsHeader) {
        const value = Number(retryAfterMsHeader);
        if (Number.isFinite(value)) return value;
      }

      const retryAfter = response.headers.get('retry-after');
      if (!retryAfter) return undefined;

      const seconds = Number(retryAfter);
      if (Number.isFinite(seconds)) return seconds * 1000;

      const date = Date.parse(retryAfter);
      if (!Number.isNaN(date)) return date - Date.now();

      return undefined;
    })();

    if (retryAfterMs !== undefined && retryAfterMs >= 0 && retryAfterMs < 60_000) {
      return retryAfterMs;
    }

    const attempt = Math.max(0, this.maxRetries - retriesRemaining);
    const backoff = Math.min(DEFAULT_INITIAL_RETRY_DELAY_MS * 2 ** attempt, MAX_RETRY_DELAY_MS);
    // Full jitter in the 75%-100% band keeps retries from synchronising.
    const jitter = 1 - Math.random() * 0.25;

    return backoff * jitter;
  }

  /** Execute a request, retrying transient failures. */
  async request(
    options: FinalRequestOptions,
    retriesRemaining?: number,
    requestLogID?: string,
  ): Promise<APIResponseProps> {
    const logger = loggerFor(this);
    const maxRetries = options.maxRetries ?? this.maxRetries;
    const remaining = retriesRemaining ?? maxRetries;
    const logID = requestLogID ?? `log_${uuid4().slice(0, 8)}`;

    const url = this.buildURL(options.path, options.query, options.baseURL);
    const headers = this.buildRequestHeaders(options);
    const body = options.body === undefined ? undefined : JSON.stringify(options.body);

    const controller = new AbortController();
    const timeout = options.timeout ?? this.timeout;

    if (options.signal) {
      if (options.signal.aborted) controller.abort();
      else options.signal.addEventListener('abort', () => controller.abort(), { once: true });
    }

    const timer =
      timeout > 0 ?
        setTimeout(() => {
          controller.abort(new APIConnectionTimeoutError());
        }, timeout)
      : undefined;

    const init: MergedRequestInit = {
      ...this.fetchOptions,
      ...options.fetchOptions,
      method: options.method.toUpperCase(),
      headers,
      body,
      signal: controller.signal,
    };

    logger.debug(
      'request',
      formatRequestDetails({
        requestLogID: logID,
        retriesRemaining: remaining,
        method: options.method,
        url,
        headers,
        body,
      }),
    );

    const startTime = Date.now();

    let response: Response;
    try {
      response = await this.getFetch()(url, init as RequestInit);
    } catch (error) {
      if (timer) clearTimeout(timer);

      if (options.signal?.aborted) {
        throw new APIUserAbortError();
      }

      if (controller.signal.aborted) {
        if (remaining > 0) {
          return this.retryRequest(options, remaining, logID, undefined);
        }
        throw new APIConnectionTimeoutError();
      }

      if (remaining > 0) {
        return this.retryRequest(options, remaining, logID, undefined);
      }

      throw new APIConnectionError({ message: 'Connection error.', cause: asError(error) });
    }

    if (timer) clearTimeout(timer);

    logger.debug(
      'response',
      formatRequestDetails({
        requestLogID: logID,
        retriesRemaining: remaining,
        method: options.method,
        url,
        status: response.status,
        headers: response.headers,
        durationMs: Date.now() - startTime,
      }),
    );

    if (!response.ok) {
      if (remaining > 0 && this.shouldRetry(response)) {
        return this.retryRequest(options, remaining, logID, response);
      }

      const errorBody = await safeParseErrorBody(response);
      const error = APIError.generate(
        response.status,
        errorBody,
        response.statusText,
        response.headers,
      );

      // Logged at debug only: the thrown error already tells the caller what
      // happened, so anything louder is duplicate noise at default settings.
      logger.debug(
        'request failed',
        formatRequestDetails({
          requestLogID: logID,
          method: options.method,
          url,
          status: response.status,
          message: error.message,
        }),
      );

      throw error;
    }

    return { response, options, controller };
  }

  private async retryRequest(
    options: FinalRequestOptions,
    retriesRemaining: number,
    requestLogID: string,
    response: Response | undefined,
  ): Promise<APIResponseProps> {
    const delay = this.retryDelayMs(response, retriesRemaining);

    loggerFor(this).info(
      'retrying request',
      formatRequestDetails({
        requestLogID,
        retriesRemaining: retriesRemaining - 1,
        method: options.method,
        url: this.buildURL(options.path, options.query, options.baseURL),
        durationMs: delay,
      }),
    );

    await sleep(delay);

    return this.request(options, retriesRemaining - 1, requestLogID);
  }

  protected methodRequest<Rsp>(
    method: HTTPMethod,
    path: string,
    options?: RequestOptions,
  ): APIPromise<Rsp> {
    const finalOptions: FinalRequestOptions = { ...options, method, path };
    return new APIPromise<Rsp>(this.request(finalOptions), defaultParseResponse);
  }

  get<Rsp>(path: string, options?: RequestOptions): APIPromise<Rsp> {
    return this.methodRequest<Rsp>('get', path, options);
  }

  post<Rsp>(path: string, options?: RequestOptions): APIPromise<Rsp> {
    return this.methodRequest<Rsp>('post', path, options);
  }

  put<Rsp>(path: string, options?: RequestOptions): APIPromise<Rsp> {
    return this.methodRequest<Rsp>('put', path, options);
  }

  patch<Rsp>(path: string, options?: RequestOptions): APIPromise<Rsp> {
    return this.methodRequest<Rsp>('patch', path, options);
  }

  delete<Rsp>(path: string, options?: RequestOptions): APIPromise<Rsp> {
    return this.methodRequest<Rsp>('delete', path, options);
  }

  /** Issue a `GET` that resolves to a page of results. */
  getAPIList<Item, PageClass extends AbstractPage<Item>>(
    path: string,
    Page: PageConstructor<PageClass>,
    options?: RequestOptions,
  ): PagePromise<PageClass, Item> {
    return this.requestAPIList(
      Page as never,
      {
        ...options,
        method: 'get',
        path,
      } as FinalRequestOptions,
    ) as unknown as PagePromise<PageClass, Item>;
  }

  requestAPIList(
    Page: PageConstructor<AbstractPage<unknown>>,
    options: FinalRequestOptions,
  ): PagePromise<AbstractPage<unknown>, unknown> {
    return new PagePromise(this, this.request(options), Page);
  }
}

const asError = (value: unknown): Error | undefined =>
  value instanceof Error ? value
  : value === undefined || value === null ? undefined
  : new Error(String(value));

/** Best-effort parse of an error body; never throws. */
const safeParseErrorBody = async (response: Response): Promise<unknown> => {
  try {
    const text = await response.text();
    if (!text) return undefined;

    try {
      return JSON.parse(text);
    } catch {
      return { message: text };
    }
  } catch {
    return undefined;
  }
};
