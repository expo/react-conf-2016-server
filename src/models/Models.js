/**
 * @providesModule Models
 */

import ActivityModel from 'ActivityModel';
import EventModel from 'EventModel';
import ScheduleModel from 'ScheduleModel';
import ScheduleSlotModel from 'ScheduleSlotModel';
import SpeakerModel from 'SpeakerModel';
import TalkModel from 'TalkModel';

TalkModel.belongsTo(SpeakerModel, 'speaker', 'speakerId', 'id');
ScheduleSlotModel.hasMany(TalkModel, 'talks', 'id', 'scheduleSlotId');
ScheduleSlotModel.hasOne(ActivityModel, 'activity', 'id', 'scheduleSlotId');
ScheduleModel.hasMany(ScheduleSlotModel, 'slots', 'id', 'scheduleId');
EventModel.hasMany(ScheduleModel, 'schedules', 'id', 'eventId');

export default {
  ActivityModel,
  EventModel,
  ScheduleModel,
  ScheduleSlotModel,
  SpeakerModel,
  TalkModel,
};
