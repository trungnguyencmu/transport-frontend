export class HolidayGroup {
  constructor(
    public id?: number,
    public name?: number,
    public year?: string,
    public country?: string,
  ) {}

  get key() {
    return this.id;
  }
}
