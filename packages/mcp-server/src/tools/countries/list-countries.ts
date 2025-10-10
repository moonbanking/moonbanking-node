// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { Metadata, asTextContentResult } from 'moon-banking-mcp/tools/types';

import { Tool } from '@modelcontextprotocol/sdk/types.js';
import MoonBanking from 'moon-banking';

export const metadata: Metadata = {
  resource: 'countries',
  operation: 'read',
  tags: [],
  httpMethod: 'get',
  httpPath: '/countries',
  operationId: 'country-get',
};

export const tool: Tool = {
  name: 'list_countries',
  description:
    'This endpoint allows you to retrieve a paginated list of all countries. By default, a maximum of ten countries are shown per page. You can search countries by name or 2-letter code, sort them by various fields, and include related data like scores.',
  inputSchema: {
    type: 'object',
    properties: {
      ending_before: {
        type: 'string',
        description:
          'Cursor for backward pagination. Use the id of the first item from the current page to get the previous page.',
      },
      include: {
        type: 'string',
        description:
          'An optional  comma-separated list of fields to include in the response. Possible values: `scores`',
      },
      limit: {
        type: 'integer',
        description: 'Number of items to return.',
      },
      search: {
        type: 'string',
        description: 'Search countries by name or 2-letter code.',
      },
      sortBy: {
        type: 'string',
        description: 'Field to sort by.',
        enum: [
          'name',
          'code',
          'rank',
          'banksCount',
          'storiesCount',
          'overall_score',
          'overall_total',
          'overall_up',
          'overall_down',
          'cryptoFriendly_score',
          'cryptoFriendly_total',
          'cryptoFriendly_up',
          'cryptoFriendly_down',
          'customerService_score',
          'customerService_total',
          'customerService_up',
          'customerService_down',
          'feesPricing_score',
          'feesPricing_total',
          'feesPricing_up',
          'feesPricing_down',
          'digitalExperience_score',
          'digitalExperience_total',
          'digitalExperience_up',
          'digitalExperience_down',
          'securityTrust_score',
          'securityTrust_total',
          'securityTrust_up',
          'securityTrust_down',
          'accountFeatures_score',
          'accountFeatures_total',
          'accountFeatures_up',
          'accountFeatures_down',
          'branchAtmAccess_score',
          'branchAtmAccess_total',
          'branchAtmAccess_up',
          'branchAtmAccess_down',
          'internationalBanking_score',
          'internationalBanking_total',
          'internationalBanking_up',
          'internationalBanking_down',
          'businessBanking_score',
          'businessBanking_total',
          'businessBanking_up',
          'businessBanking_down',
          'processingSpeed_score',
          'processingSpeed_total',
          'processingSpeed_up',
          'processingSpeed_down',
          'transparency_score',
          'transparency_total',
          'transparency_up',
          'transparency_down',
          'innovation_score',
          'innovation_total',
          'innovation_up',
          'innovation_down',
          'investmentServices_score',
          'investmentServices_total',
          'investmentServices_up',
          'investmentServices_down',
          'lending_score',
          'lending_total',
          'lending_up',
          'lending_down',
        ],
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
    },
    required: [],
  },
  annotations: {
    readOnlyHint: true,
  },
};

export const handler = async (client: MoonBanking, args: Record<string, unknown> | undefined) => {
  const body = args as any;
  const response = await client.countries.list(body).asResponse();
  return asTextContentResult(await response.json());
};

export default { metadata, tool, handler };
