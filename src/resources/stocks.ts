// File generated from the OpenAPI spec. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import type { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, type PagePromise } from '../core/pagination';
import type { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils';

export class Stocks extends APIResource {
  /**
   * Retrieve a paginated list of stock listings. Search by ticker symbol, filter
   * by exact symbol, market, bank, or primary-listing status, and sort the
   * results.
   */
  list(
    query: StockListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<StockListResponsesCursorPage, StockListResponse> {
    return this._client.getAPIList<StockListResponse, StockListResponsesCursorPage>(
      '/stocks',
      CursorPage<StockListResponse>,
      { query, ...options },
    );
  }

  /**
   * Retrieve a stock listing by ID. Optionally include the associated `market`
   * and/or `bank` as nested objects.
   */
  get(
    id: string,
    query: StockGetParams | null | undefined = {},
    options?: RequestOptions,
  ): APIPromise<StockGetResponse> {
    return this._client.get<StockGetResponse>(path`/stocks/${id}`, { query, ...options });
  }
}

export type StockListResponsesCursorPage = CursorPage<StockListResponse>;

/**
 * The stock model contains identifying information for a stock listing,
 * including its ticker symbol, primary-listing flag, market, and the bank it
 * belongs to.
 */
export interface StockListResponse {
  /**
   * The stock's auto-generated unique identifier.
   */
  id: string;

  /**
   * The date and time the stock was created in Moon Banking.
   */
  createdAt: string;

  /**
   * Whether the stock is the primary stock of the bank.
   */
  isPrimary: boolean;

  /**
   * The date and time the stock was last updated in Moon Banking.
   */
  updatedAt: string;

  /**
   * The bank this stock listing belongs to.
   */
  bank?: StockListResponse.Bank;

  /**
   * The ID of the bank this stock belongs to.
   */
  bankId?: string | null;

  /**
   * The market model contains identifying information for a market, including its
   * name, code, type, and the country it belongs to.
   */
  market?: StockListResponse.Market;

  /**
   * The ID of the market this stock belongs to.
   */
  marketId?: string | null;

  /**
   * The symbol of the stock.
   */
  symbol?: string | null;
}

export namespace StockListResponse {
  /**
   * The bank this stock listing belongs to.
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
     * The bank's rank within the country. Based on the bank's overall score, which
     * is determined by user votes across all categories. Only banks with at least 10
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
     * The bank's official website URL.
     */
    url?: string | null;
  }

  /**
   * The market model contains identifying information for a market, including its
   * name, code, type, and the country it belongs to.
   */
  export interface Market {
    /**
     * The stock exchange's auto-generated unique identifier.
     */
    id: string;

    /**
     * The code of the stock exchange.
     */
    code: string;

    /**
     * The ID of the country this stock exchange belongs to.
     */
    countryId: string;

    /**
     * The date and time the stock exchange was created in Moon Banking.
     */
    createdAt: string;

    /**
     * Whether the market is supported by TradingView embeddable widgets.
     */
    isTvEmbeddable: boolean;

    /**
     * The name of the stock exchange.
     */
    name: string;

    /**
     * The type of market.
     */
    type: 'STOCK';

    /**
     * The date and time the stock exchange was last updated in Moon Banking.
     */
    updatedAt: string;

    /**
     * The TradingView code of the stock exchange. The value is null if the market is
     * not supported by TradingView embeddable widgets.
     */
    tvCode?: string | null;
  }
}

export interface StockGetResponse {
  /**
   * The stock model contains identifying information for a stock listing,
   * including its ticker symbol, primary-listing flag, market, and the bank it
   * belongs to.
   */
  data: StockGetResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace StockGetResponse {
  /**
   * The stock model contains identifying information for a stock listing,
   * including its ticker symbol, primary-listing flag, market, and the bank it
   * belongs to.
   */
  export interface Data {
    /**
     * The stock's auto-generated unique identifier.
     */
    id: string;

    /**
     * The date and time the stock was created in Moon Banking.
     */
    createdAt: string;

    /**
     * Whether the stock is the primary stock of the bank.
     */
    isPrimary: boolean;

    /**
     * The date and time the stock was last updated in Moon Banking.
     */
    updatedAt: string;

    /**
     * The bank this stock listing belongs to.
     */
    bank?: Data.Bank;

    /**
     * The ID of the bank this stock belongs to.
     */
    bankId?: string | null;

    /**
     * The market model contains identifying information for a market, including its
     * name, code, type, and the country it belongs to.
     */
    market?: Data.Market;

    /**
     * The ID of the market this stock belongs to.
     */
    marketId?: string | null;

    /**
     * The symbol of the stock.
     */
    symbol?: string | null;
  }

  export namespace Data {
    /**
     * The bank this stock listing belongs to.
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
       * The bank's rank within the country. Based on the bank's overall score, which
       * is determined by user votes across all categories. Only banks with at least 10
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
       * The bank's official website URL.
       */
      url?: string | null;
    }

    /**
     * The market model contains identifying information for a market, including its
     * name, code, type, and the country it belongs to.
     */
    export interface Market {
      /**
       * The stock exchange's auto-generated unique identifier.
       */
      id: string;

      /**
       * The code of the stock exchange.
       */
      code: string;

      /**
       * The ID of the country this stock exchange belongs to.
       */
      countryId: string;

      /**
       * The date and time the stock exchange was created in Moon Banking.
       */
      createdAt: string;

      /**
       * Whether the market is supported by TradingView embeddable widgets.
       */
      isTvEmbeddable: boolean;

      /**
       * The name of the stock exchange.
       */
      name: string;

      /**
       * The type of market.
       */
      type: 'STOCK';

      /**
       * The date and time the stock exchange was last updated in Moon Banking.
       */
      updatedAt: string;

      /**
       * The TradingView code of the stock exchange. The value is null if the market is
       * not supported by TradingView embeddable widgets.
       */
      tvCode?: string | null;
    }
  }
}

export interface StockListParams extends CursorPageParams {
  /**
   * Filter by the id of the bank this stock belongs to.
   */
  bankId?: string;

  /**
   * An optional comma-separated list of fields to include in the response.
   * Possible values: `market`, `bank`
   */
  include?: string;

  /**
   * Filter by whether the listing is the bank's primary stock.
   */
  isPrimary?: boolean;

  /**
   * Filter by the id of the market this stock trades on.
   */
  marketId?: string;

  /**
   * Search stocks by ticker symbol.
   */
  search?: string;

  /**
   * Field to sort by.
   */
  sortBy?: 'symbol' | 'createdAt';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by exact ticker symbol (case sensitive).
   */
  symbol?: string;
}

export interface StockGetParams {
  /**
   * An optional comma-separated list of fields to include in the response.
   * Possible values: `market`, `bank`
   */
  include?: string;
}

export declare namespace Stocks {
  export {
    type StockListResponse as StockListResponse,
    type StockGetResponse as StockGetResponse,
    type StockListResponsesCursorPage as StockListResponsesCursorPage,
    type StockListParams as StockListParams,
    type StockGetParams as StockGetParams,
  };
}
