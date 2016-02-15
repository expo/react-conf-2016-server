/**
 * @providesModule DataLoaders
 * @flow
 */

import DataLoader from 'dataloader';
import Models from 'Models';

export default class DataLoaders {
  static create(reqContext: Object): Object {
    return {
      speakersById: DataLoaders.speakersById(reqContext),
      talksById: DataLoaders.talksById(reqContext),
    };
  }

  static speakersById(reqContext: Object): DataLoader {
    return new DataLoader(async speakerIds => {
      return await Models.SpeakerModel.getAll(...speakerIds);
    });
  }

  static talksById(reqContext: Object): DataLoader {
    return new DataLoader(async talkIds => {
      return await Models.TalkModel.getAll(...talkIds);
    });
  }
}
