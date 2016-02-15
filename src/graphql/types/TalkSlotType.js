/**
 * @providesModule TalkSlotType
 */

import {
  GraphQLObjectType,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import ScheduleSlotInterface, { fields as ScheduleSlotInterfaceFields } from 'ScheduleSlotInterface';
import FullLengthTalkType from 'FullLengthTalkType';

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

export default RelayRegistry.registerNodeType(TalkSlotType);
