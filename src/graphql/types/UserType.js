/**
 * @providesModule UserType
 * @flow
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import * as UserResolvers from 'UserResolvers';

const UserType = new GraphQLObjectType({
  name: 'User',
  description: `An authenticated user of the application.`,

  fields: () => ({
    id: globalIdField('User'),
  }),

  interfaces: () => [nodeInterface],
});

RelayRegistry.registerNodeType(UserType, UserResolvers.userNodeResolver);
export default RelayRegistry.registerNodeType(UserType);
