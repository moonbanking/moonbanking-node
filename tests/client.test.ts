import { afterEach, describe, expect, it, vi } from 'vitest';

import MoonBanking, {
  APIConnectionTimeoutError,
  AuthenticationError,
  NotFoundError,
  RateLimitError,
} from '../src/index';

type FetchCall = { url: string; init: RequestInit };

const jsonResponse = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const stubFetch = (
  handler: (call: FetchCall) => Response | Promise<Response>,
): { fetch: typeof fetch; calls: FetchCall[] } => {
  const calls: FetchCall[] = [];

  const fetchImpl = (async (input: string | URL | Request, init?: RequestInit) => {
    const call = { url: String(input), init: init ?? {} };
    calls.push(call);
    return handler(call);
  }) as unknown as typeof fetch;

  return { fetch: fetchImpl, calls };
};

const successBody = {
  success: true,
  data: [],
  pagination: { hasMore: false, limit: 10, nextCursor: null },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe('MoonBanking client', () => {
  it('reads the bearer token from the environment by default', () => {
    process.env['MOON_BANKING_API_KEY'] = 'env-token';
    try {
      const client = new MoonBanking();
      expect(client).toBeInstanceOf(MoonBanking);
    } finally {
      delete process.env['MOON_BANKING_API_KEY'];
    }
  });

  it('sends the authorization header and hits the configured base URL', async () => {
    const { fetch, calls } = stubFetch(() => jsonResponse(successBody));
    const client = new MoonBanking({ bearerToken: 'secret-token', fetch });

    await client.bankVotes.list();

    expect(calls).toHaveLength(1);
    expect(calls[0]!.url).toContain('https://api.moonbanking.com/v1');

    const headers = new Headers(calls[0]!.init.headers);
    expect(headers.get('authorization')).toBe('Bearer secret-token');
    expect(headers.get('accept')).toBe('application/json');
  });

  it('honours a custom base URL', async () => {
    const { fetch, calls } = stubFetch(() => jsonResponse(successBody));
    const client = new MoonBanking({
      bearerToken: 'secret-token',
      baseURL: 'https://example.test/v9',
      fetch,
    });

    await client.bankVotes.list();

    expect(calls[0]!.url.startsWith('https://example.test/v9')).toBe(true);
  });

  it('exposes the raw response via asResponse()', async () => {
    const { fetch } = stubFetch(() => jsonResponse(successBody));
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    const response = await client.bankVotes.list().asResponse();

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toContain('application/json');
  });

  it('returns both body and response via withResponse()', async () => {
    const { fetch } = stubFetch(() => jsonResponse(successBody));
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    const { data, response } = await client.bankVotes.list().withResponse();

    expect(response.status).toBe(200);
    expect(data).toBeDefined();
  });
});

describe('error handling', () => {
  it('throws NotFoundError on a 404', async () => {
    const { fetch } = stubFetch(() => jsonResponse({ message: 'Not found' }, 404));
    const client = new MoonBanking({ bearerToken: 'token', fetch, maxRetries: 0 });

    await expect(client.bankVotes.list()).rejects.toBeInstanceOf(NotFoundError);
  });

  it('throws AuthenticationError on a 401', async () => {
    const { fetch } = stubFetch(() => jsonResponse({ message: 'Unauthorized' }, 401));
    const client = new MoonBanking({ bearerToken: 'bad', fetch, maxRetries: 0 });

    await expect(client.bankVotes.list()).rejects.toBeInstanceOf(AuthenticationError);
  });

  it('surfaces the status and message on the error', async () => {
    const { fetch } = stubFetch(() => jsonResponse({ message: 'Nope' }, 404));
    const client = new MoonBanking({ bearerToken: 'token', fetch, maxRetries: 0 });

    const error = await client.bankVotes.list().catch((err: unknown) => err);

    expect(error).toBeInstanceOf(NotFoundError);
    expect((error as NotFoundError).status).toBe(404);
    expect((error as NotFoundError).message).toContain('Nope');
  });

  it('retries retryable statuses up to maxRetries', async () => {
    let attempts = 0;
    const { fetch } = stubFetch(() => {
      attempts += 1;
      if (attempts < 3) return jsonResponse({ message: 'Slow down' }, 429);
      return jsonResponse(successBody);
    });

    const client = new MoonBanking({ bearerToken: 'token', fetch, maxRetries: 2 });

    await client.bankVotes.list();

    expect(attempts).toBe(3);
  });

  it('gives up once retries are exhausted', async () => {
    const { fetch } = stubFetch(() => jsonResponse({ message: 'Slow down' }, 429));
    const client = new MoonBanking({ bearerToken: 'token', fetch, maxRetries: 1 });

    await expect(client.bankVotes.list()).rejects.toBeInstanceOf(RateLimitError);
  });

  it('does not retry non-retryable statuses', async () => {
    let attempts = 0;
    const { fetch } = stubFetch(() => {
      attempts += 1;
      return jsonResponse({ message: 'Bad' }, 400);
    });

    const client = new MoonBanking({ bearerToken: 'token', fetch, maxRetries: 3 });

    await expect(client.bankVotes.list()).rejects.toThrow();
    expect(attempts).toBe(1);
  });

  it('times out slow requests', async () => {
    const fetchImpl = (async (_input: string | URL | Request, init?: RequestInit) => {
      return new Promise<Response>((_resolve, reject) => {
        init?.signal?.addEventListener('abort', () => {
          reject(new Error('aborted'));
        });
      });
    }) as unknown as typeof fetch;

    const client = new MoonBanking({
      bearerToken: 'token',
      fetch: fetchImpl,
      timeout: 10,
      maxRetries: 0,
    });

    await expect(client.bankVotes.list()).rejects.toBeInstanceOf(APIConnectionTimeoutError);
  });
});
