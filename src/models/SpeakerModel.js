/**
 * @providesModule SpeakerModel
 */

import thinky, { fType, r } from 'DB';

const Speaker = thinky.createModel('Speaker', {
  id: fType.string(),

  name: fType.string(),
  company: fType.string(),
  bio: fType.string(),

  avatarUrl: fType.string(),

  created: fType.date().default(r.now()),
  modified: fType.date(),
}, {
  pk: 'id',
});

Speaker.ensureIndex('created');
Speaker.ensureIndex('modified');

Speaker.pre('save', function(next) {
  this.modified = r.now();
  next();
});

export default Speaker;
