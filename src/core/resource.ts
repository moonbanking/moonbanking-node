// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import type { MoonBanking } from '../client';

export abstract class APIResource {
  protected _client: MoonBanking;

  constructor(client: MoonBanking) {
    this._client = client;
  }
}
