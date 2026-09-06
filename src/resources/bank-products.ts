// File generated from the OpenAPI spec. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import type { APIPromise } from '../core/api-promise';
import { CursorPage, type CursorPageParams, type PagePromise } from '../core/pagination';
import type { RequestOptions } from '../internal/request-options';
import { path } from '../internal/utils';

export class BankProducts extends APIResource {
  /**
   * Retrieve a paginated list of published bank products across all banks to
   * compare rates and terms between institutions. Filter by bank, country,
   * category, type, currency, and rate, and sort by rate to find the most
   * competitive offers. Products are supplied and maintained by each bank's own
   * verified representatives. Every product includes the name of the bank that
   * offers it.
   */
  list(
    query: BankProductListParams | null | undefined = {},
    options?: RequestOptions,
  ): PagePromise<BankProductListResponsesCursorPage, BankProductListResponse> {
    return this._client.getAPIList<BankProductListResponse, BankProductListResponsesCursorPage>(
      '/bank-products',
      CursorPage<BankProductListResponse>,
      { query, ...options },
    );
  }

  /**
   * Add a product to the bank's profile. Products default to published and appear
   * on the bank's public page immediately. Pass `status` as `DRAFT` to stage a
   * product without publishing it. Requires an approved representative of the
   * bank.
   */
  create(
    bankId: string,
    body: BankProductCreateBody,
    options?: RequestOptions,
  ): APIPromise<BankProductCreateResponse> {
    return this._client.post<BankProductCreateResponse>(path`/banks/${bankId}/products`, {
      body,
      ...options,
    });
  }

  /**
   * Permanently remove a product from the bank's profile. This cannot be undone.
   * To retire a product while keeping its record, set its status to `ARCHIVED`
   * instead. Requires an approved representative of the bank.
   */
  delete(
    bankId: string,
    id: string,
    options?: RequestOptions,
  ): APIPromise<BankProductDeleteResponse> {
    return this._client.delete<BankProductDeleteResponse>(
      path`/banks/${bankId}/products/${id}`,
      options,
    );
  }

  /**
   * Retrieve the products and services a bank publishes on its Moon Banking
   * profile, such as deposit accounts, loans, and credit cards. Products are
   * supplied and maintained by the bank's own verified representatives. Only
   * published products are returned; drafts, archived entries, and anything
   * removed by the Moon Banking team are excluded.
   */
  listByBank(bankId: string, options?: RequestOptions): APIPromise<BankProductListByBankResponse> {
    return this._client.get<BankProductListByBankResponse>(
      path`/banks/${bankId}/products`,
      options,
    );
  }

  /**
   * Retrieve every product on the bank's profile, including drafts and archived
   * entries that the public list omits. Use it to reconcile your own catalog
   * against Moon Banking before syncing changes. Requires an approved
   * representative of the bank.
   */
  listManaged(
    bankId: string,
    options?: RequestOptions,
  ): APIPromise<BankProductListManagedResponse> {
    return this._client.get<BankProductListManagedResponse>(
      path`/banks/${bankId}/managed-products`,
      options,
    );
  }

  /**
   * Move a product between draft, published, and archived without resubmitting its
   * details. Archiving is the reversible way to retire a product you may bring
   * back; deleting is permanent. Requires an approved representative of the bank.
   */
  setStatus(
    bankId: string,
    id: string,
    body: BankProductSetStatusBody,
    options?: RequestOptions,
  ): APIPromise<BankProductSetStatusResponse> {
    return this._client.put<BankProductSetStatusResponse>(
      path`/banks/${bankId}/products/${id}/status`,
      { body, ...options },
    );
  }

  /**
   * Replace a product's details. Every writable field is overwritten, so send the
   * product's full state rather than only the fields that changed. Call this when
   * rates or fees move. Requires an approved representative of the bank.
   */
  update(
    bankId: string,
    id: string,
    body: BankProductUpdateBody,
    options?: RequestOptions,
  ): APIPromise<BankProductUpdateResponse> {
    return this._client.put<BankProductUpdateResponse>(path`/banks/${bankId}/products/${id}`, {
      body,
      ...options,
    });
  }
}

export type BankProductListResponsesCursorPage = CursorPage<BankProductListResponse>;

/**
 * The bank product model contains the products and services a bank offers,
 * including their rates, fees, and terms.
 */
export interface BankProductListResponse {
  /**
   * The product's auto-generated unique identifier.
   */
  id: string;

  /**
   * Additional labelled values that don’t map onto the product’s standard fields.
   */
  attributes: Array<BankProductListResponse.Attribute>;

  /**
   * The ID of the bank that offers this product.
   */
  bankId: string;

  /**
   * The broad category the product belongs to. Drives how the product is grouped
   * on the bank's page.
   */
  category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

  /**
   * The date and time the product was created.
   */
  createdAt: string;

  /**
   * Sort position within the product's category. Lower values are shown first.
   */
  displayOrder: number;

  features: Array<string>;

  /**
   * The product's marketing name.
   */
  name: string;

