/**
 * @providesModule TalkSlotType
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import FullLengthTalkType from 'FullLengthTalkType';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import * as ScheduleResolvers from 'ScheduleResolvers';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';

const TalkSlotType = new GraphQLObjectType({
  name: 'TalkSlot',

  isTypeOf: s => s.type === 'full-length-talk',

  fields: () => ({
    id: globalIdField('TalkSlot'),
    talk: {
      type: FullLengthTalkType,
      resolve: slot => slot.talks[0],
    },
    ...ScheduleSlotInterfaceFields,
  }),

  interfaces: () => [ScheduleSlotInterface, nodeInterface],
});

RelayRegistry.registerResolverForType(TalkSlotType, ScheduleResolvers.slotNodeResolver);
export default RelayRegistry.registerNodeType(TalkSlotType);
