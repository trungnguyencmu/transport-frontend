import { DATETIME_FORMAT } from '@/constants/common';
import moment from 'moment';
export class ClientInvitationModel {
  static type = 'Client::Invitation';
  public relationships = {};

  constructor(
    public id?: number,
    public email?: string,
    public state?: string,
    public sent_at?: number,
    public expired_at?: number,
  ) {}

  get sent_on() {
    return moment(this.sent_at).format(DATETIME_FORMAT);
  }

  get expire_on() {
    return moment(this.expired_at).format(DATETIME_FORMAT);
  }
}
