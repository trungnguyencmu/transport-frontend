export class StopModel {
  static type = 'Stop';
  public relationships = {};

  constructor(
    public id?: number,
    public lat?: number,
    public lng?: number,
    public name?: string,
    public pickup?: string,
    public arrival_time?: string,
  ) {}
}
