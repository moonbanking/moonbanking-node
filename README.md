# Moon Banking TypeScript and JavaScript API Library

[![NPM version](<https://img.shields.io/npm/v/moonbanking.svg?label=npm%20(stable)>)](https://npmjs.org/package/moonbanking) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/moonbanking)

This library provides convenient access to the Moon Banking REST API from server-side TypeScript or JavaScript.

It is generated from our [OpenAPI specification](https://github.com/moonbanking/moonbanking-openapi) with [Stainless](https://www.stainless.com/).

The REST API documentation can be found on [docs.moonbanking.com](https://docs.moonbanking.com). The full API of this library can be found in [api.md](api.md).

## Installation

```sh
# npm
npm install --save moonbanking

# pnpm
pnpm add moonbanking

# yarn
yarn add moonbanking

# bun
bun add moonbanking
```

## Usage

The full API of this library can be found in [api.md](api.md).

<!-- prettier-ignore -->
```js
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  bearerToken: process.env['MOON_BANKING_API_KEY'],
});

const page = await client.banks.list();
const bankListResponse = page.data[0];

console.log(bankListResponse.id);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

<!-- prettier-ignore -->
```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  bearerToken: process.env['MOON_BANKING_API_KEY'],
});

const bankListResponse: MoonBanking.Banks.BankListResponsesCursorPage = await client.banks.list();

console.log(bankListResponse?.data?.[0]?.id);
```

Documentation for each method, request param, and response field are available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API,
or if the API returns a non-success status code (i.e., 4xx or 5xx response),
a subclass of `APIError` will be thrown:

<!-- prettier-ignore -->
```ts
const page = await client.banks.list().catch(async (err) => {
  if (err instanceof MoonBanking.APIError) {
    console.log(err.status); // 400
    console.log(err.name); // BadRequestError
    console.log(err.headers); // {server: 'nginx', ...}
  } else {
    throw err;
  }
});
```

Error codes are as follows:

| Status Code | Error Type                 |
| ----------- | -------------------------- |
| 400         | `BadRequestError`          |
| 401         | `AuthenticationError`      |
| 403         | `PermissionDeniedError`    |
| 404         | `NotFoundError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff.
Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict,
429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

<!-- prettier-ignore -->
```js
// Configure the default for all requests:
const client = new MoonBanking({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.banks.list({
  maxRetries: 5,
});
```

### Timeouts

The maximum timeout for requests to the Moon Banking API is 20 seconds. You can configure a shorter timeout with a `timeout` option:

<!-- prettier-ignore -->
```ts
// Configure the default for all requests:
const client = new MoonBanking({
  timeout: 10 * 1000, // 10 seconds (default is 20 seconds)
});

// Override per-request:
await client.banks.list({
  timeout: 5 * 1000,
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be [retried twice by default](#retries).

## Auto-pagination

List methods in the MoonBanking API are paginated.
You can use the `for await … of` syntax to iterate through items across all pages:

```ts
async function fetchAllBankListResponses(params) {
  const allBankListResponses = [];
  // Automatically fetches more pages as needed.
  for await (const bankListResponse of client.banks.list({
    limit: 20,
    starting_after: '6jkxE4N8gHXgDPK',
  })) {
    allBankListResponses.push(bankListResponse);
  }
  return allBankListResponses;
}
```

Alternatively, you can request a single page at a time:

```ts
let page = await client.banks.list({ limit: 20, starting_after: '6jkxE4N8gHXgDPK' });
for (const bankListResponse of page.data) {
  console.log(bankListResponse);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = await page.getNextPage();
  // ...
}
```

## Advanced Usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return.
This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.
Unlike `.asResponse()` this method consumes the body, returning once it is parsed.

<!-- prettier-ignore -->
```ts
const client = new MoonBanking();

const response = await client.banks.list().asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText); // access the underlying Response object

const { data: page, response: raw } = await client.banks.list().withResponse();
console.log(raw.headers.get('X-My-Header'));
for await (const bankListResponse of page) {
  console.log(bankListResponse.id);
}
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages
> may change between releases.

#### Log levels

The log level can be configured in two ways:

1. Via the `MOON_BANKING_LOG` environment variable
2. Using the `logLevel` client option (overrides the environment variable if set)

```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  logLevel: 'debug', // Show all log messages
});
```

Available log levels, from most to least verbose:

- `'debug'` - Show debug messages, info, warnings, and errors
- `'info'` - Show info messages, warnings, and errors
- `'warn'` - Show warnings and errors (default)
- `'error'` - Show only errors
- `'off'` - Disable all logging

At the `'debug'` level, all HTTP requests and responses are logged, including headers and bodies.
Some authentication-related headers are redacted, but sensitive data in request and response bodies
may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger.
Most logging libraries are supported, including [pino](https://www.npmjs.com/package/pino), [winston](https://www.npmjs.com/package/winston), [bunyan](https://www.npmjs.com/package/bunyan), [consola](https://www.npmjs.com/package/consola), [signale](https://www.npmjs.com/package/signale), and [@std/log](https://jsr.io/@std/log). If your logger doesn't work, please open an issue.

When providing a custom logger, the `logLevel` option still controls which messages are emitted, messages
below the configured level will not be sent to your logger.

```ts
import MoonBanking from 'moonbanking';
import pino from 'pino';

const logger = pino();

const client = new MoonBanking({
  logger: logger.child({ name: 'MoonBanking' }),
  logLevel: 'debug', // Send all messages to pino, allowing it to filter
});
```

### Customizing the fetch client

By default, this library expects a global `fetch` function is defined.

If you want to use a different `fetch` function, you can either polyfill the global:

```ts
import fetch from 'my-fetch';

globalThis.fetch = fetch;
```

Or pass it to the client:

```ts
import MoonBanking from 'moonbanking';
import fetch from 'my-fetch';

const client = new MoonBanking({ fetch });
```

### Fetch options

If you want to set custom `fetch` options without overriding the `fetch` function, you can provide a `fetchOptions` object when instantiating the client or making a request. (Request-specific options override client options.)

```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  fetchOptions: {
    // `RequestInit` options
  },
});
```

#### Configuring proxies

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy
options to requests:

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/node.svg" align="top" width="18" height="21"> **Node** <sup>[[docs](https://github.com/nodejs/undici/blob/main/docs/docs/api/ProxyAgent.md#example---proxyagent-with-fetch)]</sup>

```ts
import MoonBanking from 'moonbanking';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new MoonBanking({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/bun.svg" align="top" width="18" height="21"> **Bun** <sup>[[docs](https://bun.sh/guides/http/proxy)]</sup>

```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

<img src="https://raw.githubusercontent.com/stainless-api/sdk-assets/refs/heads/main/deno.svg" align="top" width="18" height="21"> **Deno** <sup>[[docs](https://docs.deno.com/api/deno/~/Deno.createHttpClient)]</sup>

```ts
import MoonBanking from 'npm:moonbanking';

const httpClient = Deno.createHttpClient({ proxy: { url: 'http://localhost:8888' } });
const client = new MoonBanking({
  fetchOptions: {
    client: httpClient,
  },
});
```

## Frequently Asked Questions

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use. _(Please open a GitHub issue to let us know if you are relying on such internals.)_
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

We are interested in your feedback. Please open an [issue](https://www.github.com/moonbanking/moonbanking-node/issues) with questions, bugs, or suggestions.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Web browsers (Up-to-date Chrome, Firefox, Safari, Edge, and more)
  - Although this library functions in browsers, it is meant to only be used on the server side.
- Node.js 20 LTS or later ([non-EOL](https://endoflife.date/nodejs)) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Jest 28 or greater with the `"node"` environment (`"jsdom"` is not supported at this time).
- Nitro v2.6 or greater.

Note that React Native is not supported at this time.

If you are interested in other runtime environments, please open or upvote an issue on GitHub.

## Contributing

See [the contributing documentation](./CONTRIBUTING.md).
