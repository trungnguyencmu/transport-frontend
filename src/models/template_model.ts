import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class TemplateModel {
  static type = 'Notice::Template';
  public relationships = {};

  constructor(
    public id?: number,
    public code?: string,
    public name?: number,
    public message?: string,
    public created_at?: number,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }
}
