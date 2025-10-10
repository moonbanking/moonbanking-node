# Banks

Types:

- <code><a href="./src/resources/banks.ts">BankRetrieveResponse</a></code>
- <code><a href="./src/resources/banks.ts">BankListResponse</a></code>
- <code><a href="./src/resources/banks.ts">BankRetrieveStoriesResponse</a></code>

Methods:

- <code title="get /banks/{id}">client.banks.<a href="./src/resources/banks.ts">retrieve</a>(id, { ...params }) -> BankRetrieveResponse</code>
- <code title="get /banks">client.banks.<a href="./src/resources/banks.ts">list</a>({ ...params }) -> BankListResponsesCursorPage</code>
- <code title="get /banks/{id}/stories">client.banks.<a href="./src/resources/banks.ts">retrieveStories</a>(id, { ...params }) -> BankRetrieveStoriesResponsesCursorPage</code>

# Countries

Types:

- <code><a href="./src/resources/countries.ts">CountryRetrieveResponse</a></code>
- <code><a href="./src/resources/countries.ts">CountryListResponse</a></code>
- <code><a href="./src/resources/countries.ts">CountryListStoriesResponse</a></code>

Methods:

- <code title="get /countries/{code}">client.countries.<a href="./src/resources/countries.ts">retrieve</a>(code, { ...params }) -> CountryRetrieveResponse</code>
- <code title="get /countries">client.countries.<a href="./src/resources/countries.ts">list</a>({ ...params }) -> CountryListResponsesCursorPage</code>
- <code title="get /countries/{code}/stories">client.countries.<a href="./src/resources/countries.ts">listStories</a>(code, { ...params }) -> CountryListStoriesResponsesCursorPage</code>

# Stories

Types:

- <code><a href="./src/resources/stories.ts">StoryRetrieveResponse</a></code>
- <code><a href="./src/resources/stories.ts">StoryListResponse</a></code>

Methods:

- <code title="get /stories/{id}">client.stories.<a href="./src/resources/stories.ts">retrieve</a>(id, { ...params }) -> StoryRetrieveResponse</code>
- <code title="get /stories">client.stories.<a href="./src/resources/stories.ts">list</a>({ ...params }) -> StoryListResponsesCursorPage</code>

# World

Types:

- <code><a href="./src/resources/world.ts">WorldRetrieveResponse</a></code>

Methods:

- <code title="get /world">client.world.<a href="./src/resources/world.ts">retrieve</a>({ ...params }) -> WorldRetrieveResponse</code>
