import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class FeedbackModel {
  static type = 'Project';
  public relationships = {};

  constructor(
    public id?: number,
    public code?: number,
    public contact_email?: string,
    public contact_name?: string,
    public description?: any,
    public kind?: 'comment' | 'question' | 'bug_report' | 'feature_request',
    public rating?: number,
    public route_label?: string,
    public suggestion?: string,
    public organisation?: string,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }

  get kindName() {
    return this.kind?.split('_').join(' ');
  }
}