  /**
   * Whether the product is a draft, published to the bank's page, or archived.
   */
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  /**
   * The specific kind of product.
   */
  type:
    | 'CHECKING_ACCOUNT'
    | 'SAVINGS_ACCOUNT'
    | 'MONEY_MARKET_ACCOUNT'
    | 'CERTIFICATE_OF_DEPOSIT'
    | 'BUSINESS_CHECKING_ACCOUNT'
    | 'BUSINESS_SAVINGS_ACCOUNT'
    | 'YOUTH_ACCOUNT'
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BUSINESS_CREDIT_CARD'
    | 'SECURED_CREDIT_CARD'
    | 'PREPAID_CARD'
    | 'PERSONAL_LOAN'
    | 'AUTO_LOAN'
    | 'MORTGAGE'
    | 'HOME_EQUITY_LOAN'
    | 'HOME_EQUITY_LINE_OF_CREDIT'
    | 'STUDENT_LOAN'
    | 'BUSINESS_LOAN'
    | 'LINE_OF_CREDIT'
    | 'CONSTRUCTION_LOAN'
    | 'BROKERAGE_ACCOUNT'
    | 'RETIREMENT_ACCOUNT'
    | 'WEALTH_MANAGEMENT'
    | 'INSURANCE'
    | 'WIRE_TRANSFER'
    | 'FOREIGN_EXCHANGE'
    | 'MERCHANT_SERVICES'
    | 'TREASURY_MANAGEMENT'
    | 'SAFE_DEPOSIT_BOX'
    | 'ONLINE_BANKING'
    | 'MOBILE_BANKING'
    | 'CRYPTO_SERVICE'
    | 'OTHER';

  /**
   * The date and time the product was last updated.
   */
  updatedAt: string;

  /**
   * The recurring annual fee, in the smallest unit of the product's currency.
   */
  annualFeeCents?: number | null;

  /**
   * The name of the bank that offers this product.
   */
  bankName?: string;

  /**
   * The ISO 4217 currency code for every monetary amount on this product.
   */
  currency?: string | null;

  /**
   * The full product details in Markdown (md) format.
   */
  details?: string | null;

  effectiveDate?: string | null;

  /**
   * The balance the customer has to keep to avoid fees or keep the rate, in the
   * smallest unit of the product's currency.
   */
  minimumBalanceCents?: number | null;

  /**
   * The deposit required to open the product, in the smallest unit of the
   * product's currency.
   */
  minimumOpeningDepositCents?: number | null;

  /**
   * The recurring monthly fee, in the smallest unit of the product's currency.
   */
  monthlyFeeCents?: number | null;

  /**
   * The high end of the rate range, as a percentage.
   */
  rateMaxPercent?: number | null;

  /**
   * The low end of the rate range, as a percentage. Use this with rateMaxPercent
   * when the rate depends on the customer.
   */
  rateMinPercent?: number | null;

  /**
   * A short qualifier on the rate, such as what it depends on or when it changes.
   */
  rateNote?: string | null;

  /**
   * The product's headline rate as a percentage. Use this for a single advertised
   * rate.
   */
  ratePercent?: number | null;

  /**
   * How the rate on this product should be read.
   */
  rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

  /**
   * A one or two sentence summary of the product.
   */
  summary?: string | null;

  /**
   * The product's term in months, for products with a fixed term such as CDs and
   * loans.
   */
  termMonths?: number | null;

  /**
   * A short qualifier on the term.
   */
  termNote?: string | null;

  /**
   * A link to the product page on the bank's own website.
   */
  url?: string | null;
}

export namespace BankProductListResponse {
  export interface Attribute {
    /**
     * The name of the attribute.
     */
    label: string;

    /**
     * The value of the attribute.
     */
    value: string;
  }
}

