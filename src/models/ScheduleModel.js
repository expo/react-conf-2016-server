/**
 * @providesModule ScheduleModel
 */

import thinky, { fType, r } from 'DB';

const Schedule = thinky.createModel('Schedule', {
  id: fType.string(),

  eventId: fType.string(),

  date: fType.date(),

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

Schedule.ensureIndex('created');
Schedule.ensureIndex('modified');

Schedule.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default Schedule;
