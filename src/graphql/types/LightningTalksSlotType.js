/**
 * @providesModule LightningTalksSlotType
 * @flow
 */

import {
	GraphQLList,
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import LightningTalkType from 'LightningTalkType';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';
import * as ScheduleResolvers from 'ScheduleResolvers';

const LightningTalksSlotType = new GraphQLObjectType({
  name: 'LightningTalksSlot',

  isTypeOf: s => s.type === 'lightning-talks',

  fields: () => ({
    id: globalIdField('LightningTalksSlot'),
    talks: {
      type: new GraphQLList(LightningTalkType),
    },
    ...ScheduleSlotInterfaceFields,
  }),

  interfaces: () => [ScheduleSlotInterface, nodeInterface],
});

RelayRegistry.registerResolverForType(LightningTalksSlotType, ScheduleResolvers.slotNodeResolver);
export default RelayRegistry.registerNodeType(LightningTalksSlotType);
