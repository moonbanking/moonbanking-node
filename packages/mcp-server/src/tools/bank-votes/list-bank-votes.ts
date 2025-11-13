// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { isJqError, maybeFilter } from '@moonbanking/mcp/filtering';
import { Metadata, asErrorResult, asTextContentResult } from '@moonbanking/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moonbanking';

export const metadata: Metadata = {
  resource: 'bank_votes',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/bank-votes',
  operationId: 'bankVote-get',
};

export const tool: Tool = {
  name: 'list_bank_votes',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint allows you to retrieve a paginated list of bank votes. You can filter by bank ID, category, country, vote type (upvote or downvote), and other parameters.\n\n# Response Schema\n```json\n{\n  type: 'object',\n  properties: {\n    data: {\n      type: 'array',\n      items: {\n        $ref: '#/$defs/bank_vote_list_response'\n      }\n    },\n    pagination: {\n      type: 'object',\n      properties: {\n        hasMore: {\n          type: 'boolean',\n          description: 'Whether there are more items available'\n        },\n        limit: {\n          type: 'integer',\n          description: 'Number of items per page'\n        },\n        nextCursor: {\n          type: 'string',\n          description: 'Cursor for the next page. Use this as the starting_after parameter for the next request. Null if no more pages.'\n        },\n        meta: {\n          type: 'object',\n          description: 'If meta is included in the include parameter, the meta object will be included in the response.',\n          properties: {\n            total: {\n              type: 'integer',\n              description: 'Total count of all items that match the query parameters'\n            }\n          },\n          required: [            'total'\n          ]\n        },\n        previousCursor: {\n          type: 'string',\n          description: 'Cursor for the previous page. Use this as the ending_before parameter for the previous request. Null if no previous pages.'\n        }\n      },\n      required: [        'hasMore',\n        'limit',\n        'nextCursor'\n      ]\n    },\n    success: {\n      type: 'string',\n      enum: [        true\n      ]\n    },\n    timestamp: {\n      type: 'string'\n    },\n    version: {\n      type: 'string'\n    },\n    message: {\n      type: 'string'\n    }\n  },\n  required: [    'data',\n    'pagination',\n    'success',\n    'timestamp',\n    'version'\n  ],\n  $defs: {\n    bank_vote_list_response: {\n      type: 'object',\n      description: 'The bank vote model contains voting information for banks, including the vote direction. When fetching votes, the related bank and/or country data may optionally be included in the response.',\n      properties: {\n        id: {\n          type: 'string',\n          description: 'The vote\\'s auto-generated unique identifier.'\n        },\n        bankId: {\n          type: 'string',\n          description: 'The ID of the bank for which the vote was cast.'\n        },\n        category: {\n          type: 'string',\n          description: 'The category in which the vote was cast.',\n          enum: [            'CRYPTO_FRIENDLY',\n            'CUSTOMER_SERVICE',\n            'FEES_PRICING',\n            'DIGITAL_EXPERIENCE',\n            'SECURITY_TRUST',\n            'ACCOUNT_FEATURES',\n            'BRANCH_ATM_ACCESS',\n            'INTERNATIONAL_BANKING',\n            'BUSINESS_BANKING',\n            'PROCESSING_SPEED',\n            'TRANSPARENCY',\n            'INNOVATION',\n            'INVESTMENT_SERVICES',\n            'LENDING'\n          ]\n        },\n        createdAt: {\n          type: 'string',\n          description: 'The date and time the vote was created in Moon Banking.',\n          format: 'date-time'\n        },\n        isUp: {\n          type: 'boolean',\n          description: 'Whether this is an upvote (`true`) or downvote (`false`).'\n        },\n        updatedAt: {\n          type: 'string',\n          description: 'The date and time the vote was last updated in Moon Banking.',\n          format: 'date-time'\n        },\n        bank: {\n          type: 'object',\n          description: 'The bank for which the vote was cast.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The bank\\'s auto-generated unique identifier.'\n            },\n            countryId: {\n              type: 'string',\n              description: 'The ID of the country where this bank is located.'\n            },\n            name: {\n              type: 'string',\n              description: 'The bank\\'s official name or display name.'\n            }\n          },\n          required: [            'id',\n            'countryId',\n            'name'\n          ]\n        },\n        country: {\n          type: 'object',\n          description: 'The country in which the bank is located.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The country\\'s auto-generated unique identifier.'\n            },\n            code: {\n              type: 'string',\n              description: 'The country\\'s ISO 3166-1 code (2 characters).'\n            },\n            emoji: {\n              type: 'string',\n              description: 'The country\\'s flag emoji representation.'\n            },\n            name: {\n              type: 'string',\n              description: 'The country\\'s official name. Must be unique across all countries.'\n            }\n          },\n          required: [            'id',\n            'code',\n            'emoji',\n            'name'\n          ]\n        }\n      },\n      required: [        'id',\n        'bankId',\n        'category',\n        'createdAt',\n        'isUp',\n        'updatedAt'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      bankId: {
        type: 'string',
        description: "The bank's auto-generated unique identifier.",
      },
      categories: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `CRYPTO_FRIENDLY`, `CUSTOMER_SERVICE`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`, `SECURITY_TRUST`, `ACCOUNT_FEATURES`, `BRANCH_ATM_ACCESS`, `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`, `INNOVATION`, `INVESTMENT_SERVICES`, `LENDING`',
      },
      countryCode: {
        type: 'string',
        description: "The country's ISO 3166-1 code (2 characters).",
      },
      ending_before: {
        type: 'string',
        description:
          'Cursor for backward pagination. Use the id of the first item from the current page to get the previous page.',
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `bank`, `country`',
      },
      isUp: {
        type: 'boolean',
        description: 'Whether to filter for upvotes (true) or downvotes (false).',
      },
      limit: {
        type: 'integer',
        description: 'Number of items to return.',
      },
      sortBy: {
        type: 'string',
        description: 'Field to sort by.',
        enum: ['createdAt'],
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
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const { jq_filter, ...body } = args as any;
  const response = await client.bankVotes.list(body).asResponse();
  try {
    return asTextContentResult(await maybeFilter(jq_filter, await response.json()));
  } catch (error) {
    if (isJqError(error)) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
