/**
 * @providesModule createNodeResolverWithLoader
 * @flow
 */

import type {
  GraphQLResolveInfo,
} from 'graphql';

export default function createNodeResolverWithLoader(loaderName: string): Function {
  return async (root: Object, args: { [key: string]: mixed }, info: GraphQLResolveInfo) => {
    const { id: nodeId } = args;
    const { rootValue: { loaders } } = info;
    return await loaders[loaderName].load(nodeId);
  };
}
