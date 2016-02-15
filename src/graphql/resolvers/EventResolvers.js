/**
 * @providesModule EventResolvers
 * @flow
 */

import EventModel from 'EventModel';

export const currentEventResolver = async (): Promise<EventModel> => {
  const events = await EventModel.run();
  return events[0];
};
