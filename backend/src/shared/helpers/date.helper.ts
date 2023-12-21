import { DateTime } from 'luxon';

export default class DateHelper {
  static getNextWorkDay(): DateTime {
    const workday = DateTime.local();

    while (workday.weekday === 6 || workday.weekday === 7) {
      workday.plus({ days: 1 });
    }

    return workday;
  }
}
