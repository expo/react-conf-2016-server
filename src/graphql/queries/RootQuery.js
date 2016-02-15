/**
 * @providesModule RootQuery
 * @flow
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { nodeField } from 'RelayNode';
import ViewerQuery from 'ViewerQuery';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',

  fields: () => ({
    viewer: ViewerQuery,
    node: nodeField,
  }),

});

export default RootQuery;
