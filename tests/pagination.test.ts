import { describe, expect, it } from 'vitest';

import MoonBanking from '../src/index';

const jsonResponse = (body: unknown): Response =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  });

const page = (ids: string[]) => ({
  success: true,
  data: ids.map((id) => ({ id })),
  pagination: {
    hasMore: ids.length > 0,
    limit: ids.length,
    nextCursor: ids[ids.length - 1] ?? null,
  },
});

/** Serve a fixed sequence of pages, recording the URLs that were requested. */
const pagedFetch = (pages: string[][]) => {
  const urls: string[] = [];
  let index = 0;

  const fetchImpl = (async (input: string | URL | Request) => {
    urls.push(String(input));
    const ids = pages[index] ?? [];
    index += 1;
    return jsonResponse(page(ids));
  }) as unknown as typeof fetch;

  return { fetch: fetchImpl, urls };
};

describe('cursor pagination', () => {
  it('returns the first page of items', async () => {
    const { fetch } = pagedFetch([['a', 'b']]);
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    const result = await client.bankVotes.list();

    expect(result.data.map((item) => item.id)).toEqual(['a', 'b']);
  });

  it('auto-paginates with for await', async () => {
    const { fetch, urls } = pagedFetch([['a', 'b'], ['c'], []]);
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    const seen: string[] = [];
    for await (const item of client.bankVotes.list({ limit: 2 })) {
      seen.push(item.id);
    }

    expect(seen).toEqual(['a', 'b', 'c']);
    // The cursor of the last item on each page drives the next request.
    expect(urls[1]).toContain('starting_after=b');
    expect(urls[2]).toContain('starting_after=c');
  });

  it('supports manual paging via hasNextPage/getNextPage', async () => {
    const { fetch } = pagedFetch([['a'], ['b'], []]);
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    let current = await client.bankVotes.list({ limit: 1 });
    const seen = current.data.map((item) => item.id);

    while (current.hasNextPage()) {
      current = await current.getNextPage();
      seen.push(...current.data.map((item) => item.id));
    }

    expect(seen).toEqual(['a', 'b']);
  });

  it('reports no next page when a page comes back empty', async () => {
    const { fetch } = pagedFetch([[]]);
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    const result = await client.bankVotes.list();

    expect(result.hasNextPage()).toBe(false);
  });

  it('forwards query parameters', async () => {
    const { fetch, urls } = pagedFetch([['a']]);
    const client = new MoonBanking({ bearerToken: 'token', fetch });

    await client.bankVotes.list({ limit: 5 });

    expect(urls[0]).toContain('limit=5');
  });
});
