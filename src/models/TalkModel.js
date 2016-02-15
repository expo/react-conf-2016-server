/**
 * @providesModule TalkModel
 */

import thinky, { fType, r } from 'DB';

const Talk = thinky.createModel('Talk', {
  id: fType.string(),

  scheduleSlotId: fType.string(),

  type: fType.string(), // full-length-talk, lightning
  order: fType.number(),

  title: fType.string(),
  description: fType.string(),

  speakerId: fType.string(),

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

Talk.ensureIndex('created');
Talk.ensureIndex('modified');

Talk.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default Talk;
