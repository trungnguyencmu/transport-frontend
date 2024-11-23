export class UsefullLinkModel {
  static type = 'Company::UsefulLink';
  public relationships = {};

  constructor(
    public company_id?: number,
    public icon_name?: string,
    public id?: number,
    public kind?: 'driver' | 'rider',
    public ordering?: number,
    public state?: 'published' | 'unpublished',
    public title?: string,
    public url?: string,
  ) {}

  get key() {
    return this.id;
  }
}
