import * as moment from 'moment';

export class DateUtil {
  static getIsoWeek(date: Date = new Date()): number {
    return moment(date, 'MM-DD-YYYY').isoWeek();
  }

  static getYear(date: Date = new Date()): number {
    return date.getFullYear();
  }

  static getLastSaturday(date: Date = new Date()): Date {
    const SATURDAY_WEEK_DAY = 6;

    if (SATURDAY_WEEK_DAY === date.getDay()) {
      return date;
    }

    return moment(date, 'MM-DD-YYYY')
      .day(6 - 7)
      .toDate();

    // const time = date.getDate() + (7 - date.getDay() - 1) - 7;
    // date.setDate(time);

    // return date;
  }
}
