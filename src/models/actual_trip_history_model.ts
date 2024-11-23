import { TripPlanModel } from './trip_plan_model';
import { VehicleModel } from './vehicle_model';
import { DATE_FORMAT, TIME_FORMAT_BACKEND } from '@/constants/common';
import moment from 'moment';

export class ActualTripHistoryModel {
  static type = 'ActualTrip::History';
  public relationships = {};

  constructor(
    public id?: number,
    public code?: string,
    public heading_to_work_at?: number,
    public skip_trip?: boolean,
    public started_at?: number,
    public completed_time?: number,
    public trip_plan?: TripPlanModel,
    public vehicle?: VehicleModel,
  ) {}

  get key() {
    return this.id;
  }

  get routeName() {
    return this.trip_plan?.route_name;
  }

  get clientName() {
    return this.trip_plan?.client_name;
  }

  get licensePlate() {
    return this.vehicle?.license_plate;
  }

  get driverName() {
    return this.vehicle?.driver_name;
  }

  get capacity() {
    return this.trip_plan?.capacity_required;
  }

  get startedAt() {
    return moment(this.started_at).format(DATE_FORMAT);
  }
  get startedTime() {
    return moment(this.started_at).format(TIME_FORMAT_BACKEND);
  }
  get completedTime() {
    return moment(this.completed_time).format(TIME_FORMAT_BACKEND);
  }
}
