/**
 * @providesModule RelayRegistry
 * @flow
 */

import type {
  GraphQLObjectType,
} from 'graphql';

class RelayRegistry {
  static _nodeTypeMap: Map<string, GraphQLObjectType> = new Map();
  static _nodeResolverMap: Map<string, Function> = new Map();

  static registerNodeType(type: GraphQLObjectType): GraphQLObjectType {
    RelayRegistry._nodeTypeMap.set(type.name.toLowerCase(), type);
    return type;
  }

  static registerResolverForType(type: GraphQLObjectType, resolver: Function): Function {
    const typeName: string = type.name.toLowerCase();
    const resolverWithRelayType: Function = _wrapResolver(typeName, resolver);
    RelayRegistry._nodeResolverMap.set(typeName, resolverWithRelayType);
    return resolverWithRelayType;
  }

  static getResolverForNodeType(typeName: string): Function | void {
    if (!RelayRegistry._nodeResolverMap.has(typeName.toLowerCase())) {
      throw new Error(`Resolver for RelayType "${typeName}" not defined`);
    }
    return RelayRegistry._nodeResolverMap.get(typeName.toLowerCase());
  }

  static getNodeForTypeName(typeName: string): GraphQLObjectType | void {
    if (!RelayRegistry._nodeTypeMap.has(typeName.toLowerCase())) {
      throw new Error(`RelayType "${typeName}" not defined`);
    }
    return RelayRegistry._nodeTypeMap.get(typeName.toLowerCase());
  }
}

export default RelayRegistry;

function _wrapResolver(typeName: string, resolver: Function): Function {
  return (...args) => {
    let resolved = resolver(...args);
    if (resolved) {
      Object.assign(resolved, { __relayType: typeName });
    }
    return resolved;
  };
}
