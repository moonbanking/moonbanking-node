# API reference

All methods are available on an instance of the `MoonBanking` client.

# BankProducts

Types:

- `MoonBanking.BankProducts.BankProductListResponse`
- `MoonBanking.BankProducts.BankProductListResponsesCursorPage`
- `MoonBanking.BankProducts.BankProductListParams`
- `MoonBanking.BankProducts.BankProductCreateResponse`
- `MoonBanking.BankProducts.BankProductCreateBody`
- `MoonBanking.BankProducts.BankProductDeleteResponse`
- `MoonBanking.BankProducts.BankProductListByBankResponse`
- `MoonBanking.BankProducts.BankProductListManagedResponse`
- `MoonBanking.BankProducts.BankProductSetStatusResponse`
- `MoonBanking.BankProducts.BankProductSetStatusBody`
- `MoonBanking.BankProducts.BankProductUpdateResponse`
- `MoonBanking.BankProducts.BankProductUpdateBody`

Methods:

- `client.bankProducts.list(query?)` -> `MoonBanking.BankProducts.BankProductListResponsesCursorPage`
  - `GET /bank-products`
- `client.bankProducts.create(bankId, body)` -> `MoonBanking.BankProducts.BankProductCreateResponse`
  - `POST /banks/{bankId}/products`
- `client.bankProducts.delete(bankId, id)` -> `MoonBanking.BankProducts.BankProductDeleteResponse`
  - `DELETE /banks/{bankId}/products/{id}`
- `client.bankProducts.listByBank(bankId)` -> `MoonBanking.BankProducts.BankProductListByBankResponse`
  - `GET /banks/{bankId}/products`
- `client.bankProducts.listManaged(bankId)` -> `MoonBanking.BankProducts.BankProductListManagedResponse`
  - `GET /banks/{bankId}/managed-products`
- `client.bankProducts.setStatus(bankId, id, body)` -> `MoonBanking.BankProducts.BankProductSetStatusResponse`
  - `PUT /banks/{bankId}/products/{id}/status`
- `client.bankProducts.update(bankId, id, body)` -> `MoonBanking.BankProducts.BankProductUpdateResponse`
  - `PUT /banks/{bankId}/products/{id}`

# BankVotes

Types:

- `MoonBanking.BankVotes.BankVoteListResponse`
- `MoonBanking.BankVotes.BankVoteListResponsesCursorPage`
- `MoonBanking.BankVotes.BankVoteListParams`

Methods:

- `client.bankVotes.list(query?)` -> `MoonBanking.BankVotes.BankVoteListResponsesCursorPage`
  - `GET /bank-votes`

# Banks

Types:

- `MoonBanking.Banks.BankListResponse`
- `MoonBanking.Banks.BankListResponsesCursorPage`
- `MoonBanking.Banks.BankListParams`
- `MoonBanking.Banks.BankGetResponse`
- `MoonBanking.Banks.BankGetParams`
- `MoonBanking.Banks.BankGetByHostnameResponse`
- `MoonBanking.Banks.BankGetByHostnameParams`
- `MoonBanking.Banks.BankSemanticSearchResponse`
- `MoonBanking.Banks.BankSemanticSearchParams`

Methods:

- `client.banks.list(query?)` -> `MoonBanking.Banks.BankListResponsesCursorPage`
  - `GET /banks`
- `client.banks.get(id, query?)` -> `MoonBanking.Banks.BankGetResponse`
  - `GET /banks/{id}`
- `client.banks.getByHostname(query)` -> `MoonBanking.Banks.BankGetByHostnameResponse`
  - `GET /banks/by-hostname`
- `client.banks.semanticSearch(query)` -> `MoonBanking.Banks.BankSemanticSearchResponse`
  - `GET /banks/semantic-search`

# Countries

Types:

- `MoonBanking.Countries.CountryListResponse`
- `MoonBanking.Countries.CountryListResponsesCursorPage`
- `MoonBanking.Countries.CountryListParams`
- `MoonBanking.Countries.CountryGetResponse`
- `MoonBanking.Countries.CountryGetParams`

Methods:

- `client.countries.list(query?)` -> `MoonBanking.Countries.CountryListResponsesCursorPage`
  - `GET /countries`
- `client.countries.get(code, query?)` -> `MoonBanking.Countries.CountryGetResponse`
  - `GET /countries/{code}`

# Markets

Types:

- `MoonBanking.Markets.MarketListResponse`
- `MoonBanking.Markets.MarketListResponsesCursorPage`
- `MoonBanking.Markets.MarketListParams`
- `MoonBanking.Markets.MarketGetResponse`

Methods:

- `client.markets.list(query?)` -> `MoonBanking.Markets.MarketListResponsesCursorPage`
  - `GET /markets`
- `client.markets.get(id)` -> `MoonBanking.Markets.MarketGetResponse`
  - `GET /markets/{id}`

# Search

Types:

- `MoonBanking.Search.SearchGetResponse`
- `MoonBanking.Search.SearchGetParams`

Methods:

- `client.search.get(query)` -> `MoonBanking.Search.SearchGetResponse`
  - `GET /search`

# Stocks

Types:

- `MoonBanking.Stocks.StockListResponse`
- `MoonBanking.Stocks.StockListResponsesCursorPage`
- `MoonBanking.Stocks.StockListParams`
- `MoonBanking.Stocks.StockGetResponse`
- `MoonBanking.Stocks.StockGetParams`

Methods:

- `client.stocks.list(query?)` -> `MoonBanking.Stocks.StockListResponsesCursorPage`
  - `GET /stocks`
- `client.stocks.get(id, query?)` -> `MoonBanking.Stocks.StockGetResponse`
  - `GET /stocks/{id}`

# Stories

Types:

- `MoonBanking.Stories.StoryListResponse`
- `MoonBanking.Stories.StoryListResponsesCursorPage`
- `MoonBanking.Stories.StoryListParams`
- `MoonBanking.Stories.StoryGetResponse`
- `MoonBanking.Stories.StoryGetParams`

Methods:

- `client.stories.list(query?)` -> `MoonBanking.Stories.StoryListResponsesCursorPage`
  - `GET /stories`
- `client.stories.get(id, query?)` -> `MoonBanking.Stories.StoryGetResponse`
  - `GET /stories/{id}`

# World

Types:

- `MoonBanking.World.WorldGetResponse`
- `MoonBanking.World.WorldGetParams`

Methods:

- `client.world.get(query?)` -> `MoonBanking.World.WorldGetResponse`
  - `GET /world`
