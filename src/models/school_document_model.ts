export class SchoolDocumentModel {
  public relationships = {};

  constructor(
    public id?: number,
    public content?: string,
    public document_name?: string,
    public document_type?: string,
  ) {}

  get key() {
    return this.id;
  }
}
