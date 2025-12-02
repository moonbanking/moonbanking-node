// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asErrorResult, asTextContentResult } from '@moonbanking/mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moonbanking';

export const metadata: Metadata = {
  resource: 'world',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/world',
  operationId: 'world-getOverview',
};

export const tool: Tool = {
  name: 'retrieve_world',
  description:
    'This endpoint allows you to retrieve global overview data that aggregates banks votes, stories and other data across all banks in all countries. You can include related data like scores in the response.',
  inputSchema: {
    type: 'object',
    properties: {
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `scores`',
      },
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  try {
    return asTextContentResult(await client.world.retrieve(body));
  } catch (error) {
    if (error instanceof MoonBanking.APIError) {
      return asErrorResult(error.message);
    }
    throw error;
  }
};

export default { metadata, tool, handler };
