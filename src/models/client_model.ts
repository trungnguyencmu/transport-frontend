export class ClientModel {
  static type = 'Client';
  public relationships = {};

  constructor(
    public id?: number,
    public code?: string,
    public contact_person?: string,
    public client_type?: string,
    public cover?: any,
    public created_at?: any,
    public email?: string,
    public name?: string,
    public phone?: string,
  ) {}

  get key() {
    return this.id;
  }
}
