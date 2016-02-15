/**
 * @providesModule SpeakerType
 * @flow
 */

import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import * as SpeakerResolvers from 'SpeakerResolvers';
import TalkType from 'TalkType';

const SpeakerType = new GraphQLObjectType({
  name: 'Speaker',
  description: 'A speaker at a conference',

  fields: () => ({
    id: globalIdField('Speaker'),
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    company: { type: GraphQLString },
    avatarUrl: { type: GraphQLString },
    talks: { // TODO @skevy: Should be a connection
      type: new GraphQLList(TalkType),
      resolve: SpeakerResolvers.talksForSpeakerResolver,
    },
  }),

  interfaces: () => [nodeInterface],
});

export default RelayRegistry.registerNodeType(SpeakerType);
