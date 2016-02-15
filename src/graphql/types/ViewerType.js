/**
 * @providesModule ViewerType
 * @flow
 */

import {
  GraphQLObjectType,
  GraphQLList,
} from 'graphql';

import { globalIdField } from 'graphql-relay';

import createConnection from 'createConnection';
import * as EventResolvers from 'EventResolvers';
import EventType from 'EventType';
import { nodeInterface } from 'RelayNode';
import RelayRegistry from 'RelayRegistry';
import SpeakerType from 'SpeakerType';
import * as SpeakerResolvers from 'SpeakerResolvers';
import ScheduleType from 'ScheduleType';
import * as ScheduleResolvers from 'ScheduleResolvers';
import * as UserResolvers from 'UserResolvers';
import UserType from 'UserType';

// id for 'viewer' doesn't matter, but it needs one for relay.
export const viewerResolver = async (): Object => {
  const currentEvent = await EventResolvers.currentEventResolver();
  return {
    id: 0, // TODO @skevy change this to something that has to do with their login id
    currentEvent,
  };
};

export const ViewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'Viewer of the application',

  fields: () => ({
    id: globalIdField('Viewer'),

    me: {
      type: UserType,
      description: `The current logged-in user.`,
      resolve: UserResolvers.meResolver,
    },

    schedule: { //TODO @skevy make this a connection? Not sure honestly...
      type: new GraphQLList(ScheduleType),
      description: `Schedule of the current event`,
      resolve: ScheduleResolvers.schedulesResolver,
    },

    allSpeakers: createConnection({
      type: SpeakerType,
      resolver: SpeakerResolvers.allSpeakersResolver,
    }),

    speakersByName: { //TODO @skevy Make this a connection
      type: new GraphQLList(SpeakerType),
      description: `A connection providing a list of conference speakers that can be filtered by name.`,
      resolve: SpeakerResolvers.speakerByNameResolver,
    },

    eventInfo: {
      type: EventType,
      description: `Information about the current event.`,
      resolve: viewer => viewer.currentEvent,
    },
  }),

  interfaces: () => [nodeInterface],
});

RelayRegistry.registerResolverForType(ViewerType, viewerResolver);
export default RelayRegistry.registerNodeType(ViewerType);
