import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class AdminModel {
  static type = 'Admin';
  public relationships = {};

  constructor(
    public id?: number,
    public avatar?: any,
    public company_id?: string,
    public email?: string,
    public first_name?: string,
    public last_name?: string,
    public permissions?: string[],
    public phone?: string,
    public require_password_change?: boolean,
    public role_name?: string,
    public state?: string,
    public super_admin?: boolean,
    public created_at?: any,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }

  get fullName(): string {
    //FIXME: update when have data
    return `${this.first_name} ${this.last_name}`;
  }

  get isActive(): boolean {
    return this.state === 'active';
  }

  get isInActive(): boolean {
    return this.state === 'inactive';
  }
}
