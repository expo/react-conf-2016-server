/**
 * @providesModule ActivityModel
 */

import thinky, { fType, r } from 'DB';

const Activity = thinky.createModel('Activity', {
  id: fType.string(),

  scheduleSlotId: fType.string(),

  title: fType.string(),
  description: fType.string(),

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

Activity.ensureIndex('created');
Activity.ensureIndex('modified');

Activity.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default Activity;
