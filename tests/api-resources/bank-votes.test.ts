// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import Moonbanking from 'moonbanking';

const client = new Moonbanking({
  bearerToken: 'My Bearer Token',
  baseURL: process.env['TEST_API_BASE_URL'] ?? 'http://127.0.0.1:4010',
});

describe('resource bankVotes', () => {
  // Prism tests are disabled
  test.skip('list', async () => {
    const responsePromise = client.bankVotes.list();
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
      client.bankVotes.list(
        {
          bankId: '6jkxE4N8gHXgDPK',
          categories:
            'CRYPTO_FRIENDLY,CUSTOMER_SERVICE,FEES_PRICING,DIGITAL_EXPERIENCE,SECURITY_TRUST,ACCOUNT_FEATURES,BRANCH_ATM_ACCESS,INTERNATIONAL_BANKING,BUSINESS_BANKING,PROCESSING_SPEED,TRANSPARENCY,INNOVATION,INVESTMENT_SERVICES,LENDING',
          countryCode: 'US',
          ending_before: '6jkxE4N8gHXgDPK',
          include: 'bank,country',
          isUp: true,
          limit: 20,
          sortBy: 'createdAt',
          sortOrder: 'desc',
          starting_after: '8HsY5nBc7jAqM4u',
        },
        { path: '/_stainless_unknown_path' },
      ),
    ).rejects.toThrow(Moonbanking.NotFoundError);
  });
});
