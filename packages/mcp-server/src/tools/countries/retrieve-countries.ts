// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'moon-banking-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moon-banking';

export const metadata: Metadata = {
  resource: 'countries',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/countries/{code}',
  operationId: 'country-getByCountryCode',
};

export const tool: Tool = {
  name: 'retrieve_countries',
  description:
    'This endpoint allows you to retrieve a specific country by providing the 2-letter ISO country code. You can include related data like scores in the response.',
  inputSchema: {
    type: 'object',
    properties: {
      code: {
        type: 'string',
        description: "The country's ISO 3166-1 code (2 characters).",
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `scores`',
      },
    },
    required: ['code'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const { code, ...body } = args as any;
  return asTextContentResult(await client.countries.retrieve(code, body));
};

export default { metadata, tool, handler };
