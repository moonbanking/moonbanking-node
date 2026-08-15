import type { FinalRequestOptions } from './request-options';

/** Everything the client knows about a completed HTTP exchange. */
export interface APIResponseProps {
  response: Response;
  options: FinalRequestOptions;
  controller: AbortController;
}

/**
 * Parse a successful response body.
 *
 * JSON responses are parsed; everything else is returned as text so callers can
 * still reach non-JSON endpoints. `204` and empty bodies resolve to `null`.
 */
export const defaultParseResponse = async <T,>(props: APIResponseProps): Promise<T> => {
  const { response } = props;

  if (response.status === 204) return null as T;

  const contentType = response.headers.get('content-type') ?? '';

  if (contentType.includes('json')) {
    const text = await response.text();
    if (text.length === 0) return null as T;

    try {
      return JSON.parse(text) as T;
    } catch (error) {
      throw new Error(`Could not parse JSON response body: ${String(error)}`);
    }
  }

  return (await response.text()) as unknown as T;
};
