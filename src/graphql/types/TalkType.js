/**
 * @providesModule TalkType
 * @flow
 */

import {
  GraphQLUnionType,
} from 'graphql';

import FullLengthTalkType from 'FullLengthTalkType';
import LightningTalkType from 'LightningTalkType';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';

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

  interface: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(TalkType);
