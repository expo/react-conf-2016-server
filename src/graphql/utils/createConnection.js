/**
 * @providesModule createConnection
 * @flow
 */

type connectionConfig = {
  type: string,
  resolver: Function,
};

import type {
  GraphQLFieldConfig,
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromPromisedArray,
} from 'graphql-relay';

export default function createConnection(config: connectionConfig): GraphQLFieldConfig {
  const { type: nodeType, resolver } = config;
  const { connectionType } = connectionDefinitions({ nodeType });
  return {
    type: connectionType,
    args: connectionArgs,
    resolve: (root, args, ...otherArgs) => connectionFromPromisedArray(
      resolver(root, args, ...otherArgs),
      args
    ),
  };
}