export interface BankProductCreateResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  data: BankProductCreateResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductCreateResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;

    /**
     * Additional labelled values that don’t map onto the product’s standard fields.
     */
    attributes: Array<Data.Attribute>;

    /**
     * The ID of the bank that offers this product.
     */
    bankId: string;

    /**
     * The broad category the product belongs to. Drives how the product is grouped
     * on the bank's page.
     */
    category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

    /**
     * The date and time the product was created.
     */
    createdAt: string;

    /**
     * Sort position within the product's category. Lower values are shown first.
     */
    displayOrder: number;

    features: Array<string>;

    /**
     * The product's marketing name.
     */
    name: string;

    /**
     * Whether the product is a draft, published to the bank's page, or archived.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * The specific kind of product.
     */
    type:
      | 'CHECKING_ACCOUNT'
      | 'SAVINGS_ACCOUNT'
      | 'MONEY_MARKET_ACCOUNT'
      | 'CERTIFICATE_OF_DEPOSIT'
      | 'BUSINESS_CHECKING_ACCOUNT'
      | 'BUSINESS_SAVINGS_ACCOUNT'
      | 'YOUTH_ACCOUNT'
      | 'CREDIT_CARD'
      | 'DEBIT_CARD'
      | 'BUSINESS_CREDIT_CARD'
      | 'SECURED_CREDIT_CARD'
      | 'PREPAID_CARD'
      | 'PERSONAL_LOAN'
      | 'AUTO_LOAN'
      | 'MORTGAGE'
      | 'HOME_EQUITY_LOAN'
      | 'HOME_EQUITY_LINE_OF_CREDIT'
      | 'STUDENT_LOAN'
      | 'BUSINESS_LOAN'
      | 'LINE_OF_CREDIT'
      | 'CONSTRUCTION_LOAN'
      | 'BROKERAGE_ACCOUNT'
      | 'RETIREMENT_ACCOUNT'
      | 'WEALTH_MANAGEMENT'
      | 'INSURANCE'
      | 'WIRE_TRANSFER'
      | 'FOREIGN_EXCHANGE'
      | 'MERCHANT_SERVICES'
      | 'TREASURY_MANAGEMENT'
      | 'SAFE_DEPOSIT_BOX'
      | 'ONLINE_BANKING'
      | 'MOBILE_BANKING'
      | 'CRYPTO_SERVICE'
      | 'OTHER';

    /**
     * The date and time the product was last updated.
     */
    updatedAt: string;

    /**
     * The recurring annual fee, in the smallest unit of the product's currency.
     */
    annualFeeCents?: number | null;

    /**
     * The name of the bank that offers this product.
     */
    bankName?: string;

    /**
     * The ISO 4217 currency code for every monetary amount on this product.
     */
    currency?: string | null;

    /**
     * The full product details in Markdown (md) format.
     */
    details?: string | null;

    effectiveDate?: string | null;

    /**
     * The balance the customer has to keep to avoid fees or keep the rate, in the
     * smallest unit of the product's currency.
     */
    minimumBalanceCents?: number | null;

    /**
     * The deposit required to open the product, in the smallest unit of the
     * product's currency.
     */
    minimumOpeningDepositCents?: number | null;

    /**
     * The recurring monthly fee, in the smallest unit of the product's currency.
     */
    monthlyFeeCents?: number | null;

    /**
     * The high end of the rate range, as a percentage.
     */
    rateMaxPercent?: number | null;

    /**
     * The low end of the rate range, as a percentage. Use this with rateMaxPercent
     * when the rate depends on the customer.
     */
    rateMinPercent?: number | null;

    /**
     * A short qualifier on the rate, such as what it depends on or when it changes.
     */
    rateNote?: string | null;

    /**
     * The product's headline rate as a percentage. Use this for a single advertised
     * rate.
     */
    ratePercent?: number | null;

    /**
     * How the rate on this product should be read.
     */
    rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

    /**
     * A one or two sentence summary of the product.
     */
    summary?: string | null;

    /**
     * The product's term in months, for products with a fixed term such as CDs and
     * loans.
     */
    termMonths?: number | null;

    /**
     * A short qualifier on the term.
     */
    termNote?: string | null;

    /**
     * A link to the product page on the bank's own website.
     */
    url?: string | null;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * The name of the attribute.
       */
      label: string;

      /**
       * The value of the attribute.
       */
      value: string;
    }
  }
}

export interface BankProductCreateBody {
  /**
   * The broad category the product belongs to. Drives how the product is grouped
   * on the bank's page.
   */
  category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

  /**
   * The product's marketing name.
   */
  name: string;

  /**
   * The specific kind of product.
   */
  type:
    | 'CHECKING_ACCOUNT'
    | 'SAVINGS_ACCOUNT'
    | 'MONEY_MARKET_ACCOUNT'
    | 'CERTIFICATE_OF_DEPOSIT'
    | 'BUSINESS_CHECKING_ACCOUNT'
    | 'BUSINESS_SAVINGS_ACCOUNT'
    | 'YOUTH_ACCOUNT'
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BUSINESS_CREDIT_CARD'
    | 'SECURED_CREDIT_CARD'
    | 'PREPAID_CARD'
    | 'PERSONAL_LOAN'
    | 'AUTO_LOAN'
    | 'MORTGAGE'
    | 'HOME_EQUITY_LOAN'
    | 'HOME_EQUITY_LINE_OF_CREDIT'
    | 'STUDENT_LOAN'
    | 'BUSINESS_LOAN'
    | 'LINE_OF_CREDIT'
    | 'CONSTRUCTION_LOAN'
    | 'BROKERAGE_ACCOUNT'
    | 'RETIREMENT_ACCOUNT'
    | 'WEALTH_MANAGEMENT'
    | 'INSURANCE'
    | 'WIRE_TRANSFER'
    | 'FOREIGN_EXCHANGE'
    | 'MERCHANT_SERVICES'
    | 'TREASURY_MANAGEMENT'
    | 'SAFE_DEPOSIT_BOX'
    | 'ONLINE_BANKING'
    | 'MOBILE_BANKING'
    | 'CRYPTO_SERVICE'
    | 'OTHER';

  annualFeeCents?: number | null;

  attributes?: Array<BankProductCreateBody.Attribute>;

  currency?: string | null;

  details?: string | null;

  displayOrder?: number;

  effectiveDate?: string | null;

  features?: Array<string>;

  minimumBalanceCents?: number | null;

  minimumOpeningDepositCents?: number | null;

  monthlyFeeCents?: number | null;

  rateMaxPercent?: number | null;

  rateMinPercent?: number | null;

