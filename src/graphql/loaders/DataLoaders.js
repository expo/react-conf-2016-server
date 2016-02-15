/**
 * @providesModule DataLoaders
 * @flow
 */

import DataLoader from 'dataloader';
import Models from 'Models';

export default class DataLoaders {
  static create(reqContext: Object): Object {
    return {
      eventsById: DataLoaders.eventsById(reqContext),
      schedulesById: DataLoaders.schedulesById(reqContext),
      scheduleSlotsById: DataLoaders.scheduleSlotsById(reqContext),
      activitiesById: DataLoaders.activitiesById(reqContext),
      talksById: DataLoaders.talksById(reqContext),
      speakersById: DataLoaders.speakersById(reqContext),
    };
  }

  static eventsById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.EventModel, reqContext);
  }

  static schedulesById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.ScheduleModel, reqContext);
  }

  static scheduleSlotsById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.ScheduleSlotModel, reqContext);
  }

  static activitiesById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.ActivityModel, reqContext);
  }

  static talksById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.TalkModel, reqContext);
  }

  static speakersById(reqContext: Object): DataLoader {
    return _idLoaderForModel(Models.SpeakerModel, reqContext);
  }
}

function _idLoaderForModel(model, reqContext: Object): DataLoader {
  return new DataLoader(async ids => {
    return await _getAllById(model, ids);
  });
}

async function _getAllById(ThinkyModel, ids) {
  const results = await ThinkyModel.getAll(...ids);
  const resultsById = results.reduce((byId, result) => {
    byId[result.id] = result;
    return byId;
  }, {});
  return ids.map(id => resultsById[id]);
}
