// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'moon-banking-mcp/filtering';
import { Metadata, asTextContentResult } from 'moon-banking-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moon-banking';

export const metadata: Metadata = {
  resource: 'countries',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/countries/{code}/stories',
  operationId: 'country-getStories',
};

export const tool: Tool = {
  name: 'list_stories_countries',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint allows you to retrieve a paginated list of all stories for banks in a specific country. By default, a maximum of ten stories are shown per page. You can search stories by text content, filter by tags, and sort them by various fields.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/country_list_stories_response'\n      }\n    },\n    pagination: {\n      type: 'object',\n      properties: {\n        hasMore: {\n          type: 'boolean',\n          description: 'Whether there are more items available'\n        },\n        limit: {\n          type: 'integer',\n          description: 'Number of items per page'\n        },\n        nextCursor: {\n          type: 'string',\n          description: 'Cursor for the next page. Use this as the starting_after parameter for the next request. Null if no more pages.'\n        },\n        currentPage: {\n          type: 'integer',\n          description: 'Current page number (approximate for cursor pagination)'\n        },\n        previousCursor: {\n          type: 'string',\n          description: 'Cursor for the previous page. Use this as the ending_before parameter for the previous request. Null if no previous pages.'\n        },\n        total: {\n          type: 'integer',\n          description: 'Total number of items (approximate for cursor pagination)'\n        },\n        totalPages: {\n          type: 'integer',\n          description: 'Total number of pages (approximate for cursor pagination)'\n        }\n      },\n      required: [        'hasMore',\n        'limit',\n        'nextCursor'\n      ]\n    },\n    success: {\n      type: 'string',\n      enum: [        true\n      ]\n    },\n    timestamp: {\n      type: 'string'\n    },\n    version: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    }\n  },\n  required: [    'data',\n    'pagination',\n    'success',\n    'timestamp',\n    'version'\n  ],\n  $defs: {\n    country_list_stories_response: {\n      type: 'object',\n      description: 'The story model contains user-generated content about banks, as well as information about the bank and country in which the bank is located.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The story\\'s auto-generated unique identifier.'\n        },\n        bankId: {\n          type: 'string',\n          description: 'The ID of the bank this story is about.'\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time the story was created in Moon Banking.',\n          format: 'date-time'\n        },\n        tags: {\n          type: 'array',\n          description: 'An array of tags associated with this story for categorization and filtering. Possible tags are `CRYPTO_FRIENDLY`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`, `ACCOUNT_FEATURES`, `CUSTOMER_SERVICE`, `SECURITY_TRUST`, `BRANCH_ATM_ACCESS`, `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`, `INNOVATION`, `INVESTMENT_SERVICES` and `LENDING`.',\n          items: {\n            type: 'string'\n          }\n        },\n        text: {\n          type: 'string',\n          description: 'The story content submitted by the user.'\n        },\n        thumbsUpCount: {\n          type: 'integer',\n          description: 'The number of thumbs up votes for this story.'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time the story was last updated in Moon Banking.',\n          format: 'date-time'\n        },\n        bank: {\n          type: 'object',\n          description: 'The bank about which the story was written.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The bank\\'s auto-generated unique identifier.'\n            },\n            countryId: {\n              type: 'string',\n              description: 'The ID of the country where this bank is located.'\n            },\n            name: {\n              type: 'string',\n              description: 'The bank\\'s official name or display name.'\n            },\n            url: {\n              type: 'string',\n              description: 'The bank\\'s official website URL.'\n            }\n          },\n          required: [            'id',\n            'countryId',\n            'name'\n          ]\n        },\n        country: {\n          type: 'object',\n          description: 'The country of the bank about which the story was written.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The country\\'s auto-generated unique identifier.'\n            },\n            code: {\n              type: 'string',\n              description: 'The country\\'s ISO 3166-1 code (2 characters).'\n            },\n            emoji: {\n              type: 'string',\n              description: 'The country\\'s flag emoji representation.'\n            },\n            name: {\n              type: 'string',\n              description: 'The country\\'s official name. Must be unique across all countries.'\n            }\n          },\n          required: [            'id',\n            'code',\n            'emoji',\n            'name'\n          ]\n        }\n      },\n      required: [        'id',\n        'bankId',\n        'createdAt',\n        'tags',\n        'text',\n        'thumbsUpCount',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: 'The 2-letter ISO code of the country to get stories for.',
      },
      ending_before: {
        type: 'string',
        description:
          'Cursor for backward pagination. Use the id of the first item from the current page to get the previous page.',
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `paginationTotal`, `bank`',
      },
      limit: {
        type: 'integer',
        description: 'Number of items to return.',
      },
      search: {
        type: 'string',
        description: 'Search stories by text content.',
      },
      sortBy: {
        type: 'string',
        description: 'Field to sort stories by.',
        enum: ['createdAt', 'thumbsUpCount'],
      },
      sortOrder: {
        type: 'string',
        description: 'Sort order. Either ascending or descending.',
        enum: ['asc', 'desc'],
      },
      starting_after: {
        type: 'string',
        description:
          'Cursor for forward pagination. Use the id of the last item from the previous page to get the next page.',
      },
      tags: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `CRYPTO_FRIENDLY`, `CUSTOMER_SERVICE`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`, `SECURITY_TRUST`, `ACCOUNT_FEATURES`, `BRANCH_ATM_ACCESS`, `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`, `INNOVATION`, `INVESTMENT_SERVICES`, `LENDING`',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['code'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const { code, jq_filter, ...body } = args as any;
  const response = await client.countries.listStories(code, body).asResponse();
  return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
};

export default { metadata, tool, handler };
