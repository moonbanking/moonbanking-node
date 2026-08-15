/**
 * Error types raised by the MoonBanking client.
 *
 * This file is part of the generated SDK's static runtime.
 */

export class MoonBankingError extends Error {}

export class APIError<
  TStatus extends number | undefined = number | undefined,
  THeaders extends Headers | undefined = Headers | undefined,
  TError extends Record<string, unknown> | undefined = Record<string, unknown> | undefined,
> extends MoonBankingError {
  /** HTTP status code, or `undefined` if the request never completed. */
  readonly status: TStatus;
  /** Response headers, or `undefined` if the request never completed. */
  readonly headers: THeaders;
  /** Parsed response body, when the server returned one. */
  readonly error: TError;

  constructor(status: TStatus, error: TError, message: string | undefined, headers: THeaders) {
    super(APIError.makeMessage(status, error, message));
    this.status = status;
    this.headers = headers;
    this.error = error;
    this.name = new.target.name;
  }

  private static makeMessage(
    status: number | undefined,
    error: unknown,
    message: string | undefined,
  ): string {
    const body = (() => {
      if (!error || typeof error !== 'object') return undefined;
      const record = error as Record<string, unknown>;
      if (typeof record['message'] === 'string') return record['message'];
      const nested = record['error'];
      if (nested && typeof nested === 'object') {
        const nestedMessage = (nested as Record<string, unknown>)['message'];
        if (typeof nestedMessage === 'string') return nestedMessage;
      }
      if (typeof record['error'] === 'string') return record['error'];
      return undefined;
    })();

    const detail = body ?? message;

    if (status && detail) return `${status} ${detail}`;
    if (status) return `${status} status code (no body)`;
    if (detail) return detail;
    return '(no status code or body)';
  }

  static generate(
    status: number | undefined,
    errorResponse: unknown,
    message: string | undefined,
    headers: Headers | undefined,
  ): APIError {
    if (!status || !headers) {
      return new APIConnectionError({ message, cause: toError(errorResponse) });
    }

    const error = (errorResponse ?? undefined) as Record<string, unknown> | undefined;

    if (status === 400) return new BadRequestError(status, error, message, headers);
    if (status === 401) return new AuthenticationError(status, error, message, headers);
    if (status === 403) return new PermissionDeniedError(status, error, message, headers);
    if (status === 404) return new NotFoundError(status, error, message, headers);
    if (status === 409) return new ConflictError(status, error, message, headers);
    if (status === 422) return new UnprocessableEntityError(status, error, message, headers);
    if (status === 429) return new RateLimitError(status, error, message, headers);
    if (status >= 500) return new InternalServerError(status, error, message, headers);

    return new APIError(status, error, message, headers);
  }
}

const toError = (value: unknown): Error | undefined => {
  if (value instanceof Error) return value;
  if (value === undefined || value === null) return undefined;
  return new Error(String(value));
};

export class APIUserAbortError extends APIError<undefined, undefined, undefined> {
  constructor({ message }: { message?: string } = {}) {
    super(undefined, undefined, message || 'Request was aborted.', undefined);
  }
}

export class APIConnectionError extends APIError<undefined, undefined, undefined> {
  constructor({ message, cause }: { message?: string | undefined; cause?: Error | undefined }) {
    super(undefined, undefined, message || 'Connection error.', undefined);
    if (cause) this.cause = cause;
  }
}

export class APIConnectionTimeoutError extends APIConnectionError {
  constructor({ message }: { message?: string } = {}) {
    super({ message: message ?? 'Request timed out.' });
  }
}

export class BadRequestError extends APIError<400, Headers> {}

export class AuthenticationError extends APIError<401, Headers> {}

export class PermissionDeniedError extends APIError<403, Headers> {}

export class NotFoundError extends APIError<404, Headers> {}

export class ConflictError extends APIError<409, Headers> {}

export class UnprocessableEntityError extends APIError<422, Headers> {}

export class RateLimitError extends APIError<429, Headers> {}

export class InternalServerError extends APIError<number, Headers> {}
