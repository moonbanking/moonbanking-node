// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { Moonbanking } from '../client';

export abstract class APIResource {
  protected _client: Moonbanking;

  constructor(client: Moonbanking) {
    this._client = client;
  }
}
