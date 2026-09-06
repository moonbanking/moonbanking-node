// File generated from the OpenAPI spec. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import type { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, type PagePromise } from '../core/pagination';
import type { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils';

export class Markets extends APIResource {
  /**
   * Retrieve a paginated list of markets, such as stock exchanges. Search by name
   * or code, filter by exact code, country, or market type, and sort the results.
   */
  list(
    query: MarketListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<MarketListResponsesCursorPage, MarketListResponse> {
    return this._client.getAPIList<MarketListResponse, MarketListResponsesCursorPage>(
      '/markets',
      CursorPage<MarketListResponse>,
      { query, ...options },
    );
  }

  /**
   * Retrieve a market, such as a stock exchange, by ID.
   */
  get(id: string, options?: RequestOptions): APIPromise<MarketGetResponse> {
    return this._client.get<MarketGetResponse>(path`/markets/${id}`, options);
  }
}

export type MarketListResponsesCursorPage = CursorPage<MarketListResponse>;

/**
 * The market model contains identifying information for a market, including its
 * name, code, type, and the country it belongs to.
 */
export interface MarketListResponse {
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

export interface MarketGetResponse {
  /**
   * The market model contains identifying information for a market, including its
   * name, code, type, and the country it belongs to.
   */
  data: MarketGetResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace MarketGetResponse {
  /**
   * The market model contains identifying information for a market, including its
   * name, code, type, and the country it belongs to.
   */
  export interface Data {
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

export interface MarketListParams extends CursorPageParams {
  /**
   * Filter by exact market code (case sensitive).
   */
  code?: string;

  /**
   * Filter by 2-letter ISO country code.
   */
  countryCode?: string;

  /**
   * Search markets by name or code.
   */
  search?: string;

  /**
   * Field to sort by.
   */
  sortBy?: 'name' | 'code' | 'createdAt';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Filter by market type.
   */
  type?: 'STOCK';
}

export declare namespace Markets {
  export {
    type MarketListResponse as MarketListResponse,
    type MarketGetResponse as MarketGetResponse,
    type MarketListResponsesCursorPage as MarketListResponsesCursorPage,
    type MarketListParams as MarketListParams,
  };
}
