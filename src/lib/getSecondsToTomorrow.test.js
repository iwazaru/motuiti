import getSecondsToTomorrow from './getSecondsToTomorrow';

const constantDate = new Date('2019-05-03T04:41:20');

/*eslint no-native-reassign:off*/
const OriginalDate = Date;
Date = class extends Date {
  constructor(year, month, date) {
    if (year && month && date) {
      return new OriginalDate(year, month, date);
    }

    return constantDate;
  }
};

describe('getSecondsToTomorrow', () => {
  it('returns seconds to tomorrow', () => {
    const seconds = getSecondsToTomorrow();
    expect(seconds).toBe(69520);
  });
});
