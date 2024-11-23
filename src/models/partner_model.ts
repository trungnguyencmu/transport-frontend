export class PartnerModel {
  static type = 'Partner';
  public relationships = {};

  constructor(
    public id?: number,
    public code?: string,
    public company_name?: string,
    public point_of_contact?: any,
    public created_at?: any,
    public job_title?: string,
    public phone?: string,
    public email?: string,
    public notes?: string,
    public company_id?: number,
    public vehicles_count?: number,
  ) {}

  get key() {
    return this.id;
  }
}
