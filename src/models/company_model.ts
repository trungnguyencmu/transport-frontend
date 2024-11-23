export class CompanyModel {
  static type = 'Company';
  public relationships = {};

  constructor(
    public id?: number,
    public name?: string,
    public display_name?: string,
    public custom_feedback_url?: string,
  ) {}
}
