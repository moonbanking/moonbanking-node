// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import MoonBanking from 'moon-banking';

const client = new MoonBanking({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource banks', () => {
  // Prism tests are disabled
  test.skip('retrieve', async () => {
    const responsePromise = client.banks.retrieve('6jkxE4N8gHXgDPK');
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
      client.banks.retrieve(
        '6jkxE4N8gHXgDPK',
        { include: 'scores,country' },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(MoonBanking.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.banks.list();
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
      client.banks.list(
        {
          countryCode: 'US',
          countryId: '454hfjsjuusbf',
          include: 'scores,country,paginationTotal',
          limit: 20,
          offset: 0,
          search: 'Fidelity',
          sortBy: 'name',
          sortOrder: 'asc',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(MoonBanking.NotFoundError);
  });

  // Prism tests are disabled
  test.skip('retrieveStories', async () => {
    const responsePromise = client.banks.retrieveStories('6jkxE4N8gHXgDPK');
    const rawResponse = await responsePromise.asResponse();
    expect(rawResponse).toBeInstanceOf(Response);
    const response = await responsePromise;
    expect(response).not.toBeInstanceOf(Response);
    const dataAndResponse = await responsePromise.withResponse();
    expect(dataAndResponse.data).toBe(response);
    expect(dataAndResponse.response).toBe(rawResponse);
  });

  // Prism tests are disabled
  test.skip('retrieveStories: request options and params are passed correctly', async () => {
    // ensure the request options are being passed correctly by passing an invalid HTTP method in order to cause an error
    await expect(
      client.banks.retrieveStories(
        '6jkxE4N8gHXgDPK',
        {
          include: 'paginationTotal',
          limit: 20,
          offset: 0,
          search: 'customer service',
          sortBy: 'createdAt',
          sortOrder: 'desc',
          tags: 'CRYPTO_FRIENDLY,CUSTOMER_SERVICE,FEES_PRICING,DIGITAL_EXPERIENCE,SECURITY_TRUST,ACCOUNT_FEATURES,BRANCH_ATM_ACCESS,INTERNATIONAL_BANKING,BUSINESS_BANKING,PROCESSING_SPEED,TRANSPARENCY,INNOVATION,INVESTMENT_SERVICES,LENDING',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(MoonBanking.NotFoundError);
  });
});
