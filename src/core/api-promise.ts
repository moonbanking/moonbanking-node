import { defaultParseResponse, type APIResponseProps } from '../internal/parse';

/**
 * A `Promise` that also exposes the underlying HTTP response.
 *
 * Every SDK method returns one of these, so callers can await the parsed body
 * directly or reach for headers and status via `asResponse()` /
 * `withResponse()`.
 */
export class APIPromise<T> extends Promise<T> {
  private parsedPromise: Promise<T> | undefined;

  constructor(
    private responsePromise: Promise<APIResponseProps>,
    private parseResponse: (props: APIResponseProps) => Promise<T> = defaultParseResponse,
  ) {
    // The real work happens in `parse()`; this executor is never used.
    super((resolve) => {
      resolve(null as unknown as T);
    });
  }

  /** Chain an additional transform over the parsed body. */
  _thenUnwrap<U>(transform: (value: T, props: APIResponseProps) => U): APIPromise<U> {
    return new APIPromise(this.responsePromise, async (props) =>
      transform(await this.parseResponse(props), props),
    );
  }

  /**
   * Resolve as soon as response headers are available, without consuming the
   * body. Useful for streaming or custom parsing.
   */
  asResponse(): Promise<Response> {
    return this.responsePromise.then((props) => props.response);
  }

  /**
   * Resolve with both the parsed body and the raw response. Unlike
   * `asResponse()`, this consumes the body.
   */
  async withResponse(): Promise<{ data: T; response: Response }> {
    const [data, response] = await Promise.all([this.parse(), this.asResponse()]);
    return { data, response };
  }

  private parse(): Promise<T> {
    if (!this.parsedPromise) {
      this.parsedPromise = this.responsePromise.then(this.parseResponse);
    }
    return this.parsedPromise;
  }

  override then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): Promise<TResult1 | TResult2> {
    return this.parse().then(onfulfilled, onrejected);
  }

  override catch<TResult = never>(
    onrejected?: ((reason: unknown) => TResult | PromiseLike<TResult>) | null,
  ): Promise<T | TResult> {
    return this.parse().catch(onrejected);
  }

  override finally(onfinally?: (() => void) | null): Promise<T> {
    return this.parse().finally(onfinally);
  }
}
