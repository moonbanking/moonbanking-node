import { defaultParseResponse, type APIResponseProps } from '../internal/parse';
import type { FinalRequestOptions } from '../internal/request-options';
import { maybeObj } from '../internal/utils';
import { APIPromise } from './api-promise';
import { MoonBankingError } from './error';

/**
 * Cursor pagination.
 *
 * List methods return a `PagePromise`, which can be awaited for a single page
 * or iterated directly to walk every page automatically.
 */

export type PageRequestOptions = FinalRequestOptions;

/** The subset of the client that pages need in order to fetch the next page. */
export interface PaginationClient {
  requestAPIList(
    Page: PageConstructor<AbstractPage<unknown>>,
    options: FinalRequestOptions,
  ): PagePromise<AbstractPage<unknown>, unknown>;
}

export type PageConstructor<PageClass> = new (
  client: PaginationClient,
  response: Response,
  body: unknown,
  options: FinalRequestOptions,
) => PageClass;

export abstract class AbstractPage<Item> implements AsyncIterable<Item> {
  #client: PaginationClient;
  protected options: FinalRequestOptions;
  protected response: Response;
  protected body: unknown;

  constructor(
    client: PaginationClient,
    response: Response,
    body: unknown,
    options: FinalRequestOptions,
  ) {
    this.#client = client;
    this.options = options;
    this.response = response;
    this.body = body;
  }

  abstract nextPageRequestOptions(): PageRequestOptions | null;

  abstract getPaginatedItems(): Item[];

  hasNextPage(): boolean {
    const items = this.getPaginatedItems();
    if (!items.length) return false;
    return this.nextPageRequestOptions() != null;
  }

  async getNextPage(): Promise<this> {
    const nextOptions = this.nextPageRequestOptions();
    if (!nextOptions) {
      throw new MoonBankingError(
        'No next page expected; please check `.hasNextPage()` before calling `.getNextPage()`.',
      );
    }

    const page = await this.#client.requestAPIList(
      this.constructor as PageConstructor<AbstractPage<unknown>>,
      nextOptions,
    );

    return page as unknown as this;
  }

  async *iterPages(): AsyncGenerator<this> {
    let page: this = this;
    yield page;
    while (page.hasNextPage()) {
      page = await page.getNextPage();
      yield page;
    }
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    for await (const page of this.iterPages()) {
      for (const item of page.getPaginatedItems()) {
        yield item;
      }
    }
  }
}

/**
 * Resolves to a page of results, and is itself async-iterable so an unawaited
 * list call can be iterated across page boundaries:
 *
 *     for await (const item of client.items.list()) { ... }
 */
export class PagePromise<PageClass extends AbstractPage<Item>, Item>
  extends APIPromise<PageClass>
  implements AsyncIterable<Item>
{
  constructor(
    client: PaginationClient,
    request: Promise<APIResponseProps>,
    Page: PageConstructor<PageClass>,
  ) {
    super(
      request,
      async (props) =>
        new Page(client, props.response, await defaultParseResponse(props), props.options),
    );
  }

  async *[Symbol.asyncIterator](): AsyncGenerator<Item> {
    const page = await this;
    for await (const item of page) {
      yield item;
    }
  }
}

export interface CursorPageResponse<Item> {
  data: Array<Item>;
}

export interface CursorPageParams {
  /** Number of items to return. */
  limit?: number;

  /** Cursor for forward pagination: the id of the last item on the previous page. */
  starting_after?: string;

  /** Cursor for backward pagination: the id of the first item on the current page. */
  ending_before?: string;
}

export class CursorPage<Item extends { id: string }>
  extends AbstractPage<Item>
  implements CursorPageResponse<Item>
{
  data: Array<Item>;

  constructor(
    client: PaginationClient,
    response: Response,
    body: unknown,
    options: FinalRequestOptions,
  ) {
    super(client, response, body, options);
    this.data = (body as CursorPageResponse<Item> | undefined)?.data || [];
  }

  getPaginatedItems(): Item[] {
    return this.data ?? [];
  }

  nextPageRequestOptions(): PageRequestOptions | null {
    const data = this.getPaginatedItems();

    // Paging backwards is driven by the first item; forwards by the last.
    const isForwards = !(
      typeof this.options.query === 'object' && 'ending_before' in (this.options.query || {})
    );

    if (isForwards) {
      const id = data[data.length - 1]?.id;
      if (!id) return null;

      return {
        ...this.options,
        query: { ...maybeObj(this.options.query), starting_after: id },
      };
    }

    const id = data[0]?.id;
    if (!id) return null;

    return {
      ...this.options,
      query: { ...maybeObj(this.options.query), ending_before: id },
    };
  }
}
