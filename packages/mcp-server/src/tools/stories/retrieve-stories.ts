// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { maybeFilter } from 'moonbanking-mcp/filtering';
import { Metadata, asTextContentResult } from 'moonbanking-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moonbanking';

export const metadata: Metadata = {
  resource: 'stories',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/stories/{id}',
  operationId: 'story-getById',
};

export const tool: Tool = {
  name: 'retrieve_stories',
  description:
    "When using this tool, always use the `jq_filter` parameter to reduce the response size and improve performance.\n\nOnly omit if you're sure you don't need the data.\n\nThis endpoint allows you to retrieve a specific story by providing the story ID. You can include related data like bank and country information in the response.\n\n# Response Schema\n```json\n{\n  $ref: '#/$defs/story_retrieve_response',\n  $defs: {\n    story_retrieve_response: {\n      type: 'object',\n      properties: {\n        data: {\n          type: 'object',\n          description: 'The story model contains user-generated content about banks, as well as information about the bank and country in which the bank is located.',\n          properties: {\n            id: {\n              type: 'string',\n              description: 'The story\\'s auto-generated unique identifier.'\n            },\n            bankId: {\n              type: 'string',\n              description: 'The ID of the bank this story is about.'\n            },\n            createdAt: {\n              type: 'string',\n              description: 'The date and time the story was created in Moon Banking.',\n              format: 'date-time'\n            },\n            tags: {\n              type: 'array',\n              description: 'An array of tags associated with this story for categorization and filtering. Possible tags are `CRYPTO_FRIENDLY`, `FEES_PRICING`, `DIGITAL_EXPERIENCE`, `ACCOUNT_FEATURES`, `CUSTOMER_SERVICE`, `SECURITY_TRUST`, `BRANCH_ATM_ACCESS`, `INTERNATIONAL_BANKING`, `BUSINESS_BANKING`, `PROCESSING_SPEED`, `TRANSPARENCY`, `INNOVATION`, `INVESTMENT_SERVICES` and `LENDING`.',\n              items: {\n                type: 'string'\n              }\n            },\n            text: {\n              type: 'string',\n              description: 'The story content submitted by the user.'\n            },\n            thumbsUpCount: {\n              type: 'integer',\n              description: 'The number of thumbs up votes for this story.'\n            },\n            updatedAt: {\n              type: 'string',\n              description: 'The date and time the story was last updated in Moon Banking.',\n              format: 'date-time'\n            },\n            bank: {\n              type: 'object',\n              description: 'The bank about which the story was written.',\n              properties: {\n                id: {\n                  type: 'string',\n                  description: 'The bank\\'s auto-generated unique identifier.'\n                },\n                countryId: {\n                  type: 'string',\n                  description: 'The ID of the country where this bank is located.'\n                },\n                name: {\n                  type: 'string',\n                  description: 'The bank\\'s official name or display name.'\n                },\n                url: {\n                  type: 'string',\n                  description: 'The bank\\'s official website URL.'\n                }\n              },\n              required: [                'id',\n                'countryId',\n                'name'\n              ]\n            },\n            country: {\n              type: 'object',\n              description: 'The country of the bank about which the story was written.',\n              properties: {\n                id: {\n                  type: 'string',\n                  description: 'The country\\'s auto-generated unique identifier.'\n                },\n                code: {\n                  type: 'string',\n                  description: 'The country\\'s ISO 3166-1 code (2 characters).'\n                },\n                emoji: {\n                  type: 'string',\n                  description: 'The country\\'s flag emoji representation.'\n                },\n                name: {\n                  type: 'string',\n                  description: 'The country\\'s official name. Must be unique across all countries.'\n                }\n              },\n              required: [                'id',\n                'code',\n                'emoji',\n                'name'\n              ]\n            }\n          },\n          required: [            'id',\n            'bankId',\n            'createdAt',\n            'tags',\n            'text',\n            'thumbsUpCount',\n            'updatedAt'\n          ]\n        },\n        success: {\n          type: 'string',\n          enum: [            true\n          ]\n        },\n        timestamp: {\n          type: 'string'\n        },\n        version: {\n          type: 'string'\n        },\n        message: {\n          type: 'string'\n        }\n      },\n      required: [        'data',\n        'success',\n        'timestamp',\n        'version'\n      ]\n    }\n  }\n}\n```",
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The story's auto-generated unique identifier.",
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `bank`, `country`',
      },
      jq_filter: {
        type: 'string',
        title: 'jq Filter',
        description:
          'A jq filter to apply to the response to include certain fields. Consult the output schema in the tool description to see the fields that are available.\n\nFor example: to include only the `name` field in every object of a results array, you can provide ".results[].name".\n\nFor more information, see the [jq documentation](https://jqlang.org/manual/).',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const { id, jq_filter, ...body } = args as any;
  return asTextContentResult(await maybeFilter(jq_filter, await client.stories.retrieve(id, body)));
};

export default { metadata, tool, handler };
