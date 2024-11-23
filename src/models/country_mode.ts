export class CountryModel {
  static type = 'Country';
  public relationships = {};

  constructor(
    public id?: number,
    public name?: string,

    public created_at?: any,
  ) {}

  get key() {
    return this.id;
  }
}
