/**
 * @providesModule UserResolvers
 * @flow
 */

import type { GraphQLResolveInfo } from 'graphql';

import createNodeResolverWithLoader from 'createNodeResolverWithLoader';

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

export const userNodeResolver = createNodeResolverWithLoader('usersById');
