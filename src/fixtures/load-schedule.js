import _ from 'lodash';
import $m from 'moment-timezone';
import util from 'util';
import rawSchedule from './raw-schedule.js';

import thinky, { r } from 'DB';
import Models from 'Models';

const DATE_FORMAT = 'YYYY-MM-DD hh:mma';

// Build schedule items

let schedules = [
  {
    date: $m.tz('2016-02-22', 'YYYY-MM-DD', 'America/Los_Angeles').utc(),
    slots: [],
  },
  {
    date: $m.tz('2016-02-23', 'YYYY-MM-DD', 'America/Los_Angeles').utc(),
    slots: [],
  },
];

let allSpeakers = [];

_.forEach(rawSchedule.schedule, (scheduleEntry) => {
  const scheduleItemType = scheduleEntry.special ? 'break' : 'talk';

  schedules[0].slots.push({
    ..._parseTimeRange(scheduleEntry.time, '2016-02-22'),
    what: _resolveTalkOrActivity(scheduleEntry.talks[0], scheduleItemType),
  });

  schedules[1].slots.push({
    ..._parseTimeRange(scheduleEntry.time, '2016-02-23'),
    what: _resolveTalkOrActivity(scheduleEntry.talks[1], scheduleItemType),
  });
});

function _parseTimeRange(rangeStr, dateStr) {
  let [ startTimeStr, endTimeStr ] = rangeStr.split('–');
  // get am pm
  let [ period ] = endTimeStr.match(/am|pm/);
  if (endTimeStr == '12:00pm') {
    startTimeStr += 'am';
  } else {
    startTimeStr += period;
  }

  const startTime = $m.tz(dateStr + ' ' + startTimeStr, DATE_FORMAT, 'America/Los_Angeles').utc();
  const endTime = $m.tz(dateStr + ' ' + endTimeStr, DATE_FORMAT, 'America/Los_Angeles').utc();

  return { startTime, endTime };
}

function _resolveTalkOrActivity(talkOrActivityKey, itemType) {
  const talkOrActivityRaw = rawSchedule.talks[talkOrActivityKey];
  let talkOrActivity;
  if (itemType == 'break') {
    talkOrActivity = _parseActivity(talkOrActivityRaw, talkOrActivityKey);
  } else {
    talkOrActivity = _parseTalk(talkOrActivityRaw, talkOrActivityKey);
  }
  return talkOrActivity;
}

function _parseActivity(activityRaw, key) {
  return {
    type: 'activity',
    title: activityRaw.title
  };
}

function _parseTalk(talkRaw, key) {
  if (key.includes('lightning')) {
    let type = 'lightning-talks';
    return {
      type,
      title: 'Lightning Talks',
      talks: _.map(talkRaw.description, (talkTitle, i) => ({
        title: talkTitle,
        speaker: _parseSpeaker(talkRaw.speakers[i], talkRaw.companies[i]),
      })),
    }
  } else {
    let type = 'full-length-talk';
    return {
      type,
      title: talkRaw.title,
      description: talkRaw.description ? talkRaw.description.join('\n\n') : '',
      speaker: _parseSpeaker(talkRaw.speakers[0], talkRaw.companies ? talkRaw.companies[0] : ''),
    }
  }
}

function _parseSpeaker(speakerName, companyName) {
  const speakerSlug = speakerName.toLowerCase().split(' ').join('-');
  const imageName = speakerSlug + '.jpg';
  const speaker = {
    name: speakerName,
    company: companyName,
    avatar: `http://conf.reactjs.com/img/${imageName}`,
  };
  allSpeakers.push([ speakerSlug, speaker ]);
  return speakerSlug;
}


// actually put the stuff in the db
r
  .db('react_conf')
  .tableList()
  .then(tables => (
    Promise.all(
      Object.keys(thinky.models)
        .filter(tableName => _.includes(tables, tableName))
        .map((table) => r.db('react_conf').table(table).delete())
    )
  ))
  .then(() => {
    return saveSpeakers();
  })
  .then(() => {
    return saveData();
  });

let _speakerModels = {};

function saveSpeakers() {
  return Promise.all(allSpeakers.map(([speakerSlug, speakerData]) => {
    const speaker = new Models.SpeakerModel({
      name: speakerData.name,
      company: speakerData.company,
      avatarUrl: speakerData.avatar,
    });

    return speaker.save().then(s => {
      _speakerModels[speakerSlug] = s;
    });
  }));
}

function saveData() {
  const event = new Models.EventModel({
    name: 'React Conf 2016',
    location: {
      longitude: -122.407237,
      latitude: 37.789127,
    },
    codeOfConduct: 'TBD',
  });

  return Promise.all(schedules.map((scheduleData) => {
    const schedule = new Models.ScheduleModel({
      date: scheduleData.date.toDate(),
    });

    return Promise.all(scheduleData.slots.map(slot => {
      const scheduleSlot = new Models.ScheduleSlotModel({
        startTime: slot.startTime.toDate(),
        endTime: slot.endTime.toDate(),
        type: slot.what.type,
      });

      if (slot.what.type === 'activity') {
        scheduleSlot.activity = new Models.ActivityModel({
          title: slot.what.title,
        });
      } else if (slot.what.type === 'lightning-talks') {
        scheduleSlot.talks = slot.what.talks.map((talkData, i) => {
          const talk = new Models.TalkModel({
            type: 'lightning-talk',
            title: talkData.title,
            order: i,
          });

          talk.speakerId = _speakerModels[talkData.speaker].id;

          return talk;
        });
      } else {
        const talkData = slot.what;
        const talk = new Models.TalkModel({
          type: 'full-length-talk',
          title: talkData.title,
          description: talkData.description,
        });

        talk.speaker = _speakerModels[talkData.speaker];

        scheduleSlot.talks = [talk];
      }

      return scheduleSlot.saveAll();
    }))
    .then(slots => {
      schedule.slots = slots;
      return schedule.saveAll();
    });
  })).then(schedules => {
    event.schedules = schedules;
    event.saveAll().then(result => {
      console.log('Done');
      console.log(result);
    });
  });
}
