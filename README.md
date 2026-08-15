# Moon Banking API TypeScript and JavaScript SDK

[![NPM version](https://img.shields.io/npm/v/moonbanking.svg)](https://npmjs.org/package/moonbanking)

This library provides convenient access to the Moon Banking API from server-side TypeScript or JavaScript.

It is generated from our [OpenAPI specification](https://docs.moonbanking.com). The REST API documentation can be found on [docs.moonbanking.com](https://docs.moonbanking.com). The full API of this library can be found in [api.md](api.md).

## Installation

```sh
npm install moonbanking
```

```sh
pnpm add moonbanking
```

```sh
yarn add moonbanking
```

```sh
bun add moonbanking
```

## Usage

```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  bearerToken: process.env['MOON_BANKING_API_KEY'], // This is the default and can be omitted
});

const result = await client.banks.list();

console.log(result);
```

### Request & Response types

This library includes TypeScript definitions for all request params and response fields. You may import and use them like so:

```ts
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  bearerToken: process.env['MOON_BANKING_API_KEY'],
});

const params: MoonBanking.Banks.BankListParams = { limit: 20 };
const result = await client.banks.list(params);
```

Documentation for each method, request param, and response field is available in docstrings and will appear on hover in most modern editors.

## Handling errors

When the library is unable to connect to the API, or if the API returns a non-success status code (i.e., 4xx or 5xx response), a subclass of `APIError` will be thrown:

```ts
const result = await client.banks.list().catch(async (err) => {
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
| 409         | `ConflictError`            |
| 422         | `UnprocessableEntityError` |
| 429         | `RateLimitError`           |
| >=500       | `InternalServerError`      |
| N/A         | `APIConnectionError`       |

### Retries

Certain errors will be automatically retried 2 times by default, with a short exponential backoff. Connection errors (for example, due to a network connectivity problem), 408 Request Timeout, 409 Conflict, 429 Rate Limit, and >=500 Internal errors will all be retried by default.

You can use the `maxRetries` option to configure or disable this:

```ts
// Configure the default for all requests:
const client = new MoonBanking({
  maxRetries: 0, // default is 2
});

// Or, configure per-request:
await client.banks.list({}, { maxRetries: 5 });
```

### Timeouts

Requests time out after 20 seconds by default. You can configure this with a `timeout` option:

```ts
// Configure the default for all requests:
const client = new MoonBanking({
  timeout: 10 * 1000, // 10 seconds (default is 20 seconds)
});
```

On timeout, an `APIConnectionTimeoutError` is thrown.

Note that requests which time out will be retried twice by default.

## Auto-pagination

List methods are paginated. Use `for await … of` to iterate through items across all pages:

```ts
async function fetchAllBanks() {
  const all = [];
  // Automatically fetches more pages as needed.
  for await (const item of client.banks.list({ limit: 20 })) {
    all.push(item);
  }
  return all;
}
```

Alternatively, request a single page at a time:

```ts
let page = await client.banks.list({ limit: 20 });
for (const item of page.data) {
  console.log(item);
}

// Convenience methods are provided for manually paginating:
while (page.hasNextPage()) {
  page = await page.getNextPage();
}
```

## Advanced usage

### Accessing raw Response data (e.g., headers)

The "raw" `Response` returned by `fetch()` can be accessed through the `.asResponse()` method on the `APIPromise` type that all methods return. This method returns as soon as the headers for a successful response are received and does not consume the response body, so you are free to write custom parsing or streaming logic.

You can also use the `.withResponse()` method to get the raw `Response` along with the parsed data.

```ts
const client = new MoonBanking();

const response = await client.banks.list().asResponse();
console.log(response.headers.get('X-My-Header'));
console.log(response.statusText);

const { data, response: raw } = await client.banks.list().withResponse();
console.log(raw.headers.get('X-My-Header'));
console.log(data);
```

### Logging

> [!IMPORTANT]
> All log messages are intended for debugging only. The format and content of log messages may change between releases.

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

At the `'debug'` level, all HTTP requests and responses are logged. Authentication headers are redacted, but sensitive data in request and response bodies may still be visible.

#### Custom logger

By default, this library logs to `globalThis.console`. You can also provide a custom logger, such as [pino](https://github.com/pinojs/pino):

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

To modify proxy behavior, you can provide custom `fetchOptions` that add runtime-specific proxy options to requests:

```ts
// Node
import MoonBanking from 'moonbanking';
import * as undici from 'undici';

const proxyAgent = new undici.ProxyAgent('http://localhost:8888');
const client = new MoonBanking({
  fetchOptions: {
    dispatcher: proxyAgent,
  },
});
```

```ts
// Bun
import MoonBanking from 'moonbanking';

const client = new MoonBanking({
  fetchOptions: {
    proxy: 'http://localhost:8888',
  },
});
```

## Semantic versioning

This package generally follows [SemVer](https://semver.org/spec/v2.0.0.html) conventions, though certain backwards-incompatible changes may be released as minor versions:

1. Changes that only affect static types, without breaking runtime behavior.
2. Changes to library internals which are technically public but not intended or documented for external use.
3. Changes that we do not expect to impact the vast majority of users in practice.

We take backwards-compatibility seriously and work hard to ensure you can rely on a smooth upgrade experience.

## Requirements

TypeScript >= 4.9 is supported.

The following runtimes are supported:

- Node.js 20 LTS or later (non-EOL) versions.
- Deno v1.28.0 or higher.
- Bun 1.0 or later.
- Cloudflare Workers.
- Vercel Edge Runtime.
- Web browsers (although this library is meant to be used server-side).

## Contributing

This repository is generated from the Moon Banking API OpenAPI specification. See [CONTRIBUTING.md](CONTRIBUTING.md) — please do not edit these files directly.

Issues and feature requests are welcome at https://github.com/moonbanking/moonbanking-node/issues.
