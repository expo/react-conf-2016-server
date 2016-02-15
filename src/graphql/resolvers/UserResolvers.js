/**
 * @providesModule UserResolvers
 * @flow
 */

import type { GraphQLResolveInfo } from 'graphql';

export const meResolver = async (
  viewer: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  // Stub
  return {
    id: 1,
  };
};
