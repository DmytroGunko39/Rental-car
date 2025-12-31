import { enUS } from 'date-fns/locale/en-US';

const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const customEn = {
  ...enUS,

  options: {
    ...enUS.options,
    weekStartsOn: 1, // Monday
  },

  localize: {
    ...enUS.localize,
    day: (dayIndex: number) => {
      return shortWeekdays[dayIndex];
    },
  },
};

export default customEn;
