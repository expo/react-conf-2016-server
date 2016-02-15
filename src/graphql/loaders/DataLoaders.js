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
      return await _getAllById(Models.SpeakerModel, speakerIds);
    });
  }

  static talksById(reqContext: Object): DataLoader {
    return new DataLoader(async talkIds => {
      return await _getAllById(Models.TalkModel, talkIds);
    });
  }
}

async function _getAllById(ThinkyModel, ids) {
  const results = await ThinkyModel.getAll(...ids);
  const resultsById = results.reduce((byId, result) => {
    byId[result.id] = result;
    return byId;
  }, {});
  return ids.map(id => resultsById[id]);
}
