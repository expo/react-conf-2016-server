/**
 * @providesModule Schema
 */

import {
  GraphQLSchema,
} from 'graphql';

import RootQuery from 'RootQuery';
// import Mutations from 'Mutations';

export default new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutations
});
