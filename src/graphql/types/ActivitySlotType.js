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
import * as ScheduleResolvers from 'ScheduleResolvers';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';

const ActivitySlotType = new GraphQLObjectType({
  name: 'ActivitySlot',
  description: 'An activity (break/lunch/etc.)',

  isTypeOf: s => s.type === 'activity',

  fields: () => ({
    id: globalIdField('ActivitySlot'),
    title: { type: GraphQLString, resolve: slot => slot.activity.title },
    ...ScheduleSlotInterfaceFields,
  }),

  interfaces: () => [ScheduleSlotInterface, nodeInterface],
});

RelayRegistry.registerResolverForType(ActivitySlotType, ScheduleResolvers.slotNodeResolver);
export default RelayRegistry.registerNodeType(ActivitySlotType);
