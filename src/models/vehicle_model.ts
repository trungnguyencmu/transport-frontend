import { DriverModel } from './driver_model';
import { DATE_FORMAT } from '@/constants/common';
import moment from 'moment';
export class VehicleModel {
  static type = 'Client';
  public relationships = {};

  constructor(
    public id?: number,
    public driver?: DriverModel,
    public brand?: string,
    public capacity?: number,
    public code?: string,
    public coe_expiry?: number,
    public vehicle?: VehicleModel,
    public driver_id?: string,
    public driver_name?: string,
    public effective_date?: number,
    public iu_number?: number,
    public license_plate?: string,
    public license_registration_date?: string,
    public log_card?: any,
    public model?: string,
    public photo?: any,
    public primary_color?: string,
    public state?: string,
  ) {}

  get key() {
    return this.id;
  }

  get coeExpiry() {
    return moment(this.coe_expiry).format(DATE_FORMAT);
  }

  get licenseRegistrationDate() {
    return moment(this.license_registration_date).format(DATE_FORMAT);
  }

  get primaryDriver() {
    return this.driver?.display_name;
  }
}
