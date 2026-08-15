import { describe, expect, it } from 'vitest';

import MoonBanking, { APIError, APIPromise, MoonBankingError } from '../src/index';

/**
 * These assertions are mostly for the typechecker: they pin the public type
 * surface that consumers depend on.
 */
describe('public type surface', () => {
  it('exposes the client and its resources', () => {
    const client = new MoonBanking({ bearerToken: 'token' });

    expect(client.bankVotes).toBeDefined();
    expect(client.banks).toBeDefined();
    expect(client.countries).toBeDefined();
    expect(client.markets).toBeDefined();
    expect(client.search).toBeDefined();
    expect(client.stocks).toBeDefined();
    expect(client.stories).toBeDefined();
    expect(client.world).toBeDefined();
  });

  it('exposes namespaced types', () => {
    type Page = MoonBanking.BankVotes.BankVoteListResponsesCursorPage;
    const check = (value: Page | undefined): Page | undefined => value;

    expect(check(undefined)).toBeUndefined();
  });

  it('exposes the error hierarchy', () => {
    expect(APIError.prototype).toBeInstanceOf(MoonBankingError);
    expect(MoonBankingError.prototype).toBeInstanceOf(Error);
  });

  it('exposes APIPromise', () => {
    expect(typeof APIPromise).toBe('function');
  });
});
