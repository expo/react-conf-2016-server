/**
 * @providesModule ScheduleSlotInterface
 */

import {
  GraphQLInterfaceType,
} from 'graphql';

import CustomGraphQLDateType from 'graphql-custom-datetype';

export const fields = {
  startTime: {
    type: CustomGraphQLDateType,
  },

  endTime: {
    type: CustomGraphQLDateType,
  },
};

const ScheduleSlotInterface = new GraphQLInterfaceType({
  name: 'ScheduleSlotInterface',

  fields: () => ({
    ...fields,
  }),
});

export default ScheduleSlotInterface;
