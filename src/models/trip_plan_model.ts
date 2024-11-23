import { DATE_FORMAT } from '@/constants/common';
import { groupBy } from 'lodash';
import moment from 'moment';
import { TripPlanVersionModel } from './trip_plan_version_model';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | ' wednesday'
  | 'thursday'
  | 'friday';

export type Frequency = 'daily' | 'weekly' | 'monthly';
export interface RecurrenceInteface {
  end_at: number;
  exclude_holiday: boolean;
  occurrences: number;
  repeat_days: DayOfWeek[];
  repeat_per: number;
  repeat_type: Frequency;
}

export interface ContactInterface {
  kind: 'requester' | 'guest' | 'second_guest';
  name: string;
  phone: string;
}
export class TripPlanModel {
  static type = 'TripPlan';
  public relationships = {};

  constructor(
    public id?: number,
    public kind?: string,
    public school_address?: string,
    public route_name?: string,
    public route_type?: string,
    public code?: string,
    public state?: string,
    public notes?: string,
    public recurring?: boolean,
    public route_label?: string,
    public client_name?: string,
    public project_name?: string,
    public site_name?: string,
    public capacity_required?: number,
    public start_date?: string,
    public counting_required?: boolean,
    public reservation_required?: boolean,
    public approved_rider_required?: boolean,
    public versions?: TripPlanVersionModel[],
    public created_at?: number,
    public apply_from?: string,
    public apply_to?: string,
    public recurrence?: RecurrenceInteface,
    public contacts?: ContactInterface[],
    public directions?: any[],
    public client_id?: number,
    public site_id?: number,
  ) {}

  get activeVersions(): TripPlanVersionModel[] {
    return this.versions?.filter(
      (version) => version.version_name !== 'archived',
    );
  }

  get currentVersion(): TripPlanVersionModel | undefined {
    return this.versions?.find((version) => version.version_name === 'current');
  }

  get startDate() {
    return moment(this.start_date).format(DATE_FORMAT);
  }

  get key() {
    return this.code;
  }

  get typeEnd(): string {
    const { end_at, occurrences } = this.recurrence;

    if (end_at) return 'on';
    if (occurrences) return 'after';
    return 'never';
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

  get isShoolBus(): boolean {
    return this.route_type === 'school_bus';
  }

  get schoolAttribute() {
    if (this.isToSchool) {
      return this.schoolBusDirectionAttributes[0]?.stops_attributes
        ?.slice(-1)
        .pop();
    }
    return this.schoolBusDirectionAttributes[0]?.stops_attributes[0];
  }

  get schoolStopsAttributes() {
    if (this.isToSchool) {
      return this.schoolBusDirectionAttributes[0].stops_attributes.filter(
        (stop) => stop.pickup,
      );
    }
    return this.schoolBusDirectionAttributes[0].stops_attributes.filter(
      (stop) => stop.dropoff,
    );
  }

  get isToSchool(): boolean {
    if (!this.schoolBusDirectionAttributes) return false;
    return this.schoolBusDirectionAttributes[0]?.name === 'to_school';
  }

  get isFromSchool(): boolean {
    if (!this.schoolBusDirectionAttributes) return false;
    return this.schoolBusDirectionAttributes[0]?.name === 'from_school';
  }

  get directionAttributes(): any {
    return this.currentVersion?.directions?.map((direction) => {
      const groupSchedule = groupBy(direction.schedule, 'id');
      const tmpSchedule: any[] = [];
      Object.keys(groupSchedule).forEach((id, index) => {
        groupSchedule[id].forEach((sch, i) => {
          const stop = direction.stops[i];
          tmpSchedule.push({
            ...sch,
            ...direction.stops[i],
            passengers_attributes: stop?.passengers,
            lat_lng: `${stop?.lat}, ${stop?.lng}`,
          });
        });
      });
      return {
        name: direction.name,
        schedule: tmpSchedule,
        // stops_attributes: tmpSchedule,
        stops_attributes: direction.stops.map((stop, index) => ({
          ...stop,
          lat_lng: `${stop?.lat}, ${stop?.lng}`,
          id: index + 1,
        })),
      };
    });
  }

  get schoolBusDirectionAttributes(): any {
    return this.currentVersion?.directions?.map((direction) => {
      const groupSchedule = groupBy(direction.schedule, 'id');
      const tmpSchedule: any[] = [];
      Object.keys(groupSchedule).forEach((id, index) => {
        groupSchedule[id].forEach((sch, i) => {
          const stop = direction.stops[i];
          tmpSchedule.push({
            ...sch,
            ...direction.stops[i],
            passengers_attributes: stop?.passengers,
            lat_lng: `${stop?.lat}, ${stop?.lng}`,
          });
        });
      });
      return {
        name: direction.name,
        schedule: tmpSchedule,
        stops_attributes: tmpSchedule,
      };
    });
  }

  get groupScheduleTwoWay() {
    const direction = this.currentVersion.directions[0];
    const groupSchedule = groupBy(
      this.currentVersion.directions[0].schedule,
      'id',
    );
    const tmpSchedule: any[] = [];
    Object.keys(groupSchedule).forEach((id, index) => {
      const tmp = [];
      groupSchedule[id].forEach((sch, i) => {
        tmp.push({
          ...sch,
          ...direction.stops[sch.stop_id - 1],
        });
      });
      tmpSchedule.push(tmp);
    });
    return tmpSchedule;
  }
}