  rateNote?: string | null;

  ratePercent?: number | null;

  /**
   * How the rate on this product should be read.
   */
  rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

  /**
   * Whether the product is a draft, published to the bank's page, or archived.
   */
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  summary?: string | null;

  termMonths?: number | null;

  termNote?: string | null;

  url?: string | '' | null;
}

export namespace BankProductCreateBody {
  export interface Attribute {
    /**
     * The name of the attribute.
     */
    label: string;

    /**
     * The value of the attribute.
     */
    value: string;
  }
}

export interface BankProductDeleteResponse {
  data: BankProductDeleteResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductDeleteResponse {
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;
  }
}

export interface BankProductListByBankResponse {
  data: Array<BankProductListByBankResponse.Data>;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductListByBankResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;

    /**
     * Additional labelled values that don’t map onto the product’s standard fields.
     */
    attributes: Array<Data.Attribute>;

    /**
     * The ID of the bank that offers this product.
     */
    bankId: string;

    /**
     * The broad category the product belongs to. Drives how the product is grouped
     * on the bank's page.
     */
    category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

    /**
     * The date and time the product was created.
     */
    createdAt: string;

    /**
     * Sort position within the product's category. Lower values are shown first.
     */
    displayOrder: number;

    features: Array<string>;

    /**
     * The product's marketing name.
     */
    name: string;

    /**
     * Whether the product is a draft, published to the bank's page, or archived.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * The specific kind of product.
     */
    type:
      | 'CHECKING_ACCOUNT'
      | 'SAVINGS_ACCOUNT'
      | 'MONEY_MARKET_ACCOUNT'
      | 'CERTIFICATE_OF_DEPOSIT'
      | 'BUSINESS_CHECKING_ACCOUNT'
      | 'BUSINESS_SAVINGS_ACCOUNT'
      | 'YOUTH_ACCOUNT'
      | 'CREDIT_CARD'
      | 'DEBIT_CARD'
      | 'BUSINESS_CREDIT_CARD'
      | 'SECURED_CREDIT_CARD'
      | 'PREPAID_CARD'
      | 'PERSONAL_LOAN'
      | 'AUTO_LOAN'
      | 'MORTGAGE'
      | 'HOME_EQUITY_LOAN'
      | 'HOME_EQUITY_LINE_OF_CREDIT'
      | 'STUDENT_LOAN'
      | 'BUSINESS_LOAN'
      | 'LINE_OF_CREDIT'
      | 'CONSTRUCTION_LOAN'
      | 'BROKERAGE_ACCOUNT'
      | 'RETIREMENT_ACCOUNT'
      | 'WEALTH_MANAGEMENT'
      | 'INSURANCE'
      | 'WIRE_TRANSFER'
      | 'FOREIGN_EXCHANGE'
      | 'MERCHANT_SERVICES'
      | 'TREASURY_MANAGEMENT'
      | 'SAFE_DEPOSIT_BOX'
      | 'ONLINE_BANKING'
      | 'MOBILE_BANKING'
      | 'CRYPTO_SERVICE'
      | 'OTHER';

    /**
     * The date and time the product was last updated.
     */
    updatedAt: string;

    /**
     * The recurring annual fee, in the smallest unit of the product's currency.
     */
    annualFeeCents?: number | null;

    /**
     * The name of the bank that offers this product.
     */
    bankName?: string;

    /**
     * The ISO 4217 currency code for every monetary amount on this product.
     */
    currency?: string | null;

    /**
     * The full product details in Markdown (md) format.
     */
    details?: string | null;

    effectiveDate?: string | null;

    /**
     * The balance the customer has to keep to avoid fees or keep the rate, in the
     * smallest unit of the product's currency.
     */
    minimumBalanceCents?: number | null;

    /**
     * The deposit required to open the product, in the smallest unit of the
     * product's currency.
     */
    minimumOpeningDepositCents?: number | null;

    /**
     * The recurring monthly fee, in the smallest unit of the product's currency.
     */
    monthlyFeeCents?: number | null;

    /**
     * The high end of the rate range, as a percentage.
     */
    rateMaxPercent?: number | null;

    /**
     * The low end of the rate range, as a percentage. Use this with rateMaxPercent
     * when the rate depends on the customer.
     */
    rateMinPercent?: number | null;

    /**
     * A short qualifier on the rate, such as what it depends on or when it changes.
     */
    rateNote?: string | null;

    /**
     * The product's headline rate as a percentage. Use this for a single advertised
     * rate.
     */
    ratePercent?: number | null;

    /**
     * How the rate on this product should be read.
     */
    rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

    /**
     * A one or two sentence summary of the product.
     */
    summary?: string | null;

    /**
     * The product's term in months, for products with a fixed term such as CDs and
     * loans.
     */
    termMonths?: number | null;

    /**
     * A short qualifier on the term.
     */
    termNote?: string | null;

    /**
     * A link to the product page on the bank's own website.
     */
    url?: string | null;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * The name of the attribute.
       */
      label: string;

      /**
       * The value of the attribute.
       */
      value: string;
    }
  }
}

