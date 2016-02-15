/**
 * @providesModule ScheduleType
 */

import {
  GraphQLList,
  GraphQLObjectType,
} from 'graphql';

import CustomGraphQLDateType from 'graphql-custom-datetype';
import { globalIdField } from 'graphql-relay';

import ScheduleSlotType from 'ScheduleSlotType';
import * as ScheduleResolvers from 'ScheduleResolvers';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';

const ScheduleType = new GraphQLObjectType({
  name: 'Schedule',

  fields: () => ({
    id: globalIdField('Schedule'),
    date: { type: CustomGraphQLDateType },
    slots: {
      type: new GraphQLList(ScheduleSlotType),
      resolve: ScheduleResolvers.scheduleSlotResolver,
    },
  }),

  interfaces: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(ScheduleType);
