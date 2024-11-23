export class ContactModel {
  static type = 'Contact';
  public relationships = {};

  constructor(
    public kind?: 'requester' | 'guest',
    public name?: string,
    public phone?: string,
  ) {}
}
