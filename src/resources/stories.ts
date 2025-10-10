// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Stories extends APIResource {
  /**
   * This endpoint allows you to retrieve a specific story by providing the story ID.
   * You can include related data like bank and country information in the response.
   */
  retrieve(
    id: string,
    query: StoryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StoryRetrieveResponse> {
    return this._client.get(path`/stories/${id}`, { query, ...options });
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all stories. By
   * default, a maximum of ten stories are shown per page. You can search stories by
   * text content, sort them by various fields, and include related data like bank
   * and country information.
   */
  list(
    query: StoryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<StoryListResponsesCursorPage, StoryListResponse> {
    return this._client.getAPIList('/stories', CursorPage<StoryListResponse>, { query, ...options });
  }
}

export type StoryListResponsesCursorPage = CursorPage<StoryListResponse>;

export interface StoryRetrieveResponse {
  /**
   * The story model contains user-generated content about banks, as well as
   * information about the bank and country in which the bank is located.
   */
  data: StoryRetrieveResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace StoryRetrieveResponse {
  /**
   * The story model contains user-generated content about banks, as well as
   * information about the bank and country in which the bank is located.
   */
  export interface Data {
    /**
     * The story's auto-generated unique identifier.
     */
    id: string;

    /**
     * The ID of the bank this story is about.
     */
    bankId: string;

    /**
     * The date and time the story was created in Moon Banking.
     */
    createdAt: string;

    /**
     * An array of tags associated with this story for categorization and filtering.
     * Possible tags are `CRYPTO_FRIENDLY`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`,
     * `ACCOUNT_FEATURES`, `CUSTOMER_SERVICE`, `SECURITY_TRUST`, `BRANCH_ATM_ACCESS`,
     * `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`,
     * `INNOVATION`, `INVESTMENT_SERVICES` and `LENDING`.
     */
    tags: Array<string>;

    /**
     * The story content submitted by the user.
     */
    text: string;

    /**
     * The number of thumbs up votes for this story.
     */
    thumbsUpCount: number;

    /**
     * The date and time the story was last updated in Moon Banking.
     */
    updatedAt: string;

    /**
     * The bank about which the story was written.
     */
    bank?: Data.Bank;

    /**
     * The country of the bank about which the story was written.
     */
    country?: Data.Country;
  }

  export namespace Data {
    /**
     * The bank about which the story was written.
     */
    export interface Bank {
      /**
       * The bank's auto-generated unique identifier.
       */
      id: string;

      /**
       * The ID of the country where this bank is located.
       */
      countryId: string;

      /**
       * The bank's official name or display name.
       */
      name: string;

      /**
       * The bank's official website URL.
       */
      url?: string | null;
    }

    /**
     * The country of the bank about which the story was written.
     */
    export interface Country {
      /**
       * The country's auto-generated unique identifier.
       */
      id: string;

      /**
       * The country's ISO 3166-1 code (2 characters).
       */
      code: string;

      /**
       * The country's flag emoji representation.
       */
      emoji: string;

      /**
       * The country's official name. Must be unique across all countries.
       */
      name: string;
    }
  }
}

/**
 * The story model contains user-generated content about banks, as well as
 * information about the bank and country in which the bank is located.
 */
export interface StoryListResponse {
  /**
   * The story's auto-generated unique identifier.
   */
  id: string;

  /**
   * The ID of the bank this story is about.
   */
  bankId: string;

  /**
   * The date and time the story was created in Moon Banking.
   */
  createdAt: string;

  /**
   * An array of tags associated with this story for categorization and filtering.
   * Possible tags are `CRYPTO_FRIENDLY`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`,
   * `ACCOUNT_FEATURES`, `CUSTOMER_SERVICE`, `SECURITY_TRUST`, `BRANCH_ATM_ACCESS`,
   * `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`,
   * `INNOVATION`, `INVESTMENT_SERVICES` and `LENDING`.
   */
  tags: Array<string>;

  /**
   * The story content submitted by the user.
   */
  text: string;

  /**
   * The number of thumbs up votes for this story.
   */
  thumbsUpCount: number;

  /**
   * The date and time the story was last updated in Moon Banking.
   */
  updatedAt: string;

  /**
   * The bank about which the story was written.
   */
  bank?: StoryListResponse.Bank;

  /**
   * The country of the bank about which the story was written.
   */
  country?: StoryListResponse.Country;
}

export namespace StoryListResponse {
  /**
   * The bank about which the story was written.
   */
  export interface Bank {
    /**
     * The bank's auto-generated unique identifier.
     */
    id: string;

    /**
     * The ID of the country where this bank is located.
     */
    countryId: string;

    /**
     * The bank's official name or display name.
     */
    name: string;

    /**
     * The bank's official website URL.
     */
    url?: string | null;
  }

  /**
   * The country of the bank about which the story was written.
   */
  export interface Country {
    /**
     * The country's auto-generated unique identifier.
     */
    id: string;

    /**
     * The country's ISO 3166-1 code (2 characters).
     */
    code: string;

    /**
     * The country's flag emoji representation.
     */
    emoji: string;

    /**
     * The country's official name. Must be unique across all countries.
     */
    name: string;
  }
}

export interface StoryRetrieveParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `bank`, `country`
   */
  include?: string;
}

export interface StoryListParams extends CursorPageParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `bank`, `country`
   */
  include?: string;

  /**
   * Search stories by text content.
   */
  search?: string;

  /**
   * Field to sort by.
   */
  sortBy?: 'createdAt' | 'thumbsUpCount';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';
}

export declare namespace Stories {
  export {
    type StoryRetrieveResponse as StoryRetrieveResponse,
    type StoryListResponse as StoryListResponse,
    type StoryListResponsesCursorPage as StoryListResponsesCursorPage,
    type StoryRetrieveParams as StoryRetrieveParams,
    type StoryListParams as StoryListParams,
  };
}
