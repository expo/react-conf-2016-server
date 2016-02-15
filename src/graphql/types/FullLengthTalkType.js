/**
 * @providesModule FullLengthTalkType
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

const FullLengthTalkType = new GraphQLObjectType({
  name: 'FullLengthTalk',
  description: 'A talk',

  isTypeOf: t => t.type === 'full-length-talk',

  fields: () => ({
    id: globalIdField('FullLengthTalk'),

    title: { type: GraphQLString },
    description: { type: GraphQLString },

    speaker: {
      type: SpeakerType,
      resolve: SpeakerResolvers.speakerForTalkResolver,
    },
  }),

  interfaces: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(FullLengthTalkType);