export interface BankProductListManagedResponse {
  data: Array<BankProductListManagedResponse.Data>;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductListManagedResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;

    /**
     * Additional labelled values that don’t map onto the product’s standard fields.
     */
    attributes: Array<Data.Attribute>;

    /**
     * The ID of the bank that offers this product.
     */
    bankId: string;

    /**
     * The broad category the product belongs to. Drives how the product is grouped
     * on the bank's page.
     */
    category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

    /**
     * The date and time the product was created.
     */
    createdAt: string;

    /**
     * Sort position within the product's category. Lower values are shown first.
     */
    displayOrder: number;

    features: Array<string>;

    /**
     * The product's marketing name.
     */
    name: string;

    /**
     * Whether the product is a draft, published to the bank's page, or archived.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * The specific kind of product.
     */
    type:
      | 'CHECKING_ACCOUNT'
      | 'SAVINGS_ACCOUNT'
      | 'MONEY_MARKET_ACCOUNT'
      | 'CERTIFICATE_OF_DEPOSIT'
      | 'BUSINESS_CHECKING_ACCOUNT'
      | 'BUSINESS_SAVINGS_ACCOUNT'
      | 'YOUTH_ACCOUNT'
      | 'CREDIT_CARD'
      | 'DEBIT_CARD'
      | 'BUSINESS_CREDIT_CARD'
      | 'SECURED_CREDIT_CARD'
      | 'PREPAID_CARD'
      | 'PERSONAL_LOAN'
      | 'AUTO_LOAN'
      | 'MORTGAGE'
      | 'HOME_EQUITY_LOAN'
      | 'HOME_EQUITY_LINE_OF_CREDIT'
      | 'STUDENT_LOAN'
      | 'BUSINESS_LOAN'
      | 'LINE_OF_CREDIT'
      | 'CONSTRUCTION_LOAN'
      | 'BROKERAGE_ACCOUNT'
      | 'RETIREMENT_ACCOUNT'
      | 'WEALTH_MANAGEMENT'
      | 'INSURANCE'
      | 'WIRE_TRANSFER'
      | 'FOREIGN_EXCHANGE'
      | 'MERCHANT_SERVICES'
      | 'TREASURY_MANAGEMENT'
      | 'SAFE_DEPOSIT_BOX'
      | 'ONLINE_BANKING'
      | 'MOBILE_BANKING'
      | 'CRYPTO_SERVICE'
      | 'OTHER';

    /**
     * The date and time the product was last updated.
     */
    updatedAt: string;

    /**
     * The recurring annual fee, in the smallest unit of the product's currency.
     */
    annualFeeCents?: number | null;

    /**
     * The name of the bank that offers this product.
     */
    bankName?: string;

    /**
     * The ISO 4217 currency code for every monetary amount on this product.
     */
    currency?: string | null;

    /**
     * The full product details in Markdown (md) format.
     */
    details?: string | null;

    effectiveDate?: string | null;

    /**
     * The balance the customer has to keep to avoid fees or keep the rate, in the
     * smallest unit of the product's currency.
     */
    minimumBalanceCents?: number | null;

    /**
     * The deposit required to open the product, in the smallest unit of the
     * product's currency.
     */
    minimumOpeningDepositCents?: number | null;

    /**
     * The recurring monthly fee, in the smallest unit of the product's currency.
     */
    monthlyFeeCents?: number | null;

    /**
     * The high end of the rate range, as a percentage.
     */
    rateMaxPercent?: number | null;

    /**
     * The low end of the rate range, as a percentage. Use this with rateMaxPercent
     * when the rate depends on the customer.
     */
    rateMinPercent?: number | null;

    /**
     * A short qualifier on the rate, such as what it depends on or when it changes.
     */
    rateNote?: string | null;

    /**
     * The product's headline rate as a percentage. Use this for a single advertised
     * rate.
     */
    ratePercent?: number | null;

    /**
     * How the rate on this product should be read.
     */
    rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

    /**
     * A one or two sentence summary of the product.
     */
    summary?: string | null;

    /**
     * The product's term in months, for products with a fixed term such as CDs and
     * loans.
     */
    termMonths?: number | null;

    /**
     * A short qualifier on the term.
     */
    termNote?: string | null;

    /**
     * A link to the product page on the bank's own website.
     */
    url?: string | null;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * The name of the attribute.
       */
      label: string;

      /**
       * The value of the attribute.
       */
      value: string;
    }
  }
}

