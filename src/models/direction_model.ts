export class DirectionModel {
  static type = 'Direction';
  public relationships = {};

  constructor(
    public id?: number,
    public name?: string,
    public label?: string,
  ) {}
}
