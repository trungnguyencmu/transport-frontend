import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class NoticeModel {
  static type = 'TripPlan::Notice';
  public relationships = {};

  constructor(
    public id?: number,
    public announcement?: string,
    public client_id?: number,
    public client_name?: string,
    public code?: string,
    public state?: string,
    public expired_at?: number,
    public site_id?: number,
    public site_name?: string,
    public started_at?: number,
    public timings?: string[],
    public trip_plan_id?: number,
    public trip_plan_name?: string,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }
  get startedAt() {
    return moment(this.started_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }
}
