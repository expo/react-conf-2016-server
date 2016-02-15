/**
 * @providesModule SpeakerResolvers
 * @flow
 */

import type { GraphQLResolveInfo } from 'graphql';

import createNodeResolverWithLoader from 'createNodeResolverWithLoader';
import { r } from 'DB';
import SpeakerModel from 'SpeakerModel';
import TalkModel from 'TalkModel';

export const allSpeakersResolver = async (
  viewer: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  const { rootValue: { loaders } } = info;
  const speakerIds = await SpeakerModel.map(r.row('id')).execute();
  const speakers = await loaders.speakersById.loadMany(speakerIds);
  return speakers;
};

export const speakerForTalkResolver = async (
  talk: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  const { rootValue: { loaders } } = info;
  const { speakerId } = talk;
  const speaker = await loaders.speakersById.load(speakerId);
  return speaker;
};

export const talksForSpeakerResolver = async (
  speaker: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Array<Object>> => {
  const { rootValue: { loaders } } = info;
  const talkIds = await TalkModel.filter({ speakerId: speaker.id }).map(r.row('id')).execute();
  const talks = await loaders.talksById.loadMany(talkIds);
  return talks;
};

export const speakerNodeResolver = createNodeResolverWithLoader('speakerById');