export interface BankProductSetStatusResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  data: BankProductSetStatusResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductSetStatusResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;

    /**
     * Additional labelled values that don’t map onto the product’s standard fields.
     */
    attributes: Array<Data.Attribute>;

    /**
     * The ID of the bank that offers this product.
     */
    bankId: string;

    /**
     * The broad category the product belongs to. Drives how the product is grouped
     * on the bank's page.
     */
    category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

    /**
     * The date and time the product was created.
     */
    createdAt: string;

    /**
     * Sort position within the product's category. Lower values are shown first.
     */
    displayOrder: number;

    features: Array<string>;

    /**
     * The product's marketing name.
     */
    name: string;

    /**
     * Whether the product is a draft, published to the bank's page, or archived.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * The specific kind of product.
     */
    type:
      | 'CHECKING_ACCOUNT'
      | 'SAVINGS_ACCOUNT'
      | 'MONEY_MARKET_ACCOUNT'
      | 'CERTIFICATE_OF_DEPOSIT'
      | 'BUSINESS_CHECKING_ACCOUNT'
      | 'BUSINESS_SAVINGS_ACCOUNT'
      | 'YOUTH_ACCOUNT'
      | 'CREDIT_CARD'
      | 'DEBIT_CARD'
      | 'BUSINESS_CREDIT_CARD'
      | 'SECURED_CREDIT_CARD'
      | 'PREPAID_CARD'
      | 'PERSONAL_LOAN'
      | 'AUTO_LOAN'
      | 'MORTGAGE'
      | 'HOME_EQUITY_LOAN'
      | 'HOME_EQUITY_LINE_OF_CREDIT'
      | 'STUDENT_LOAN'
      | 'BUSINESS_LOAN'
      | 'LINE_OF_CREDIT'
      | 'CONSTRUCTION_LOAN'
      | 'BROKERAGE_ACCOUNT'
      | 'RETIREMENT_ACCOUNT'
      | 'WEALTH_MANAGEMENT'
      | 'INSURANCE'
      | 'WIRE_TRANSFER'
      | 'FOREIGN_EXCHANGE'
      | 'MERCHANT_SERVICES'
      | 'TREASURY_MANAGEMENT'
      | 'SAFE_DEPOSIT_BOX'
      | 'ONLINE_BANKING'
      | 'MOBILE_BANKING'
      | 'CRYPTO_SERVICE'
      | 'OTHER';

    /**
     * The date and time the product was last updated.
     */
    updatedAt: string;

    /**
     * The recurring annual fee, in the smallest unit of the product's currency.
     */
    annualFeeCents?: number | null;

    /**
     * The name of the bank that offers this product.
     */
    bankName?: string;

    /**
     * The ISO 4217 currency code for every monetary amount on this product.
     */
    currency?: string | null;

    /**
     * The full product details in Markdown (md) format.
     */
    details?: string | null;

    effectiveDate?: string | null;

    /**
     * The balance the customer has to keep to avoid fees or keep the rate, in the
     * smallest unit of the product's currency.
     */
    minimumBalanceCents?: number | null;

    /**
     * The deposit required to open the product, in the smallest unit of the
     * product's currency.
     */
    minimumOpeningDepositCents?: number | null;

    /**
     * The recurring monthly fee, in the smallest unit of the product's currency.
     */
    monthlyFeeCents?: number | null;

    /**
     * The high end of the rate range, as a percentage.
     */
    rateMaxPercent?: number | null;

    /**
     * The low end of the rate range, as a percentage. Use this with rateMaxPercent
     * when the rate depends on the customer.
     */
    rateMinPercent?: number | null;

    /**
     * A short qualifier on the rate, such as what it depends on or when it changes.
     */
    rateNote?: string | null;

    /**
     * The product's headline rate as a percentage. Use this for a single advertised
     * rate.
     */
    ratePercent?: number | null;

    /**
     * How the rate on this product should be read.
     */
    rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

    /**
     * A one or two sentence summary of the product.
     */
    summary?: string | null;

    /**
     * The product's term in months, for products with a fixed term such as CDs and
     * loans.
     */
    termMonths?: number | null;

    /**
     * A short qualifier on the term.
     */
    termNote?: string | null;

    /**
     * A link to the product page on the bank's own website.
     */
    url?: string | null;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * The name of the attribute.
       */
      label: string;

      /**
       * The value of the attribute.
       */
      value: string;
    }
  }
}

export interface BankProductSetStatusBody {
  /**
   * Whether the product is a draft, published to the bank's page, or archived.
   */
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
}

export interface BankProductUpdateResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  data: BankProductUpdateResponse.Data;

  success: true;

  timestamp: string;

  version: string;

  message?: string;
}

export namespace BankProductUpdateResponse {
  /**
   * The bank product model contains the products and services a bank offers,
   * including their rates, fees, and terms.
   */
  export interface Data {
    /**
     * The product's auto-generated unique identifier.
     */
    id: string;

    /**
     * Additional labelled values that don’t map onto the product’s standard fields.
     */
    attributes: Array<Data.Attribute>;

    /**
     * The ID of the bank that offers this product.
     */
    bankId: string;

    /**
     * The broad category the product belongs to. Drives how the product is grouped
     * on the bank's page.
     */
    category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

    /**
     * The date and time the product was created.
     */
    createdAt: string;

    /**
     * Sort position within the product's category. Lower values are shown first.
     */
    displayOrder: number;

    features: Array<string>;

    /**
     * The product's marketing name.
     */
    name: string;

    /**
     * Whether the product is a draft, published to the bank's page, or archived.
     */
    status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

