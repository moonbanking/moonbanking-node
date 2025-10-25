// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Countries extends APIResource {
  /**
   * This endpoint allows you to retrieve a specific country by providing the
   * 2-letter ISO country code. You can include related data like scores in the
   * response.
   */
  retrieve(
    code: string,
    query: CountryRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<CountryRetrieveResponse> {
    return this._client.get(path`/countries/${code}`, { query, ...options });
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all countries. By
   * default, a maximum of ten countries are shown per page. You can search countries
   * by name or 2-letter code, sort them by various fields, and include related data
   * like scores.
   */
  list(
    query: CountryListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<CountryListResponsesCursorPage, CountryListResponse> {
    return this._client.getAPIList('/countries', CursorPage<CountryListResponse>, { query, ...options });
  }
}

export type CountryListResponsesCursorPage = CursorPage<CountryListResponse>;

export interface CountryRetrieveResponse {
  /**
   * The country model contains information about countries where banks operate.
   */
  data: CountryRetrieveResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace CountryRetrieveResponse {
  /**
   * The country model contains information about countries where banks operate.
   */
  export interface Data {
    /**
     * The country's auto-generated unique identifier.
     */
    id: string;

    /**
     * The number of banks in the country.
     */
    banksCount: number;

    /**
     * The country's ISO 3166-1 code (2 characters).
     */
    code: string;

    /**
     * The date and time the country was created in Moon Banking.
     */
    createdAt: string;

    /**
     * The country's flag emoji representation.
     */
    emoji: string;

    /**
     * The country's official name. Must be unique across all countries.
     */
    name: string;

    /**
     * The number of stories for the country.
     */
    storiesCount: number;

    /**
     * The date and time the country was last updated in Moon Banking.
     */
    updatedAt: string;

    /**
     * The country's worldwide rank. Based on the country's overall score, which is
     * determined by user votes across all categories for all banks in the country.
     * Only countries with at least 25 votes are ranked.
     */
    rank?: number | null;

    /**
     * Vote totals and scores for this bank across all categories. All votes are cast
     * by users.
     */
    scores?: Data.Scores;
  }

  export namespace Data {
    /**
     * Vote totals and scores for this bank across all categories. All votes are cast
     * by users.
     */
    export interface Scores {
      /**
       * Aggregate voting counts and score for account features category for all banks in
       * the country.
       */
      accountFeatures: Scores.AccountFeatures;

      /**
       * Aggregate voting counts and score for branch & ATM access category for all banks
       * in the country.
       */
      branchAtmAccess: Scores.BranchAtmAccess;

      /**
       * Aggregate voting counts and score for business banking category for all banks in
       * the country.
       */
      businessBanking: Scores.BusinessBanking;

      /**
       * Aggregate voting counts and score for crypto-friendliness category for all banks
       * in the country.
       */
      cryptoFriendly: Scores.CryptoFriendly;

      /**
       * Aggregate voting counts and score for customer service category for all banks in
       * the country.
       */
      customerService: Scores.CustomerService;

      /**
       * Aggregate voting counts and score for digital experience category for all banks
       * in the country.
       */
      digitalExperience: Scores.DigitalExperience;

      /**
       * Aggregate voting counts and score for fees & pricing category for all banks in
       * the country.
       */
      feesPricing: Scores.FeesPricing;

      /**
       * Aggregate voting counts and score for innovation category for all banks in the
       * country.
       */
      innovation: Scores.Innovation;

      /**
       * Aggregate voting counts and score for international banking category for all
       * banks in the country.
       */
      internationalBanking: Scores.InternationalBanking;

      /**
       * Aggregate voting counts and score for investment services category for all banks
       * in the country.
       */
      investmentServices: Scores.InvestmentServices;

      /**
       * Aggregate voting counts and score for lending category for all banks in the
       * country.
       */
      lending: Scores.Lending;

      /**
       * Aggregate voting counts and score for all banks in the country across all voting
       * categories.
       */
      overall: Scores.Overall;

      /**
       * Aggregate voting counts and score for processing speed category for all banks in
       * the country.
       */
      processingSpeed: Scores.ProcessingSpeed;

      /**
       * Aggregate voting counts and score for security & trust category for all banks in
       * the country.
       */
      securityTrust: Scores.SecurityTrust;

      /**
       * Aggregate voting counts and score for transparency category for all banks in the
       * country.
       */
      transparency: Scores.Transparency;
    }

    export namespace Scores {
      /**
       * Aggregate voting counts and score for account features category for all banks in
       * the country.
       */
      export interface AccountFeatures {
        /**
         * The total number of downvotes for account features for banks in the country.
         */
        down: number;

        /**
         * The score for the account features category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for account features for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for account features for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for branch & ATM access category for all banks
       * in the country.
       */
      export interface BranchAtmAccess {
        /**
         * The total number of downvotes for branch & ATM access for banks in the country.
         */
        down: number;

        /**
         * The score for the branch & ATM access category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for branch & ATM access for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for branch & ATM access for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for business banking category for all banks in
       * the country.
       */
      export interface BusinessBanking {
        /**
         * The total number of downvotes for business banking for banks in the country.
         */
        down: number;

        /**
         * The score for the business banking category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for business banking for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for business banking for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for crypto-friendliness category for all banks
       * in the country.
       */
      export interface CryptoFriendly {
        /**
         * The total number of downvotes for crypto-friendliness for banks in the country.
         */
        down: number;

        /**
         * The score for the crypto-friendliness category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for crypto-friendliness for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for crypto-friendliness for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for customer service category for all banks in
       * the country.
       */
      export interface CustomerService {
        /**
         * The total number of downvotes for customer service for banks in the country.
         */
        down: number;

        /**
         * The score for the customer service category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for customer service for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for customer service for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for digital experience category for all banks
       * in the country.
       */
      export interface DigitalExperience {
        /**
         * The total number of downvotes for digital experience for banks in the country.
         */
        down: number;

        /**
         * The score for the digital experience category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for digital experience for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for digital experience for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for fees & pricing category for all banks in
       * the country.
       */
      export interface FeesPricing {
        /**
         * The total number of downvotes for fees & pricing for banks in the country.
         */
        down: number;

        /**
         * The score for the fees & pricing category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for fees & pricing for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for fees & pricing for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for innovation category for all banks in the
       * country.
       */
      export interface Innovation {
        /**
         * The total number of downvotes for innovation for banks in the country.
         */
        down: number;

        /**
         * The score for the innovation category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for innovation for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for innovation for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for international banking category for all
       * banks in the country.
       */
      export interface InternationalBanking {
        /**
         * The total number of downvotes for international banking for banks in the
         * country.
         */
        down: number;

        /**
         * The score for the international banking category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for international banking for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for international banking for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for investment services category for all banks
       * in the country.
       */
      export interface InvestmentServices {
        /**
         * The total number of downvotes for investment services for banks in the country.
         */
        down: number;

        /**
         * The score for the investment services category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for investment services for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for investment services for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for lending category for all banks in the
       * country.
       */
      export interface Lending {
        /**
         * The total number of downvotes for lending for banks in the country.
         */
        down: number;

        /**
         * The score for the lending category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for lending for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for lending for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for all banks in the country across all voting
       * categories.
       */
      export interface Overall {
        /**
         * The total number of downvotes for banks in the country. This is the sum of
         * downvotes across all categories.
         */
        down: number;

        /**
         * The overall score for banks in the country across all categories, ranging from
         * -100 to 100. Based on upvotes and downvotes across all categories and all banks
         * in the country.
         */
        score: number;

        /**
         * The total number of votes for banks in the country. This is the sum of upvotes
         * and downvotes across all categories and all banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for banks in the country. This is the sum of upvotes
         * across all categories.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for processing speed category for all banks in
       * the country.
       */
      export interface ProcessingSpeed {
        /**
         * The total number of downvotes for processing speed for banks in the country.
         */
        down: number;

        /**
         * The score for the processing speed category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for processing speed for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for processing speed for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for security & trust category for all banks in
       * the country.
       */
      export interface SecurityTrust {
        /**
         * The total number of downvotes for security & trust for banks in the country.
         */
        down: number;

        /**
         * The score for the security & trust category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for security & trust for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for security & trust for banks in the country.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for transparency category for all banks in the
       * country.
       */
      export interface Transparency {
        /**
         * The total number of downvotes for transparency for banks in the country.
         */
        down: number;

        /**
         * The score for the transparency category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for transparency for banks in the country.
         */
        total: number;

        /**
         * The total number of upvotes for transparency for banks in the country.
         */
        up: number;
      }
    }
  }
}

/**
 * The country model contains information about countries where banks operate.
 */
export interface CountryListResponse {
  /**
   * The country's auto-generated unique identifier.
   */
  id: string;

  /**
   * The number of banks in the country.
   */
  banksCount: number;

  /**
   * The country's ISO 3166-1 code (2 characters).
   */
  code: string;

  /**
   * The date and time the country was created in Moon Banking.
   */
  createdAt: string;

  /**
   * The country's flag emoji representation.
   */
  emoji: string;

  /**
   * The country's official name. Must be unique across all countries.
   */
  name: string;

  /**
   * The number of stories for the country.
   */
  storiesCount: number;

  /**
   * The date and time the country was last updated in Moon Banking.
   */
  updatedAt: string;

  /**
   * The country's worldwide rank. Based on the country's overall score, which is
   * determined by user votes across all categories for all banks in the country.
   * Only countries with at least 25 votes are ranked.
   */
  rank?: number | null;

  /**
   * Vote totals and scores for this bank across all categories. All votes are cast
   * by users.
   */
  scores?: CountryListResponse.Scores;
}

export namespace CountryListResponse {
  /**
   * Vote totals and scores for this bank across all categories. All votes are cast
   * by users.
   */
  export interface Scores {
    /**
     * Aggregate voting counts and score for account features category for all banks in
     * the country.
     */
    accountFeatures: Scores.AccountFeatures;

    /**
     * Aggregate voting counts and score for branch & ATM access category for all banks
     * in the country.
     */
    branchAtmAccess: Scores.BranchAtmAccess;

    /**
     * Aggregate voting counts and score for business banking category for all banks in
     * the country.
     */
    businessBanking: Scores.BusinessBanking;

    /**
     * Aggregate voting counts and score for crypto-friendliness category for all banks
     * in the country.
     */
    cryptoFriendly: Scores.CryptoFriendly;

    /**
     * Aggregate voting counts and score for customer service category for all banks in
     * the country.
     */
    customerService: Scores.CustomerService;

    /**
     * Aggregate voting counts and score for digital experience category for all banks
     * in the country.
     */
    digitalExperience: Scores.DigitalExperience;

    /**
     * Aggregate voting counts and score for fees & pricing category for all banks in
     * the country.
     */
    feesPricing: Scores.FeesPricing;

    /**
     * Aggregate voting counts and score for innovation category for all banks in the
     * country.
     */
    innovation: Scores.Innovation;

    /**
     * Aggregate voting counts and score for international banking category for all
     * banks in the country.
     */
    internationalBanking: Scores.InternationalBanking;

    /**
     * Aggregate voting counts and score for investment services category for all banks
     * in the country.
     */
    investmentServices: Scores.InvestmentServices;

    /**
     * Aggregate voting counts and score for lending category for all banks in the
     * country.
     */
    lending: Scores.Lending;

    /**
     * Aggregate voting counts and score for all banks in the country across all voting
     * categories.
     */
    overall: Scores.Overall;

    /**
     * Aggregate voting counts and score for processing speed category for all banks in
     * the country.
     */
    processingSpeed: Scores.ProcessingSpeed;

    /**
     * Aggregate voting counts and score for security & trust category for all banks in
     * the country.
     */
    securityTrust: Scores.SecurityTrust;

    /**
     * Aggregate voting counts and score for transparency category for all banks in the
     * country.
     */
    transparency: Scores.Transparency;
  }

  export namespace Scores {
    /**
     * Aggregate voting counts and score for account features category for all banks in
     * the country.
     */
    export interface AccountFeatures {
      /**
       * The total number of downvotes for account features for banks in the country.
       */
      down: number;

      /**
       * The score for the account features category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for account features for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for account features for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for branch & ATM access category for all banks
     * in the country.
     */
    export interface BranchAtmAccess {
      /**
       * The total number of downvotes for branch & ATM access for banks in the country.
       */
      down: number;

      /**
       * The score for the branch & ATM access category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for branch & ATM access for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for branch & ATM access for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for business banking category for all banks in
     * the country.
     */
    export interface BusinessBanking {
      /**
       * The total number of downvotes for business banking for banks in the country.
       */
      down: number;

      /**
       * The score for the business banking category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for business banking for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for business banking for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for crypto-friendliness category for all banks
     * in the country.
     */
    export interface CryptoFriendly {
      /**
       * The total number of downvotes for crypto-friendliness for banks in the country.
       */
      down: number;

      /**
       * The score for the crypto-friendliness category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for crypto-friendliness for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for crypto-friendliness for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for customer service category for all banks in
     * the country.
     */
    export interface CustomerService {
      /**
       * The total number of downvotes for customer service for banks in the country.
       */
      down: number;

      /**
       * The score for the customer service category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for customer service for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for customer service for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for digital experience category for all banks
     * in the country.
     */
    export interface DigitalExperience {
      /**
       * The total number of downvotes for digital experience for banks in the country.
       */
      down: number;

      /**
       * The score for the digital experience category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for digital experience for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for digital experience for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for fees & pricing category for all banks in
     * the country.
     */
    export interface FeesPricing {
      /**
       * The total number of downvotes for fees & pricing for banks in the country.
       */
      down: number;

      /**
       * The score for the fees & pricing category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for fees & pricing for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for fees & pricing for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for innovation category for all banks in the
     * country.
     */
    export interface Innovation {
      /**
       * The total number of downvotes for innovation for banks in the country.
       */
      down: number;

      /**
       * The score for the innovation category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for innovation for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for innovation for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for international banking category for all
     * banks in the country.
     */
    export interface InternationalBanking {
      /**
       * The total number of downvotes for international banking for banks in the
       * country.
       */
      down: number;

      /**
       * The score for the international banking category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for international banking for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for international banking for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for investment services category for all banks
     * in the country.
     */
    export interface InvestmentServices {
      /**
       * The total number of downvotes for investment services for banks in the country.
       */
      down: number;

      /**
       * The score for the investment services category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for investment services for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for investment services for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for lending category for all banks in the
     * country.
     */
    export interface Lending {
      /**
       * The total number of downvotes for lending for banks in the country.
       */
      down: number;

      /**
       * The score for the lending category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for lending for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for lending for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for all banks in the country across all voting
     * categories.
     */
    export interface Overall {
      /**
       * The total number of downvotes for banks in the country. This is the sum of
       * downvotes across all categories.
       */
      down: number;

      /**
       * The overall score for banks in the country across all categories, ranging from
       * -100 to 100. Based on upvotes and downvotes across all categories and all banks
       * in the country.
       */
      score: number;

      /**
       * The total number of votes for banks in the country. This is the sum of upvotes
       * and downvotes across all categories and all banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for banks in the country. This is the sum of upvotes
       * across all categories.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for processing speed category for all banks in
     * the country.
     */
    export interface ProcessingSpeed {
      /**
       * The total number of downvotes for processing speed for banks in the country.
       */
      down: number;

      /**
       * The score for the processing speed category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for processing speed for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for processing speed for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for security & trust category for all banks in
     * the country.
     */
    export interface SecurityTrust {
      /**
       * The total number of downvotes for security & trust for banks in the country.
       */
      down: number;

      /**
       * The score for the security & trust category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for security & trust for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for security & trust for banks in the country.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for transparency category for all banks in the
     * country.
     */
    export interface Transparency {
      /**
       * The total number of downvotes for transparency for banks in the country.
       */
      down: number;

      /**
       * The score for the transparency category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for transparency for banks in the country.
       */
      total: number;

      /**
       * The total number of upvotes for transparency for banks in the country.
       */
      up: number;
    }
  }
}

export interface CountryRetrieveParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `scores`
   */
  include?: string;
}

export interface CountryListParams extends CursorPageParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `scores`
   */
  include?: string;

  /**
   * Search countries by name or 2-letter code.
   */
  search?: string;

  /**
   * Field to sort by.
   */
  sortBy?:
    | 'name'
    | 'code'
    | 'rank'
    | 'banksCount'
    | 'storiesCount'
    | 'overall_score'
    | 'overall_total'
    | 'overall_up'
    | 'overall_down'
    | 'cryptoFriendly_score'
    | 'cryptoFriendly_total'
    | 'cryptoFriendly_up'
    | 'cryptoFriendly_down'
    | 'customerService_score'
    | 'customerService_total'
    | 'customerService_up'
    | 'customerService_down'
    | 'feesPricing_score'
    | 'feesPricing_total'
    | 'feesPricing_up'
    | 'feesPricing_down'
    | 'digitalExperience_score'
    | 'digitalExperience_total'
    | 'digitalExperience_up'
    | 'digitalExperience_down'
    | 'securityTrust_score'
    | 'securityTrust_total'
    | 'securityTrust_up'
    | 'securityTrust_down'
    | 'accountFeatures_score'
    | 'accountFeatures_total'
    | 'accountFeatures_up'
    | 'accountFeatures_down'
    | 'branchAtmAccess_score'
    | 'branchAtmAccess_total'
    | 'branchAtmAccess_up'
    | 'branchAtmAccess_down'
    | 'internationalBanking_score'
    | 'internationalBanking_total'
    | 'internationalBanking_up'
    | 'internationalBanking_down'
    | 'businessBanking_score'
    | 'businessBanking_total'
    | 'businessBanking_up'
    | 'businessBanking_down'
    | 'processingSpeed_score'
    | 'processingSpeed_total'
    | 'processingSpeed_up'
    | 'processingSpeed_down'
    | 'transparency_score'
    | 'transparency_total'
    | 'transparency_up'
    | 'transparency_down'
    | 'innovation_score'
    | 'innovation_total'
    | 'innovation_up'
    | 'innovation_down'
    | 'investmentServices_score'
    | 'investmentServices_total'
    | 'investmentServices_up'
    | 'investmentServices_down'
    | 'lending_score'
    | 'lending_total'
    | 'lending_up'
    | 'lending_down';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';
}

export declare namespace Countries {
  export {
    type CountryRetrieveResponse as CountryRetrieveResponse,
    type CountryListResponse as CountryListResponse,
    type CountryListResponsesCursorPage as CountryListResponsesCursorPage,
    type CountryRetrieveParams as CountryRetrieveParams,
    type CountryListParams as CountryListParams,
  };
}
