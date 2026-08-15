/**
 * Request option types shared by the client and its resources.
 */

export type HTTPMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

/** Header values; `null` removes a default header for a single request. */
export type HeadersLike =
  | Headers
  | Record<string, string | null | undefined>
  | Array<[string, string]>
  | undefined;

export type QueryValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Array<string | number | boolean>;

/**
 * Query parameters.
 *
 * Typed as `object` rather than an index-signature record so that the generated
 * `*Params` interfaces are assignable without each one declaring an index
 * signature.
 */
export type Query = object;

export type MergedRequestInit = RequestInit & {
  /** Runtime-specific options, e.g. undici's `dispatcher` or Bun's `proxy`. */
  [key: string]: unknown;
};

export interface RequestOptions {
  /** Per-request override for the number of retries. */
  maxRetries?: number;
  /** Per-request timeout in milliseconds. */
  timeout?: number;
  /** Additional headers for this request. */
  headers?: HeadersLike;
  /** Additional query parameters for this request. */
  query?: Query | null | undefined;
  /** Abort signal for this request. */
  signal?: AbortSignal | null | undefined;
  /** Additional `RequestInit` options for this request. */
  fetchOptions?: MergedRequestInit;
  /** Override the base URL for this request. */
  baseURL?: string;
  /** JSON request body. */
  body?: unknown;
}

export interface FinalRequestOptions extends RequestOptions {
  method: HTTPMethod;
  path: string;
}
