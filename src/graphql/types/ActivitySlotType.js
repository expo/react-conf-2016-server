/**
 * @providesModule ActivitySlotType
 * @flow
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';

const ActivitySlotType = new GraphQLObjectType({
  name: 'ActivitySlot',
  description: 'An activity (break/lunch/etc.)',

  isTypeOf: () => true,

  fields: () => ({
    id: globalIdField('ActivitySlot'),
    title: { type: GraphQLString, resolve: slot => slot.activity.title },
    ...ScheduleSlotInterfaceFields,
  }),

  interfaces: () => [ScheduleSlotInterface, nodeInterface],
});

export default RelayRegistry.registerNodeType(ActivitySlotType);