    /**
     * The specific kind of product.
     */
    type:
      | 'CHECKING_ACCOUNT'
      | 'SAVINGS_ACCOUNT'
      | 'MONEY_MARKET_ACCOUNT'
      | 'CERTIFICATE_OF_DEPOSIT'
      | 'BUSINESS_CHECKING_ACCOUNT'
      | 'BUSINESS_SAVINGS_ACCOUNT'
      | 'YOUTH_ACCOUNT'
      | 'CREDIT_CARD'
      | 'DEBIT_CARD'
      | 'BUSINESS_CREDIT_CARD'
      | 'SECURED_CREDIT_CARD'
      | 'PREPAID_CARD'
      | 'PERSONAL_LOAN'
      | 'AUTO_LOAN'
      | 'MORTGAGE'
      | 'HOME_EQUITY_LOAN'
      | 'HOME_EQUITY_LINE_OF_CREDIT'
      | 'STUDENT_LOAN'
      | 'BUSINESS_LOAN'
      | 'LINE_OF_CREDIT'
      | 'CONSTRUCTION_LOAN'
      | 'BROKERAGE_ACCOUNT'
      | 'RETIREMENT_ACCOUNT'
      | 'WEALTH_MANAGEMENT'
      | 'INSURANCE'
      | 'WIRE_TRANSFER'
      | 'FOREIGN_EXCHANGE'
      | 'MERCHANT_SERVICES'
      | 'TREASURY_MANAGEMENT'
      | 'SAFE_DEPOSIT_BOX'
      | 'ONLINE_BANKING'
      | 'MOBILE_BANKING'
      | 'CRYPTO_SERVICE'
      | 'OTHER';

    /**
     * The date and time the product was last updated.
     */
    updatedAt: string;

    /**
     * The recurring annual fee, in the smallest unit of the product's currency.
     */
    annualFeeCents?: number | null;

    /**
     * The name of the bank that offers this product.
     */
    bankName?: string;

    /**
     * The ISO 4217 currency code for every monetary amount on this product.
     */
    currency?: string | null;

    /**
     * The full product details in Markdown (md) format.
     */
    details?: string | null;

    effectiveDate?: string | null;

    /**
     * The balance the customer has to keep to avoid fees or keep the rate, in the
     * smallest unit of the product's currency.
     */
    minimumBalanceCents?: number | null;

    /**
     * The deposit required to open the product, in the smallest unit of the
     * product's currency.
     */
    minimumOpeningDepositCents?: number | null;

    /**
     * The recurring monthly fee, in the smallest unit of the product's currency.
     */
    monthlyFeeCents?: number | null;

    /**
     * The high end of the rate range, as a percentage.
     */
    rateMaxPercent?: number | null;

    /**
     * The low end of the rate range, as a percentage. Use this with rateMaxPercent
     * when the rate depends on the customer.
     */
    rateMinPercent?: number | null;

    /**
     * A short qualifier on the rate, such as what it depends on or when it changes.
     */
    rateNote?: string | null;

    /**
     * The product's headline rate as a percentage. Use this for a single advertised
     * rate.
     */
    ratePercent?: number | null;

    /**
     * How the rate on this product should be read.
     */
    rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

    /**
     * A one or two sentence summary of the product.
     */
    summary?: string | null;

    /**
     * The product's term in months, for products with a fixed term such as CDs and
     * loans.
     */
    termMonths?: number | null;

    /**
     * A short qualifier on the term.
     */
    termNote?: string | null;

    /**
     * A link to the product page on the bank's own website.
     */
    url?: string | null;
  }

  export namespace Data {
    export interface Attribute {
      /**
       * The name of the attribute.
       */
      label: string;

      /**
       * The value of the attribute.
       */
      value: string;
    }
  }
}

export interface BankProductUpdateBody {
  /**
   * The broad category the product belongs to. Drives how the product is grouped
   * on the bank's page.
   */
  category: 'ACCOUNT' | 'CARD' | 'LOAN' | 'INVESTMENT' | 'INSURANCE' | 'SERVICE' | 'OTHER';

  /**
   * The product's marketing name.
   */
  name: string;

  /**
   * The specific kind of product.
   */
  type:
    | 'CHECKING_ACCOUNT'
    | 'SAVINGS_ACCOUNT'
    | 'MONEY_MARKET_ACCOUNT'
    | 'CERTIFICATE_OF_DEPOSIT'
    | 'BUSINESS_CHECKING_ACCOUNT'
    | 'BUSINESS_SAVINGS_ACCOUNT'
    | 'YOUTH_ACCOUNT'
    | 'CREDIT_CARD'
    | 'DEBIT_CARD'
    | 'BUSINESS_CREDIT_CARD'
    | 'SECURED_CREDIT_CARD'
    | 'PREPAID_CARD'
    | 'PERSONAL_LOAN'
    | 'AUTO_LOAN'
    | 'MORTGAGE'
    | 'HOME_EQUITY_LOAN'
    | 'HOME_EQUITY_LINE_OF_CREDIT'
    | 'STUDENT_LOAN'
    | 'BUSINESS_LOAN'
    | 'LINE_OF_CREDIT'
    | 'CONSTRUCTION_LOAN'
    | 'BROKERAGE_ACCOUNT'
    | 'RETIREMENT_ACCOUNT'
    | 'WEALTH_MANAGEMENT'
    | 'INSURANCE'
    | 'WIRE_TRANSFER'
    | 'FOREIGN_EXCHANGE'
    | 'MERCHANT_SERVICES'
    | 'TREASURY_MANAGEMENT'
    | 'SAFE_DEPOSIT_BOX'
    | 'ONLINE_BANKING'
    | 'MOBILE_BANKING'
    | 'CRYPTO_SERVICE'
    | 'OTHER';

