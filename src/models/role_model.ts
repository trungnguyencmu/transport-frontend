import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class RoleModel {
  static type = 'Admin::Role';
  public relationships = {};

  constructor(
    public id?: number,
    public admins_count?: number,
    public name?: string,
    public permissions?: string[],
    public created_at?: any,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }
}
