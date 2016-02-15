/**
 * @providesModule EventResolvers
 * @flow
 */

import createNodeResolverWithLoader from 'createNodeResolverWithLoader';
import EventModel from 'EventModel';

export const currentEventResolver = async (): Promise<EventModel> => {
  const events = await EventModel.run();
  return events[0];
};

export const eventNodeResolver = createNodeResolverWithLoader('eventsById');
