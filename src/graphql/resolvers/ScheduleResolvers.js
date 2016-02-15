/**
 * @providesModule ScheduleResolvers
 * @flow
 */

import type { GraphQLResolveInfo } from 'graphql';
import ScheduleModel from 'ScheduleModel';
import ScheduleSlotModel from 'ScheduleSlotModel';

export const schedulesResolver = async (
  viewer: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  const { currentEvent } = viewer;
  const schedules = await ScheduleModel.filter({ eventId: currentEvent.id });
  return schedules;
};

export const scheduleSlotResolver = async (
  schedule: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  const slots = await ScheduleSlotModel.filter({ scheduleId: schedule.id }).orderBy('startTime').getJoin({
    talks: true,
    activity: true,
  });

  return slots;
};
