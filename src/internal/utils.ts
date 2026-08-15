import type { HeadersLike, Query } from './request-options';

/**
 * Small internal helpers. Kept dependency-free so the SDK runs unchanged on
 * Node, Deno, Bun, Cloudflare Workers and the Vercel Edge runtime.
 */

/** Read an environment variable across runtimes, returning `undefined` if unset. */
export const readEnv = (name: string): string | undefined => {
  try {
    const proc = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process;
    if (proc?.env) return proc.env[name]?.trim() || undefined;

    const deno = (globalThis as { Deno?: { env?: { get?: (key: string) => string | undefined } } })
      .Deno;
    if (deno?.env?.get) return deno.env.get(name)?.trim() || undefined;

    return undefined;
  } catch {
    return undefined;
  }
};

/** Return the value when it's a plain object, otherwise an empty object. */
export const maybeObj = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
};

export const isEmptyObj = (value: unknown): boolean =>
  !value || typeof value !== 'object' || Object.keys(value).length === 0;

export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

const uuidFallback = (): string =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });

export const uuid4 = (): string => {
  const cryptoObj = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (cryptoObj?.randomUUID) return cryptoObj.randomUUID();
  return uuidFallback();
};

/**
 * Tagged template for building paths with URL-encoded interpolations:
 *
 *     path`/banks/${id}` // => '/banks/6jkxE4N8gHXgDPK'
 */
export const path = (strings: TemplateStringsArray, ...values: Array<string | number>): string => {
  return strings.reduce((accumulator, part, index) => {
    if (index >= values.length) return accumulator + part;

    const value = values[index];
    if (value === undefined || value === null || value === '') {
      throw new Error(
        `Path parameter at position ${index} is required but was ${JSON.stringify(value)}.`,
      );
    }

    return accumulator + part + encodeURIComponent(String(value));
  }, '');
};

/** Serialise a query object into a URL search string (without the `?`). */
export const stringifyQuery = (query: Query): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query as Record<string, unknown>)) {
    if (value === undefined || value === null) continue;

    if (Array.isArray(value)) {
      for (const item of value) {
        if (item === undefined || item === null) continue;
        params.append(key, String(item));
      }
      continue;
    }

    // Nested objects are not part of the API surface, but serialising them as
    // JSON is more useful than "[object Object]".
    params.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
  }

  return params.toString();
};

/**
 * Merge header sources into a single `Headers` instance. Later sources win, and
 * an explicit `null` value removes a header entirely.
 */
export const buildHeaders = (sources: Array<HeadersLike>): Headers => {
  const result = new Headers();

  for (const source of sources) {
    if (!source) continue;

    const entries: Array<[string, string | null | undefined]> =
      source instanceof Headers ? [...source.entries()]
      : Array.isArray(source) ? source
      : Object.entries(source);

    for (const [key, value] of entries) {
      if (value === null) {
        result.delete(key);
        continue;
      }
      if (value === undefined) continue;
      result.set(key, value);
    }
  }

  return result;
};

/** Redact sensitive headers before they reach a logger. */
export const redactHeaders = (headers: Headers): Record<string, string> => {
  const sensitive = new Set(['authorization', 'cookie', 'set-cookie', 'x-api-key']);
  const result: Record<string, string> = {};

  for (const [key, value] of headers.entries()) {
    result[key] = sensitive.has(key.toLowerCase()) ? '***' : value;
  }

  return result;
};
