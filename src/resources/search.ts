// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class Search extends APIResource {
  /**
   * Search across banks, countries, and stories. You can specify which entities to
   * search using the include parameter. If no include value is provided, all
   * entities will be searched.
   */
  get(query: SearchGetParams, options?: RequestOptions): APIPromise<SearchGetResponse> {
    return this._client.get('/search', { query, ...options });
  }
}

export interface SearchGetResponse {
  /**
   * The results of a search across banks, countries, and stories.
   */
  data: SearchGetResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace SearchGetResponse {
  /**
   * The results of a search across banks, countries, and stories.
   */
  export interface Data {
    /**
     * Array of search results for banks.
     */
    banks: Array<Data.Bank>;

    /**
     * Array of search results for countries.
     */
    countries: Array<Data.Country>;

    /**
     * Array of search results for stories.
     */
    stories: Array<Data.Story>;
  }

  export namespace Data {
    /**
     * The bank model contains information about financial institutions.
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
      country?: Bank.Country;

      /**
       * The bank's rank within the country. Based on the bank's overall score, which is
       * determined by user votes across all categories. Only banks with at least 10
       * votes are ranked.
       */
      countryRank?: number | null;

      /**
       * The bank's description in Markdown (md) format.
       */
      description?: string | null;

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
      scores?: Bank.Scores;

      /**
       * The bank's official website URL.
       */
      url?: string | null;
    }

    export namespace Bank {
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

    /**
     * The country model contains information about countries where banks operate.
     */
    export interface Country {
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
      scores?: Country.Scores;
    }

    export namespace Country {
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

    /**
     * The story model contains user-generated content about banks, as well as
     * information about the bank and country in which the bank is located.
     */
    export interface Story {
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
      bank?: Story.Bank;

      /**
       * The country of the bank about which the story was written.
       */
      country?: Story.Country;
    }

    export namespace Story {
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
}

export interface SearchGetParams {
  /**
   * Search query string.
   */
  q: string;

  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `banks`, `countries`, `stories`
   */
  include?: string;

  /**
   * Maximum number of results to return per entity type.
   */
  limit?: number;
}

export declare namespace Search {
  export { type SearchGetResponse as SearchGetResponse, type SearchGetParams as SearchGetParams };
}
