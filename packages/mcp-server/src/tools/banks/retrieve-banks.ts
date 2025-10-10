// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'moon-banking-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moon-banking';

export const metadata: Metadata = {
  resource: 'banks',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/banks/{id}',
  operationId: 'bank-getById',
};

export const tool: Tool = {
  name: 'retrieve_banks',
  description:
    'This endpoint allows you to retrieve a specific bank by providing the bank ID. You can include related data like scores and country information in the response.',
  inputSchema: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: "The bank's auto-generated unique identifier.",
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `scores`, `country`',
      },
    },
    required: ['id'],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const { id, ...body } = args as any;
  return asTextContentResult(await client.banks.retrieve(id, body));
};

export default { metadata, tool, handler };