  annualFeeCents?: number | null;

  attributes?: Array<BankProductUpdateBody.Attribute>;

  currency?: string | null;

  details?: string | null;

  displayOrder?: number;

  effectiveDate?: string | null;

  features?: Array<string>;

  minimumBalanceCents?: number | null;

  minimumOpeningDepositCents?: number | null;

  monthlyFeeCents?: number | null;

  rateMaxPercent?: number | null;

  rateMinPercent?: number | null;

  rateNote?: string | null;

  ratePercent?: number | null;

  /**
   * How the rate on this product should be read.
   */
  rateType?: 'APY' | 'APR' | 'INTRO_APR' | 'VARIABLE_APR' | 'INTEREST_RATE' | null;

  /**
   * Whether the product is a draft, published to the bank's page, or archived.
   */
  status?: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

  summary?: string | null;

  termMonths?: number | null;

  termNote?: string | null;

  url?: string | '' | null;
}

export namespace BankProductUpdateBody {
  export interface Attribute {
    /**
     * The name of the attribute.
     */
    label: string;

    /**
     * The value of the attribute.
     */
    value: string;
  }
}

export interface BankProductListParams extends CursorPageParams {
  /**
   * Filter by the id of the bank that offers the product.
   */
  bankId?: string;

  /**
   * An optional comma-separated list of fields to include in the response.
   * Possible values: `ACCOUNT`, `CARD`, `LOAN`, `INVESTMENT`, `INSURANCE`,
   * `SERVICE`, `OTHER`
   */
  categories?: string;

  /**
   * Filter by the ISO country code of the bank offering the product.
   */
  countryCode?: string;

  /**
   * Filter by the ISO 4217 currency code the product is denominated in.
   */
  currency?: string;

  /**
   * Only return products whose rate is no higher than this percentage. A product
   * matches on either its headline rate or the bottom of its rate range.
   */
  maxRatePercent?: number;

  /**
   * Only return products whose rate reaches at least this percentage. A product
   * matches on either its headline rate or the top of its rate range.
   */
  minRatePercent?: number;

  /**
   * Search products by name.
   */
  search?: string;

  /**
   * Field to sort by. Products that leave the sorted field empty are always
   * returned last.
   */
  sortBy?: 'ratePercent' | 'name' | 'effectiveDate' | 'createdAt' | 'updatedAt';

  /**
   * Sort order. Either ascending or descending.
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * An optional comma-separated list of fields to include in the response.
   * Possible values: `CHECKING_ACCOUNT`, `SAVINGS_ACCOUNT`,
   * `MONEY_MARKET_ACCOUNT`, `CERTIFICATE_OF_DEPOSIT`, `BUSINESS_CHECKING_ACCOUNT`,
   * `BUSINESS_SAVINGS_ACCOUNT`, `YOUTH_ACCOUNT`, `CREDIT_CARD`, `DEBIT_CARD`,
   * `BUSINESS_CREDIT_CARD`, `SECURED_CREDIT_CARD`, `PREPAID_CARD`,
   * `PERSONAL_LOAN`, `AUTO_LOAN`, `MORTGAGE`, `HOME_EQUITY_LOAN`,
   * `HOME_EQUITY_LINE_OF_CREDIT`, `STUDENT_LOAN`, `BUSINESS_LOAN`,
   * `LINE_OF_CREDIT`, `CONSTRUCTION_LOAN`, `BROKERAGE_ACCOUNT`,
   * `RETIREMENT_ACCOUNT`, `WEALTH_MANAGEMENT`, `INSURANCE`, `WIRE_TRANSFER`,
   * `FOREIGN_EXCHANGE`, `MERCHANT_SERVICES`, `TREASURY_MANAGEMENT`,
   * `SAFE_DEPOSIT_BOX`, `ONLINE_BANKING`, `MOBILE_BANKING`, `CRYPTO_SERVICE`,
   * `OTHER`
   */
  types?: string;
}

export declare namespace BankProducts {
  export {
    type BankProductListResponse as BankProductListResponse,
    type BankProductCreateResponse as BankProductCreateResponse,
    type BankProductCreateBody as BankProductCreateBody,
    type BankProductDeleteResponse as BankProductDeleteResponse,
    type BankProductListByBankResponse as BankProductListByBankResponse,
    type BankProductListManagedResponse as BankProductListManagedResponse,
    type BankProductSetStatusResponse as BankProductSetStatusResponse,
    type BankProductSetStatusBody as BankProductSetStatusBody,
    type BankProductUpdateResponse as BankProductUpdateResponse,
    type BankProductUpdateBody as BankProductUpdateBody,
    type BankProductListResponsesCursorPage as BankProductListResponsesCursorPage,
    type BankProductListParams as BankProductListParams,
  };
}
