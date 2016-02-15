/**
 * @providesModule EventType
 * @flow
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import * as Scalars from 'ScalarTypes';

const EventType = new GraphQLObjectType({
  name: 'Event',
  description: 'Information about an event',

  fields: () => ({
    id: globalIdField('Event'),
    name: { type: GraphQLString },
    location: { type: Scalars.PointType },
    codeOfConduct: { type: GraphQLString },
  }),

  interfaces: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(EventType);
