export class SavePointModel {
  static type = 'Stop';
  public relationships = {};

  constructor(
    public id?: number,
    public lat?: number,
    public lng?: number,
    public name?: string,
    public street_view_url?: string,
    public description?: string,
    public geofence_radius?: number,
  ) {}

  get lat_lng() {
    return `${this.lat}, ${this.lng}`;
  }
  get key() {
    return this.id;
  }
}
