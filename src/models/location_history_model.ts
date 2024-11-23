export class LocationHistoryModel {
  static type = 'Vehicle::LocationTracking';
  public relationships = {};

  constructor(
    public id?: number,
    public accuracy?: number,
    public bearing?: number,
    public created_at?: number,
    public driver_id?: number,
    public lat?: number,
    public lng?: number,
    public passengers_count?: number,
    public speed?: number,
    public status?: string,
    public time?: string,
    public driver_name?: string,
    public vehicle_id?: number,
  ) {}

  get position(): google.maps.LatLng | google.maps.LatLngLiteral | null {
    if (!this.lat || !this.lng) {
      return null;
    }
    return { lat: this.lat, lng: this.lng };
  }

  get latLong() {
    return `${this.lat}, ${this.lng}`;
  }
}
