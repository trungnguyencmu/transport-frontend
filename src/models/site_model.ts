import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class SitetModel {
  static type = 'Site';
  public relationships = {};

  constructor(
    public id?: number,
    public client_id?: number,
    public client_name?: string,
    public address?: string,
    public description?: string,
    public name?: string,
    public default_site?: boolean,
    public cover?: any,
    public created_at?: any,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }
}
