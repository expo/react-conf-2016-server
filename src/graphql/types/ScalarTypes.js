/**
 * @providesModule ScalarTypes
 * @flow
 */

import {
  GraphQLFloat,
  GraphQLObjectType,
} from 'graphql';

export const PointType = new GraphQLObjectType({
  name: 'Point',

  fields: () => ({
    latitude: { type: GraphQLFloat, resolve: o => o.coordinates[1] },
    longitude: { type: GraphQLFloat, resolve: o => o.coordinates[0] },
  }),

});
