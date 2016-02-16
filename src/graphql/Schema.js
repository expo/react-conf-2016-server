/**
 * @providesModule Schema
 */

import {
  GraphQLSchema,
} from 'graphql';

import RootQuery from 'RootQuery';
// import Mutations from 'Mutations';

export const Schema = new GraphQLSchema({
  query: RootQuery,
  // mutation: Mutations
});

export default Schema;
