/**
 * @providesModule LightningTalkType
 * @flow
 */

import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import * as SpeakerResolvers from 'SpeakerResolvers';
import SpeakerType from 'SpeakerType';

const LightningTalkType = new GraphQLObjectType({
  name: 'LightningTalk',
  description: 'A lightning talk',

  isTypeOf: () =>  true,

  fields: () => ({
    id: globalIdField('LightningTalk'),

    title: { type: GraphQLString },

    speaker: {
      type: SpeakerType,
      resolve: SpeakerResolvers.speakerForTalkResolver,
    },
  }),

  interfaces: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(LightningTalkType);
