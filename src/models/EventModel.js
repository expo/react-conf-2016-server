/**
 * @providesModule EventModel
 */

import thinky, { fType, r } from 'DB';

const Event = thinky.createModel('Event', {
  id: fType.string(),

  name: fType.string(),
  location: fType.point(),

  codeOfConduct: fType.string(),

  // organizers:

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

Event.ensureIndex('created');
Event.ensureIndex('modified');

Event.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default Event;
