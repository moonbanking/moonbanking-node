// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { RequestOptions } from '../internal/request-options';

export class World extends APIResource {
  /**
   * This endpoint allows you to retrieve global overview data that aggregates banks
   * votes, stories and other data across all banks in all countries. You can include
   * related data like scores in the response.
   */
  get(query: WorldGetParams | null | undefined = {}, options?: RequestOptions): APIPromise<WorldGetResponse> {
    return this._client.get('/world', { query, ...options });
  }
}

export interface WorldGetResponse {
  /**
   * The world model contains global metrics for the entire Moon Banking platform.
   */
  data: WorldGetResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace WorldGetResponse {
  /**
   * The world model contains global metrics for the entire Moon Banking platform.
   */
  export interface Data {
    /**
     * The total number of banks Moon Banking tracks across all countries.
     */
    bankCount: number;

    /**
     * The total number of countries in which Moon Banking tracks banks.
     */
    countryCount: number;

    /**
     * The total number of stories submitted by users about banks across all countries.
     */
    storyCount: number;

    /**
     * The date and time when the world aggregates were last updated.
     */
    updatedAt: string;

    /**
     * Vote totals and scores for all banks across all categories. All votes are cast
     * by users.
     */
    scores?: Data.Scores;
  }

  export namespace Data {
    /**
     * Vote totals and scores for all banks across all categories. All votes are cast
     * by users.
     */
    export interface Scores {
      /**
       * Aggregate voting counts and score for account features category across all banks
       * globally.
       */
      accountFeatures: Scores.AccountFeatures;

      /**
       * Aggregate voting counts and score for branch & ATM access category across all
       * banks globally.
       */
      branchAtmAccess: Scores.BranchAtmAccess;

      /**
       * Aggregate voting counts and score for business banking category across all banks
       * globally.
       */
      businessBanking: Scores.BusinessBanking;

      /**
       * Aggregate voting counts and score for crypto-friendliness category across all
       * banks globally.
       */
      cryptoFriendly: Scores.CryptoFriendly;

      /**
       * Aggregate voting counts and score for customer service category across all banks
       * globally.
       */
      customerService: Scores.CustomerService;

      /**
       * Aggregate voting counts and score for digital experience category across all
       * banks globally.
       */
      digitalExperience: Scores.DigitalExperience;

      /**
       * Aggregate voting counts and score for fees & pricing category across all banks
       * globally.
       */
      feesPricing: Scores.FeesPricing;

      /**
       * Aggregate voting counts and score for innovation category across all banks
       * globally.
       */
      innovation: Scores.Innovation;

      /**
       * Aggregate voting counts and score for international banking category across all
       * banks globally.
       */
      internationalBanking: Scores.InternationalBanking;

      /**
       * Aggregate voting counts and score for investment services category across all
       * banks globally.
       */
      investmentServices: Scores.InvestmentServices;

      /**
       * Aggregate voting counts and score for lending category across all banks
       * globally.
       */
      lending: Scores.Lending;

      /**
       * Aggregate voting counts and score for all banks globally across all voting
       * categories.
       */
      overall: Scores.Overall;

      /**
       * Aggregate voting counts and score for processing speed category across all banks
       * globally.
       */
      processingSpeed: Scores.ProcessingSpeed;

      /**
       * Aggregate voting counts and score for security & trust category across all banks
       * globally.
       */
      securityTrust: Scores.SecurityTrust;

      /**
       * Aggregate voting counts and score for transparency category across all banks
       * globally.
       */
      transparency: Scores.Transparency;
    }

    export namespace Scores {
      /**
       * Aggregate voting counts and score for account features category across all banks
       * globally.
       */
      export interface AccountFeatures {
        /**
         * The total number of downvotes for account features across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the account features category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for account features across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for account features across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for branch & ATM access category across all
       * banks globally.
       */
      export interface BranchAtmAccess {
        /**
         * The total number of downvotes for branch & ATM access across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the branch & ATM access category globally, ranging from -100
         * to 100.
         */
        score: number;

        /**
         * The total number of votes for branch & ATM access across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for branch & ATM access across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for business banking category across all banks
       * globally.
       */
      export interface BusinessBanking {
        /**
         * The total number of downvotes for business banking across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the business banking category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for business banking across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for business banking across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for crypto-friendliness category across all
       * banks globally.
       */
      export interface CryptoFriendly {
        /**
         * The total number of downvotes for crypto-friendliness across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the crypto-friendliness category globally, ranging from -100
         * to 100.
         */
        score: number;

        /**
         * The total number of votes for crypto-friendliness across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for crypto-friendliness across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for customer service category across all banks
       * globally.
       */
      export interface CustomerService {
        /**
         * The total number of downvotes for customer service across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the customer service category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for customer service across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for customer service across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for digital experience category across all
       * banks globally.
       */
      export interface DigitalExperience {
        /**
         * The total number of downvotes for digital experience across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the digital experience category globally, ranging from -100
         * to 100.
         */
        score: number;

        /**
         * The total number of votes for digital experience across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for digital experience across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for fees & pricing category across all banks
       * globally.
       */
      export interface FeesPricing {
        /**
         * The total number of downvotes for fees & pricing across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the fees & pricing category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for fees & pricing across all banks in all countries.
         */
        total: number;

        /**
         * The total number of upvotes for fees & pricing across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for innovation category across all banks
       * globally.
       */
      export interface Innovation {
        /**
         * The total number of downvotes for innovation across all banks in all countries.
         */
        down: number;

        /**
         * The score for the innovation category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for innovation across all banks in all countries.
         */
        total: number;

        /**
         * The total number of upvotes for innovation across all banks in all countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for international banking category across all
       * banks globally.
       */
      export interface InternationalBanking {
        /**
         * The total number of downvotes for international banking across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the international banking category globally, ranging from -100
         * to 100.
         */
        score: number;

        /**
         * The total number of votes for international banking across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for international banking across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for investment services category across all
       * banks globally.
       */
      export interface InvestmentServices {
        /**
         * The total number of downvotes for investment services across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the investment services category globally, ranging from -100
         * to 100.
         */
        score: number;

        /**
         * The total number of votes for investment services across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for investment services across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for lending category across all banks
       * globally.
       */
      export interface Lending {
        /**
         * The total number of downvotes for lending across all banks in all countries.
         */
        down: number;

        /**
         * The score for the lending category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for lending across all banks in all countries.
         */
        total: number;

        /**
         * The total number of upvotes for lending across all banks in all countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for all banks globally across all voting
       * categories.
       */
      export interface Overall {
        /**
         * The total number of downvotes across all banks in all countries. This is the sum
         * of downvotes across all categories globally.
         */
        down: number;

        /**
         * The overall score across all banks in all countries across all categories,
         * ranging from -100 to 100. Based on upvotes and downvotes across all categories
         * and all banks globally.
         */
        score: number;

        /**
         * The total number of votes across all banks in all countries. This is the sum of
         * upvotes and downvotes across all categories and all banks globally.
         */
        total: number;

        /**
         * The total number of upvotes across all banks in all countries. This is the sum
         * of upvotes across all categories globally.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for processing speed category across all banks
       * globally.
       */
      export interface ProcessingSpeed {
        /**
         * The total number of downvotes for processing speed across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the processing speed category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for processing speed across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for processing speed across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for security & trust category across all banks
       * globally.
       */
      export interface SecurityTrust {
        /**
         * The total number of downvotes for security & trust across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the security & trust category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for security & trust across all banks in all
         * countries.
         */
        total: number;

        /**
         * The total number of upvotes for security & trust across all banks in all
         * countries.
         */
        up: number;
      }

      /**
       * Aggregate voting counts and score for transparency category across all banks
       * globally.
       */
      export interface Transparency {
        /**
         * The total number of downvotes for transparency across all banks in all
         * countries.
         */
        down: number;

        /**
         * The score for the transparency category globally, ranging from -100 to 100.
         */
        score: number;

        /**
         * The total number of votes for transparency across all banks in all countries.
         */
        total: number;

        /**
         * The total number of upvotes for transparency across all banks in all countries.
         */
        up: number;
      }
    }
  }
}

export interface WorldGetParams {
  /**
   * An optional comma-separated list of fields to include in the response. Possible
   * values: `scores`
   */
  include?: string;
}

export declare namespace World {
  export { type WorldGetResponse as WorldGetResponse, type WorldGetParams as WorldGetParams };
}
