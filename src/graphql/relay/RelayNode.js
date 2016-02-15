/**
 * @providesModule RelayNode
 * @flow
 */

import type {
  GraphQLObjectType,
} from 'graphql';

import {
  nodeDefinitions,
  fromGlobalId,
} from 'graphql-relay';

import RelayRegistry from 'RelayRegistry';

type NodeObject = {
  __relayType: string;
};

const { nodeInterface, nodeField } = nodeDefinitions(
  (globalId, info): Object => { // return the correct object, given the global id
    const { id, type } = fromGlobalId(globalId);
    const resolver = RelayRegistry.getResolverForNodeType(type);
    if (!resolver) {
      throw new Error(`Undefined node resolver for node type ${type}`);
    }
    return resolver(null, { id }, info);
  },
  (obj: NodeObject): GraphQLObjectType => { // given an object, resolve the correct type
    if (!obj.__relayType) {
      throw new Error(`No __relayType defined on object.`);
    }
    return RelayRegistry.getNodeForTypeName(obj.__relayType);
  }
);

export { nodeInterface, nodeField };
