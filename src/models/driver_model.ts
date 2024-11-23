import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';

export class DriverModel {
  static type = 'Driver';
  public relationships = {};

  constructor(
    public id?: number,
    public first_name?: string,
    public display_name?: string,
    public phone?: string,
    public code?: string,
    public last_name?: string,
    public created_at?: any,
    public state?: string,
  ) {}

  get createdAt() {
    return moment(this.created_at).format(DATE_FORMAT);
  }

  get key() {
    return this.id;
  }

  get defaultVehicle(): string {
    //FIXME: update when have data
    return '-';
  }

  get isActive(): boolean {
    return this.state === 'active';
  }

  get isInActive(): boolean {
    return this.state === 'inactive';
  }

  get fullName(): string {
    return `${this.first_name} ${this.last_name}`;
  }
}
