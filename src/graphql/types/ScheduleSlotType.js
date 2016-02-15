/**
 * @providesModule ScheduleSlotType
 * @flow
 */

import {
  GraphQLUnionType,
} from 'graphql';

import ActivitySlotType from 'ActivitySlotType';
import LightningTalksSlotType from 'LightningTalksSlotType';
import TalkSlotType from 'TalkSlotType';

const ScheduleSlotType = new GraphQLUnionType({
  name: 'ScheduleSlot',
  types: [TalkSlotType, LightningTalksSlotType, ActivitySlotType],

  resolveType(value) {
    switch (value.type) {
      case 'full-length-talk':
        return TalkSlotType;
      case 'lightning-talks':
        return LightningTalksSlotType;
      case 'activity':
        return ActivitySlotType;
    }
  },
});

export default ScheduleSlotType;
