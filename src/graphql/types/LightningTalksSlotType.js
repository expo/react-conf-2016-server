/**
 * @providesModule LightningTalksSlotType
 */

import {
	GraphQLList,
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';
import LightningTalkType from 'LightningTalkType';

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

export default RelayRegistry.registerNodeType(LightningTalksSlotType);
