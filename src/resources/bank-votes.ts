// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';

export class BankVotes extends APIResource {
  /**
   * This endpoint allows you to retrieve a paginated list of bank votes. You can
   * filter by bank ID, category, country, vote type (upvote or downvote), and other
   * parameters.
   */
  list(
    query: BankVoteListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BankVoteListResponsesCursorPage, BankVoteListResponse> {
    return this._client.getAPIList('/bank-votes', CursorPage<BankVoteListResponse>, { query, ...options });
  }
}

export type BankVoteListResponsesCursorPage = CursorPage<BankVoteListResponse>;

/**
 * The bank vote model contains voting information for banks, including the vote
 * direction. When fetching votes, the related bank and/or country data may
 * optionally be included in the response.
 */
export interface BankVoteListResponse {
  /**
   * The vote's auto-generated unique identifier.
   */
  id: string;

  /**
   * The ID of the bank for which the vote was cast.
   */
  bankId: string;

  /**
   * The category in which the vote was cast.
   */
  category:
    | 'CRYPTO_FRIENDLY'
    | 'CUSTOMER_SERVICE'
    | 'FEES_PRICING'
    | 'DIGITAL_EXPERIENCE'
    | 'SECURITY_TRUST'
    | 'ACCOUNT_FEATURES'
    | 'BRANCH_ATM_ACCESS'
    | 'INTERNATIONAL_BANKING'
    | 'BUSINESS_BANKING'
    | 'PROCESSING_SPEED'
    | 'TRANSPARENCY'
    | 'INNOVATION'
    | 'INVESTMENT_SERVICES'
    | 'LENDING';

  /**
   * The date and time the vote was created in Moon Banking.
   */
  createdAt: string;

  /**
   * Whether this is an upvote (`true`) or downvote (`false`).
   */
  isUp: boolean;

  /**
   * The date and time the vote was last updated in Moon Banking.
   */
  updatedAt: string;

  /**
   * The bank for which the vote was cast.
   */
  bank?: BankVoteListResponse.Bank;

  /**
   * The country in which the bank is located.
   */
  country?: BankVoteListResponse.Country;
}

export namespace BankVoteListResponse {
  /**
   * The bank for which the vote was cast.
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
  }

  /**
   * The country in which the bank is located.
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

export interface BankVoteListParams extends CursorPageParams {
  /**
   * The bank's auto-generated unique identifier.
   */
  bankId?: string;

  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `CRYPTO_FRIENDLY`, `CUSTOMER_SERVICE`, `FEES_PRICING`,
   * `DIGITAL_EXPERIENCE`, `SECURITY_TRUST`, `ACCOUNT_FEATURES`, `BRANCH_ATM_ACCESS`,
   * `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`,
   * `INNOVATION`, `INVESTMENT_SERVICES`, `LENDING`
   */
  categories?: string;

  /**
   * The country's ISO 3166-1 code (2 characters).
   */
  countryCode?: string;

  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `bank`, `country`
   */
  include?: string;

  /**
   * Whether to filter for upvotes (true) or downvotes (false).
   */
  isUp?: boolean;

  /**
   * Field to sort by.
   */
  sortBy?: 'createdAt';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';
}

export declare namespace BankVotes {
  export {
    type BankVoteListResponse as BankVoteListResponse,
    type BankVoteListResponsesCursorPage as BankVoteListResponsesCursorPage,
    type BankVoteListParams as BankVoteListParams,
  };
}
