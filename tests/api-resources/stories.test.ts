// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource stories', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.stories.retrieve('8HsY5nBc7jAqM4u');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieve: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.stories.retrieve(
        '8HsY5nBc7jAqM4u',
        { include: 'bank,country' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(MoonBanking.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.stories.list();
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('list: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.stories.list(
        {
          ending_before: '6jkxE4N8gHXgDPK',
          include: 'bank,country',
          limit: 20,
          search: 'customer service',
          sortBy: 'createdAt',
          sortOrder: 'asc',
          starting_after: '8HsY5nBc7jAqM4u',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(MoonBanking.NotFoundError);
  });
});
