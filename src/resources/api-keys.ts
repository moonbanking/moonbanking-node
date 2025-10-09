// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class APIKeys extends APIResource {
  /**
   * Create a new API key for the current user. Users can have 1 API key.
   *
   * @example
   * ```ts
   * const apiKey = await client.apiKeys.create({
   *   name: 'Production API Key',
   * });
   * ```
   */
  create(body: APIKeyCreateParams, options?: RequestOptions): APIPromise<APIKeyCreateResponse> {
    return this._client.post('/api-keys', { body, ...options });
  }
}

export interface APIKeyCreateResponse {
  /**
   * The API key model contains authentication tokens for users to access the public
   * API.
   */
  data: APIKeyCreateResponse.Data;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace APIKeyCreateResponse {
  /**
   * The API key model contains authentication tokens for users to access the public
   * API.
   */
  export interface Data {
    /**
     * The API key's auto-generated unique identifier.
     */
    id: string;

    /**
     * The date and time the API key was created.
     */
    createdAt: string;

    /**
     * The actual API key string used for authentication. This is a private, secret
     * key. Do not share it with anyone or use it in a public context.
     */
    key: string;

    /**
     * Name for the API key to help with identification.
     */
    name: string;

    /**
     * The date and time the API key was last updated.
     */
    updatedAt: string;

    /**
     * ISO 8601 date-time string
     */
    lastUsed?: string | null;
  }
}

export interface APIKeyCreateParams {
  /**
   * Name for the API key to help with identification.
   */
  name: string;
}

export declare namespace APIKeys {
  export { type APIKeyCreateResponse as APIKeyCreateResponse, type APIKeyCreateParams as APIKeyCreateParams };
}
