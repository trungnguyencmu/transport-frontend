import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class ProjectModel {
  static type = 'Project';
  public relationships = {};

  constructor(
    public id?: number,
    public client_id?: number,
    public client_name?: string,
    public code?: string,
    public default_category?: any,
    public created_at?: any,
    public description?: string,
    public name?: string,
    public trips_count?: string,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }
}
