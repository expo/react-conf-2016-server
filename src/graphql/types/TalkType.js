/**
 * @providesModule TalkType
 * @flow
 */

import {
  GraphQLUnionType,
} from 'graphql';

import FullLengthTalkType from 'FullLengthTalkType';
import LightningTalkType from 'LightningTalkType';

const TalkType = new GraphQLUnionType({
  name: 'Talk',
  description: 'A talk',
  types: [FullLengthTalkType, LightningTalkType],

  resolveType(value) {
    switch (value.type) {
      case 'full-length-talk':
        return FullLengthTalkType;
      case 'lightning-talk':
        return LightningTalkType;
    }
  },
});

export default TalkType;
