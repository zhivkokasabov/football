export default class Meta {
  public page: number;
  public pageSize: number;
  public totalCount: number;

  constructor(init: any) {
    Object.assign(this, init);
  }
}
