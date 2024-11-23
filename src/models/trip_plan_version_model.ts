import { TripPlanModel } from './trip_plan_model';

export class TripPlanVersionModel extends TripPlanModel {
  static type = 'TripPlanVersion';
  public relationships = {};

  constructor(
    public version_name?: string,
    public version_number?: number,
    public dismissal_times?: any,
  ) {
    super();
  }

  get dismissal_days(): string[] {
    return Object.keys(this.dismissal_times);
  }

  get isOneWay(): boolean {
    return this.route_type === 'one_way';
  }

  get isTwoWay(): boolean {
    return this.route_type === 'two_way';
  }

  get isShuttle(): boolean {
    return this.route_type === 'shuttle';
  }
}
