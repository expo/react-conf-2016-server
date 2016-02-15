/**
 * @providesModule ScheduleSlotModel
 */

import thinky, { fType, r } from 'DB';

const ScheduleSlot = thinky.createModel('ScheduleSlot', {
  id: fType.string(),

  scheduleId: fType.string(),

  startTime: fType.date(),
  endTime: fType.date(),

  type: fType.string(), // activity, full-length-talk, lightning-talks

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

ScheduleSlot.ensureIndex('created');
ScheduleSlot.ensureIndex('modified');

ScheduleSlot.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default ScheduleSlot;
