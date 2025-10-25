// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, PagePromise } from '../core/pagination';
import { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils/path';

export class Banks extends APIResource {
  /**
   * This endpoint allows you to retrieve a specific bank by providing the bank ID.
   * You can include related data like scores and country information in the
   * response.
   */
  retrieve(
    id: string,
    query: BankRetrieveParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<BankRetrieveResponse> {
    return this._client.get(path`/banks/${id}`, { query, ...options });
  }

  /**
   * This endpoint allows you to retrieve a paginated list of all banks. By default,
   * a maximum of ten banks are shown per page. You can search banks by name, filter
   * by country, sort them by various fields, and include related data like scores
   * and country information.
   */
  list(
    query: BankListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BankListResponsesCursorPage, BankListResponse> {
    return this._client.getAPIList('/banks', CursorPage<BankListResponse>, { query, ...options });
  }
}

export type BankListResponsesCursorPage = CursorPage<BankListResponse>;

export interface BankRetrieveResponse {
  /**
   * The bank model contains information about financial institutions.
   */
  data: BankRetrieveResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankRetrieveResponse {
  /**
   * The bank model contains information about financial institutions.
   */
  export interface Data {
    /**
     * The bank's auto-generated unique identifier.
     */
    id: string;

    /**
     * The ID of the country where this bank is located.
     */
    countryId: string;

    /**
     * The date and time the bank was created in Moon Banking.
     */
    createdAt: string;

    /**
     * The bank's official name or display name.
     */
    name: string;

    /**
     * The number of stories for this bank.
     */
    storiesCount: number;

    /**
     * The date and time the bank was last updated in Moon Banking.
     */
    updatedAt: string;

    /**
     * The country where the bank is located.
     */
    country?: Data.Country;

    /**
     * The bank's rank within the country. Based on the bank's overall score, which is
     * determined by user votes across all categories. Only banks with at least 10
     * votes are ranked.
     */
    countryRank?: number | null;

    /**
     * The bank's worldwide rank. Based on the bank's overall score, which is
     * determined by user votes across all categories. Only banks with at least 10
     * votes are ranked.
     */
    rank?: number | null;

    /**
     * Vote totals and scores for this bank across all categories. All votes are cast
     * by users.
     */
    scores?: Data.Scores;

    /**
     * The bank's official website URL.
     */
    url?: string | null;
  }

  export namespace Data {
    /**
     * The country where the bank is located.
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

    /**
     * Vote totals and scores for this bank across all categories. All votes are cast
     * by users.
     */
    export interface Scores {
      /**
       * Aggregate voting counts and score for account features category for this bank.
       */
      accountFeatures: Scores.AccountFeatures;

      /**
       * Aggregate voting counts and score for branch & ATM access category for this
       * bank.
       */
      branchAtmAccess: Scores.BranchAtmAccess;

      /**
       * Aggregate voting counts and score for business banking category for this bank.
       */
      businessBanking: Scores.BusinessBanking;

      /**
       * Aggregate voting counts and score for crypto-friendliness category for this
       * bank.
       */
      cryptoFriendly: Scores.CryptoFriendly;

      /**
       * Aggregate voting counts and score for customer service category for this bank.
       */
      customerService: Scores.CustomerService;

      /**
       * Aggregate voting counts and score for digital experience category for this bank.
       */
      digitalExperience: Scores.DigitalExperience;

      /**
       * Aggregate voting counts and score for fees & pricing category for this bank.
       */
      feesPricing: Scores.FeesPricing;

      /**
       * Aggregate voting counts and score for innovation category for this bank.
       */
      innovation: Scores.Innovation;

      /**
       * Aggregate voting counts and score for international banking category for this
       * bank.
       */
      internationalBanking: Scores.InternationalBanking;

      /**
       * Aggregate voting counts and score for investment services category for this
       * bank.
       */
      investmentServices: Scores.InvestmentServices;

      /**
       * Aggregate voting counts and score for lending category for this bank.
       */
      lending: Scores.Lending;

      /**
       * Aggregate voting counts and score for this bank across all voting categories.
       */
      overall: Scores.Overall;

      /**
       * Aggregate voting counts and score for processing speed category for this bank.
       */
      processingSpeed: Scores.ProcessingSpeed;

      /**
       * Aggregate voting counts and score for security & trust category for this bank.
       */
      securityTrust: Scores.SecurityTrust;

      /**
       * Aggregate voting counts and score for transparency category for this bank.
       */
      transparency: Scores.Transparency;
    }

    export namespace Scores {
      /**
       * Aggregate voting counts and score for account features category for this bank.
       */
      export interface AccountFeatures {
        /**
         * The total number of downvotes for account features for this bank.
         */
        down: number;

        /**
         * The score for the account features category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for account features for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for account features for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for branch & ATM access category for this
       * bank.
       */
      export interface BranchAtmAccess {
        /**
         * The total number of downvotes for branch & ATM access for this bank.
         */
        down: number;

        /**
         * The score for the branch & ATM access category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for branch & ATM access for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for branch & ATM access for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for business banking category for this bank.
       */
      export interface BusinessBanking {
        /**
         * The total number of downvotes for business banking for this bank.
         */
        down: number;

        /**
         * The score for the business banking category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for business banking for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for business banking for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for crypto-friendliness category for this
       * bank.
       */
      export interface CryptoFriendly {
        /**
         * The total number of downvotes for crypto-friendliness for this bank.
         */
        down: number;

        /**
         * The score for the crypto-friendliness category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for crypto-friendliness for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for crypto-friendliness for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for customer service category for this bank.
       */
      export interface CustomerService {
        /**
         * The total number of downvotes for customer service for this bank.
         */
        down: number;

        /**
         * The score for the customer service category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for customer service for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for customer service for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for digital experience category for this bank.
       */
      export interface DigitalExperience {
        /**
         * The total number of downvotes for digital experience for this bank.
         */
        down: number;

        /**
         * The score for the digital experience category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for digital experience for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for digital experience for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for fees & pricing category for this bank.
       */
      export interface FeesPricing {
        /**
         * The total number of downvotes for fees & pricing for this bank.
         */
        down: number;

        /**
         * The score for the fees & pricing category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for fees & pricing for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for fees & pricing for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for innovation category for this bank.
       */
      export interface Innovation {
        /**
         * The total number of downvotes for innovation for this bank.
         */
        down: number;

        /**
         * The score for the innovation category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for innovation for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for innovation for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for international banking category for this
       * bank.
       */
      export interface InternationalBanking {
        /**
         * The total number of downvotes for international banking for this bank.
         */
        down: number;

        /**
         * The score for the international banking category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for international banking for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for international banking for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for investment services category for this
       * bank.
       */
      export interface InvestmentServices {
        /**
         * The total number of downvotes for investment services for this bank.
         */
        down: number;

        /**
         * The score for the investment services category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for investment services for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for investment services for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for lending category for this bank.
       */
      export interface Lending {
        /**
         * The total number of downvotes for lending for this bank.
         */
        down: number;

        /**
         * The score for the lending category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for lending for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for lending for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for this bank across all voting categories.
       */
      export interface Overall {
        /**
         * The total number of downvotes for this bank. This is the sum of downvotes across
         * all categories.
         */
        down: number;

        /**
         * The overall score for this bank across all categories, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for this bank. This is the sum of upvotes and
         * downvotes across all categories.
         */
        total: number;

        /**
         * The total number of upvotes for this bank. This is the sum of upvotes across all
         * categories.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for processing speed category for this bank.
       */
      export interface ProcessingSpeed {
        /**
         * The total number of downvotes for processing speed for this bank.
         */
        down: number;

        /**
         * The score for the processing speed category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for processing speed for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for processing speed for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for security & trust category for this bank.
       */
      export interface SecurityTrust {
        /**
         * The total number of downvotes for security & trust for this bank.
         */
        down: number;

        /**
         * The score for the security & trust category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for security & trust for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for security & trust for this bank.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for transparency category for this bank.
       */
      export interface Transparency {
        /**
         * The total number of downvotes for transparency for this bank.
         */
        down: number;

        /**
         * The score for the transparency category, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for transparency for this bank.
         */
        total: number;

        /**
         * The total number of upvotes for transparency for this bank.
         */
        up: number;
      }
    }
  }
}

/**
 * The bank model contains information about financial institutions.
 */
export interface BankListResponse {
  /**
   * The bank's auto-generated unique identifier.
   */
  id: string;

  /**
   * The ID of the country where this bank is located.
   */
  countryId: string;

  /**
   * The date and time the bank was created in Moon Banking.
   */
  createdAt: string;

  /**
   * The bank's official name or display name.
   */
  name: string;

  /**
   * The number of stories for this bank.
   */
  storiesCount: number;

  /**
   * The date and time the bank was last updated in Moon Banking.
   */
  updatedAt: string;

  /**
   * The country where the bank is located.
   */
  country?: BankListResponse.Country;

  /**
   * The bank's rank within the country. Based on the bank's overall score, which is
   * determined by user votes across all categories. Only banks with at least 10
   * votes are ranked.
   */
  countryRank?: number | null;

  /**
   * The bank's worldwide rank. Based on the bank's overall score, which is
   * determined by user votes across all categories. Only banks with at least 10
   * votes are ranked.
   */
  rank?: number | null;

  /**
   * Vote totals and scores for this bank across all categories. All votes are cast
   * by users.
   */
  scores?: BankListResponse.Scores;

  /**
   * The bank's official website URL.
   */
  url?: string | null;
}

export namespace BankListResponse {
  /**
   * The country where the bank is located.
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

  /**
   * Vote totals and scores for this bank across all categories. All votes are cast
   * by users.
   */
  export interface Scores {
    /**
     * Aggregate voting counts and score for account features category for this bank.
     */
    accountFeatures: Scores.AccountFeatures;

    /**
     * Aggregate voting counts and score for branch & ATM access category for this
     * bank.
     */
    branchAtmAccess: Scores.BranchAtmAccess;

    /**
     * Aggregate voting counts and score for business banking category for this bank.
     */
    businessBanking: Scores.BusinessBanking;

    /**
     * Aggregate voting counts and score for crypto-friendliness category for this
     * bank.
     */
    cryptoFriendly: Scores.CryptoFriendly;

    /**
     * Aggregate voting counts and score for customer service category for this bank.
     */
    customerService: Scores.CustomerService;

    /**
     * Aggregate voting counts and score for digital experience category for this bank.
     */
    digitalExperience: Scores.DigitalExperience;

    /**
     * Aggregate voting counts and score for fees & pricing category for this bank.
     */
    feesPricing: Scores.FeesPricing;

    /**
     * Aggregate voting counts and score for innovation category for this bank.
     */
    innovation: Scores.Innovation;

    /**
     * Aggregate voting counts and score for international banking category for this
     * bank.
     */
    internationalBanking: Scores.InternationalBanking;

    /**
     * Aggregate voting counts and score for investment services category for this
     * bank.
     */
    investmentServices: Scores.InvestmentServices;

    /**
     * Aggregate voting counts and score for lending category for this bank.
     */
    lending: Scores.Lending;

    /**
     * Aggregate voting counts and score for this bank across all voting categories.
     */
    overall: Scores.Overall;

    /**
     * Aggregate voting counts and score for processing speed category for this bank.
     */
    processingSpeed: Scores.ProcessingSpeed;

    /**
     * Aggregate voting counts and score for security & trust category for this bank.
     */
    securityTrust: Scores.SecurityTrust;

    /**
     * Aggregate voting counts and score for transparency category for this bank.
     */
    transparency: Scores.Transparency;
  }

  export namespace Scores {
    /**
     * Aggregate voting counts and score for account features category for this bank.
     */
    export interface AccountFeatures {
      /**
       * The total number of downvotes for account features for this bank.
       */
      down: number;

      /**
       * The score for the account features category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for account features for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for account features for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for branch & ATM access category for this
     * bank.
     */
    export interface BranchAtmAccess {
      /**
       * The total number of downvotes for branch & ATM access for this bank.
       */
      down: number;

      /**
       * The score for the branch & ATM access category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for branch & ATM access for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for branch & ATM access for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for business banking category for this bank.
     */
    export interface BusinessBanking {
      /**
       * The total number of downvotes for business banking for this bank.
       */
      down: number;

      /**
       * The score for the business banking category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for business banking for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for business banking for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for crypto-friendliness category for this
     * bank.
     */
    export interface CryptoFriendly {
      /**
       * The total number of downvotes for crypto-friendliness for this bank.
       */
      down: number;

      /**
       * The score for the crypto-friendliness category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for crypto-friendliness for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for crypto-friendliness for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for customer service category for this bank.
     */
    export interface CustomerService {
      /**
       * The total number of downvotes for customer service for this bank.
       */
      down: number;

      /**
       * The score for the customer service category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for customer service for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for customer service for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for digital experience category for this bank.
     */
    export interface DigitalExperience {
      /**
       * The total number of downvotes for digital experience for this bank.
       */
      down: number;

      /**
       * The score for the digital experience category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for digital experience for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for digital experience for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for fees & pricing category for this bank.
     */
    export interface FeesPricing {
      /**
       * The total number of downvotes for fees & pricing for this bank.
       */
      down: number;

      /**
       * The score for the fees & pricing category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for fees & pricing for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for fees & pricing for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for innovation category for this bank.
     */
    export interface Innovation {
      /**
       * The total number of downvotes for innovation for this bank.
       */
      down: number;

      /**
       * The score for the innovation category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for innovation for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for innovation for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for international banking category for this
     * bank.
     */
    export interface InternationalBanking {
      /**
       * The total number of downvotes for international banking for this bank.
       */
      down: number;

      /**
       * The score for the international banking category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for international banking for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for international banking for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for investment services category for this
     * bank.
     */
    export interface InvestmentServices {
      /**
       * The total number of downvotes for investment services for this bank.
       */
      down: number;

      /**
       * The score for the investment services category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for investment services for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for investment services for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for lending category for this bank.
     */
    export interface Lending {
      /**
       * The total number of downvotes for lending for this bank.
       */
      down: number;

      /**
       * The score for the lending category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for lending for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for lending for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for this bank across all voting categories.
     */
    export interface Overall {
      /**
       * The total number of downvotes for this bank. This is the sum of downvotes across
       * all categories.
       */
      down: number;

      /**
       * The overall score for this bank across all categories, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for this bank. This is the sum of upvotes and
       * downvotes across all categories.
       */
      total: number;

      /**
       * The total number of upvotes for this bank. This is the sum of upvotes across all
       * categories.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for processing speed category for this bank.
     */
    export interface ProcessingSpeed {
      /**
       * The total number of downvotes for processing speed for this bank.
       */
      down: number;

      /**
       * The score for the processing speed category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for processing speed for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for processing speed for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for security & trust category for this bank.
     */
    export interface SecurityTrust {
      /**
       * The total number of downvotes for security & trust for this bank.
       */
      down: number;

      /**
       * The score for the security & trust category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for security & trust for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for security & trust for this bank.
       */
      up: number;
    }

    /**
     * Aggregate voting counts and score for transparency category for this bank.
     */
    export interface Transparency {
      /**
       * The total number of downvotes for transparency for this bank.
       */
      down: number;

      /**
       * The score for the transparency category, ranging from -100 to 100.
       */
      score: number;

      /**
       * The total number of votes for transparency for this bank.
       */
      total: number;

      /**
       * The total number of upvotes for transparency for this bank.
       */
      up: number;
    }
  }
}

export interface BankRetrieveParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `scores`, `country`
   */
  include?: string;
}

export interface BankListParams extends CursorPageParams {
  /**
   * Only return banks in the specified country. A country's code is the ISO 3166-1
   * code for the country. If both `countryId` and `countryCode` are provided,
   * `countryId` will be used.
   */
  countryCode?: string;

  /**
   * Only return banks in the specified country. A country's ID is Moon Banking's
   * unique identifier for the country.
   */
  countryId?: string;

  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `scores`, `country`
   */
  include?: string;

  /**
   * Search banks by name.
   */
  search?: string;

  /**
   * Field to sort by.
   */
  sortBy?:
    | 'name'
    | 'rank'
    | 'countryRank'
    | 'storiesCount'
    | 'countryId'
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

export declare namespace Banks {
  export {
    type BankRetrieveResponse as BankRetrieveResponse,
    type BankListResponse as BankListResponse,
    type BankListResponsesCursorPage as BankListResponsesCursorPage,
    type BankRetrieveParams as BankRetrieveParams,
    type BankListParams as BankListParams,
  };
}
