export class SchoolContactModel {
  public relationships = {};

  constructor(
    public id?: number,
    public contact_name?: string,
    public email?: string,
    public phone?: string,
    public position?: string,
  ) {}

  get key() {
    return this.id;
  }

  get phoneForm(): string {
    return this.phone?.replace('+65', '') || '';
  }
}
