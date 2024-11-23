import { DISTANCE_OPTIONS, PRICING_OPTIONS, SERVICE_TYPE_OPTIONS } from '@/components/forms/school-bus/constants';
import dayjs from 'dayjs';

export class SchoolSite {
  public relationships = {};

  constructor(
    public id?: number,
    public name?: string,
    public code?: string,
    public short_name?: string,
    public address?: string,
    public school_lat?: number,
    public school_lng?: number,
    public location_entry_lat?: number,
    public location_entry_lng?: number,
    public location_exit_lat?: number,
    public location_exit_lng?: number,
    public distance_calculation_type?: string,
    public arrival_session_name?: string,
    public arrival_window_from_time?: string, // assuming time as string in frontend
    public arrival_window_to_time?: string,
    public arrival_maximum_time_allowed?: number,
    public arrival_effective_days?: string[], // array of strings
    public arrival_pricing_type?: string,
    public arrival_service_type?: string,
    public departure_session_name?: string,
    public departure_window_from_time?: string,
    public departure_window_to_time?: string,
    public departure_dismissal_time?: string,
    public departure_time?: string,
    public departure_maximum_time_allowed?: number,
    public departure_effective_days?: string[],
    public departure_pricing_type?: string,
    public departure_service_type?: string,
    public cca_enabled?: boolean,
    public cca_session_name?: string,
    public cca_window_from_time?: string,
    public cca_window_to_time?: string,
    public cca_dismissal_time?: string,
    public cca_departure_time?: string,
    public cca_maximum_time_allowed?: number,
    public cca_effective_days?: string[],
    public cca_pricing_type?: string,
    public cca_service_type?: string,
    public school_custom_sessions?: any[],
    public created_at?: Date,
    public updated_at?: Date,
  ) {}

  get key() {
    return this.id;
  }

  get arrivalPricingType() {
    return PRICING_OPTIONS.find(item => item.value === this.arrival_pricing_type)?.name
  }

  get arrivalServiceType() {
    return SERVICE_TYPE_OPTIONS.find(item => item.value === this.arrival_service_type)?.name
  }

  get departurePricingType() {
    return PRICING_OPTIONS.find(item => item.value === this.departure_pricing_type)?.name
  }

  get departureServiceType() {
    return SERVICE_TYPE_OPTIONS.find(item => item.value === this.departure_service_type)?.name
  }

  get ccaPricingType() {
    return PRICING_OPTIONS.find(item => item.value === this.cca_pricing_type)?.name
  }

  get ccaServiceType() {
    return SERVICE_TYPE_OPTIONS.find(item => item.value === this.cca_service_type)?.name
  }


  get schoolLatLng() {
    return `${this.school_lat},${this.school_lng}`;
  }

  get entryLatLng() {
    return `${this.location_entry_lat},${this.location_entry_lng}`;
  }
  get distanceCalculationType() {
    return (
      DISTANCE_OPTIONS.find(
        (item) => item.value === this.distance_calculation_type,
      )?.name || ''
    );
  }

  get exitLatLng() {
    return `${this.location_exit_lat},${this.location_exit_lng}`;
  }

  get arrival_window_time() {
    return [this.arrival_window_from_time, this.arrival_window_to_time];
  }

  get departure_window_time() {
    return [this.departure_window_from_time, this.departure_window_to_time];
  }

  get cca_window_time() {
    return [this.cca_window_from_time, this.cca_window_to_time];
  }

  get latLngMap() {
    return {
      lat: this.school_lat || 1.348209,
      lng: this.school_lng || 103.866236,
    };
  }

  get schoolCustomSessionsAttributes() {
    return this.school_custom_sessions?.map((session) => {
      const arrival_window_time = [
        session.arrival_window_from_time,
        session.arrival_window_to_time,
      ];
      return {
        ...session,
        arrival_window_time,
      };
    });
  }
}
