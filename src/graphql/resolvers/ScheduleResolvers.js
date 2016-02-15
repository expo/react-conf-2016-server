/**
 * @providesModule ScheduleResolvers
 * @flow
 */

import type { GraphQLResolveInfo } from 'graphql';

import createNodeResolverWithLoader from 'createNodeResolverWithLoader';
import ScheduleModel from 'ScheduleModel';
import ScheduleSlotModel from 'ScheduleSlotModel';

export const schedulesForEventResolver = async (
  viewer: Object,
  args: { [key: string]: mixed },
  info: GraphQLResolveInfo
): Promise<Object> => {
  const { currentEvent } = viewer;
  const schedules = await ScheduleModel.filter({ eventId: currentEvent.id });
  return schedules;
};

export const slotsForScheduleResolver = async (
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

export const scheduleNodeResolver = createNodeResolverWithLoader('schedulesById');
export const slotNodeResolver = createNodeResolverWithLoader('scheduleSlotsById');
export const talkNodeResolver = createNodeResolverWithLoader('talksById');
