import { DATE_FORMAT, DAY_MONTH_YEAR_FORMAT } from '@/constants/common';
import moment from 'moment';
export class Holiday {
  public relationships = {};

  constructor(
    public id?: number,
    public name?: number,
    public start_date?: string,
  ) {}

  get key() {
    return this.id;
  }

  get dateFormat() {
    return moment(this.start_date, DATE_FORMAT).format(DAY_MONTH_YEAR_FORMAT);
  }
}
