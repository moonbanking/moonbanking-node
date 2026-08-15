import type { BaseClient } from '../internal/base-client';

/** Base class for every generated resource namespace on the client. */
export class APIResource {
  protected _client: BaseClient;

  constructor(client: BaseClient) {
    this._client = client;
  }
}
