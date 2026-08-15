// File generated from the OpenAPI spec. See CONTRIBUTING.md for details.

import { BaseClient, type ClientOptions } from './internal/base-client';
import type { RequestOptions as ClientRequestOptions } from './internal/request-options';
import type { CursorPage, CursorPageParams, CursorPageResponse } from './core/pagination';
import * as Errors from './core/error';
import { VERSION } from './version';
import {
  BankVotes,
  type BankVoteListResponse,
  type BankVoteListResponsesCursorPage,
  type BankVoteListParams,
} from './resources/bank-votes';
import {
  Banks,
  type BankListResponse,
  type BankGetResponse,
  type BankGetByHostnameResponse,
  type BankSemanticSearchResponse,
  type BankListResponsesCursorPage,
  type BankListParams,
  type BankGetParams,
  type BankGetByHostnameParams,
  type BankSemanticSearchParams,
} from './resources/banks';
import {
  Countries,
  type CountryListResponse,
  type CountryGetResponse,
  type CountryListResponsesCursorPage,
  type CountryListParams,
  type CountryGetParams,
} from './resources/countries';
import {
  Markets,
  type MarketListResponse,
  type MarketGetResponse,
  type MarketListResponsesCursorPage,
  type MarketListParams,
} from './resources/markets';
import { Search, type SearchGetResponse, type SearchGetParams } from './resources/search';
import {
  Stocks,
  type StockListResponse,
  type StockGetResponse,
  type StockListResponsesCursorPage,
  type StockListParams,
  type StockGetParams,
} from './resources/stocks';
import {
  Stories,
  type StoryListResponse,
  type StoryGetResponse,
  type StoryListResponsesCursorPage,
  type StoryListParams,
  type StoryGetParams,
} from './resources/stories';
import { World, type WorldGetResponse, type WorldGetParams } from './resources/world';

/**
 * API client for the Moon Banking API.
 *
 * @example
 * ```ts
 * const client = new MoonBanking({
 *   bearerToken: process.env['MOON_BANKING_API_KEY'],
 * });
 * ```
 */
export class MoonBanking extends BaseClient {
  bankVotes: BankVotes;
  banks: Banks;
  countries: Countries;
  markets: Markets;
  search: Search;
  stocks: Stocks;
  stories: Stories;
  world: World;

  /**
   * The error classes thrown by this client, exposed as statics so they can be
   * used for `instanceof` checks without a separate import.
   */
  static MoonBankingError = Errors.MoonBankingError;
  static APIError = Errors.APIError;
  static APIConnectionError = Errors.APIConnectionError;
  static APIConnectionTimeoutError = Errors.APIConnectionTimeoutError;
  static APIUserAbortError = Errors.APIUserAbortError;
  static BadRequestError = Errors.BadRequestError;
  static AuthenticationError = Errors.AuthenticationError;
  static PermissionDeniedError = Errors.PermissionDeniedError;
  static NotFoundError = Errors.NotFoundError;
  static ConflictError = Errors.ConflictError;
  static UnprocessableEntityError = Errors.UnprocessableEntityError;
  static RateLimitError = Errors.RateLimitError;
  static InternalServerError = Errors.InternalServerError;

  /**
   * @param options - Client configuration. `bearerToken` defaults to
   * `process.env['MOON_BANKING_API_KEY']`.
   */
  constructor(options: ClientOptions = {}) {
    super({
      ...options,
      defaultBaseURL: 'https://api.moonbanking.com/v1',
      userAgent: `moonbanking/${VERSION}`,
    });

    this.bankVotes = new BankVotes(this);
    this.banks = new Banks(this);
    this.countries = new Countries(this);
    this.markets = new Markets(this);
    this.search = new Search(this);
    this.stocks = new Stocks(this);
    this.stories = new Stories(this);
    this.world = new World(this);
  }
}

export type { ClientOptions };

export declare namespace MoonBanking {
  // Re-exported under an alias rather than `type RequestOptions = RequestOptions`,
  // which would become a self-reference once declarations are bundled.
  export type { ClientRequestOptions as RequestOptions };

  export type {
    CursorPage as CursorPage,
    CursorPageParams as CursorPageParams,
    CursorPageResponse as CursorPageResponse,
  };

  export {
    BankVotes as BankVotes,
    type BankVoteListResponse as BankVoteListResponse,
    type BankVoteListResponsesCursorPage as BankVoteListResponsesCursorPage,
    type BankVoteListParams as BankVoteListParams,
  };

  export {
    Banks as Banks,
    type BankListResponse as BankListResponse,
    type BankGetResponse as BankGetResponse,
    type BankGetByHostnameResponse as BankGetByHostnameResponse,
    type BankSemanticSearchResponse as BankSemanticSearchResponse,
    type BankListResponsesCursorPage as BankListResponsesCursorPage,
    type BankListParams as BankListParams,
    type BankGetParams as BankGetParams,
    type BankGetByHostnameParams as BankGetByHostnameParams,
    type BankSemanticSearchParams as BankSemanticSearchParams,
  };

  export {
    Countries as Countries,
    type CountryListResponse as CountryListResponse,
    type CountryGetResponse as CountryGetResponse,
    type CountryListResponsesCursorPage as CountryListResponsesCursorPage,
    type CountryListParams as CountryListParams,
    type CountryGetParams as CountryGetParams,
  };

  export {
    Markets as Markets,
    type MarketListResponse as MarketListResponse,
    type MarketGetResponse as MarketGetResponse,
    type MarketListResponsesCursorPage as MarketListResponsesCursorPage,
    type MarketListParams as MarketListParams,
  };

  export {
    Search as Search,
    type SearchGetResponse as SearchGetResponse,
    type SearchGetParams as SearchGetParams,
  };

  export {
    Stocks as Stocks,
    type StockListResponse as StockListResponse,
    type StockGetResponse as StockGetResponse,
    type StockListResponsesCursorPage as StockListResponsesCursorPage,
    type StockListParams as StockListParams,
    type StockGetParams as StockGetParams,
  };

  export {
    Stories as Stories,
    type StoryListResponse as StoryListResponse,
    type StoryGetResponse as StoryGetResponse,
    type StoryListResponsesCursorPage as StoryListResponsesCursorPage,
    type StoryListParams as StoryListParams,
    type StoryGetParams as StoryGetParams,
  };

  export {
    World as World,
    type WorldGetResponse as WorldGetResponse,
    type WorldGetParams as WorldGetParams,
  };
}
