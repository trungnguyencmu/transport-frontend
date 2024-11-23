import tripApi from '@/api/trip';
import { ClientModel } from './client_model';
import { CompanyModel } from './company_model';
import { ContactModel } from './contact_model';
import { DirectionModel } from './direction_model';
import { ProjectModel } from './project_model';
import { StopModel } from './stop_model';
import { TripPlanModel } from './trip_plan_model';
import { REPLACEMENT_TYPE } from '@/constants';
import moment from 'moment';
import { DATE_FORMAT } from '@/constants/common';
export class TripModel {
  static type = 'Trip';
  public relationships = {};
  //NOTE: be carefully when add new item in constructor because it related calculatePositionForItem function
  constructor(
    public id?: number,
    public code?: string,
    public state?: string,
    public assignment_state?: string,
    public start_date?: any,
    public start_time?: string,
    public end_time?: string,
    public metadata?: {
      stops: StopModel[];
      client: ClientModel;
      company: CompanyModel;
      project: ProjectModel;
      contacts: ContactModel[];
      direction: DirectionModel;
      trip_plan: TripPlanModel;
    },
    public vehicle?: any,
    public vehicle_id?: string,
    public replacement_driver?: any,
    public replacement_trip?: any,
    public original_trip?: string,
    public capacity_required?: boolean,
    public note?: string,
    public actual_trip_data?: any,
    public change_logs?: any[],
    public position?: number,
  ) {}

  get key() {
    return this.id;
  }

  get routeLabelWithDirection(): string {
    return `${this.metadata?.trip_plan?.route_label} | ${this.metadata?.direction.name}`
  }

  get time_window(): string {
    return `${this.start_time} - ${this.end_time}`;
  }

  get routeType() {
    return this.metadata?.trip_plan?.kind;
  }

  get tripPlanId() {
    return this.metadata?.trip_plan?.id;
  }

  get isEnded(): boolean {
    return this.actual_trip_data?.state === 'ended';
  }

  get isOnGoing(): boolean {
    return ['heading_to_work', 'waiting', 'in_transit'].includes(
      this.actual_trip_data?.state || '',
    );
  }
  get isAssigned(): boolean {
    return this.assignment_state === 'assigned';
  }

  get isUnassigned(): boolean {
    return this.assignment_state === 'unassigned';
  }

  get unAssignedCancelled(): boolean {
    return this.assignment_state === 'unassigned' && this.isCancelStatus;
  }

  get isReplacemented(): boolean {
    return !!this.original_trip;
  }

  get isCancelledReplacement(): boolean {
    return this.state === 'cancelled' && !!this.original_trip;
  }

  get isReplacedByAnother(): boolean {
    return !!this.replacement_trip;
  }

  get isCancelStatus(): boolean {
    return this.state === 'cancelled';
  }

  get isCancelled(): boolean {
    return this.state === 'cancelled' && !this.original_trip;
  }

  get isRecurring(): boolean {
    if (!this.metadata) return false;
    return this.metadata.trip_plan.recurring === true;
  }

  get isOperatedByAnother(): boolean {
    return !!this.replacement_driver;
  }

  get isCompleted(): boolean {
    return this.state === 'completed';
  }

  get getLatestStatus(): string {
    if (this.isOnGoing) {
      return 'on-going';
    }
    if (this.isEnded) {
      return 'completed';
    } else if (this.isCancelled) {
      return 'cancelled';
    } else if (this.isReplacedByAnother) {
      return 'replaced-by-another';
    } else if (this.isCancelledReplacement) {
      return 'cancelled-replacement';
    } else if (this.isReplacemented) {
      return 'replacemented';
    } else if (this.isUnassigned) {
      return 'unassigned';
    } else if (this.isAssigned) {
      return 'assigned';
    } else {
      return 'assigned'; // Add more specific handling if needed
    }
  }

  get replacementType(): string | null {
    if (this.replacement_driver) return REPLACEMENT_TYPE.TEMPORARY_DRIVER;
    if (this.replacement_trip) return REPLACEMENT_TYPE.REPLACEMENT_VEHICLE;
    if (this.original_trip) {
      if (this.original_trip?.vehicle) {
        return REPLACEMENT_TYPE.REPLACEMENT_VEHICLE;
      }
    }
    return null;
  }

  get assignVehicleId(): number | null | undefined {
    if (this.original_trip?.vehicle) {
      return this.original_trip?.vehicle.id;
    }
    return this.isReplacementTrip
      ? this.replacement_trip?.vehicle?.id
      : undefined;
  }
  get assignDriverId(): number | null | undefined {
    return this.isReplacementDriver ? this.replacement_driver?.id : undefined;
  }

  get isReplacementTrip(): boolean {
    return !!this.replacement_trip;
  }

  get isReplacementDriver(): boolean {
    return !!this.replacement_driver;
  }

  get isReplacementType(): boolean {
    return this.isReplacementDriver || this.isReplacementTrip;
  }

  get fullStartDate(): string {
    return moment(this?.start_date, DATE_FORMAT).format('dddd DD/MM/YYYY');
  }
}
