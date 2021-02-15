export default class PutRequestModel {
  public url: string;
  public body: any;
  public httpOptions: any;

  constructor(init: any) {
    this.url = init.url;
    this.body = init.body;
    this.httpOptions = init.httpOptions;
  }
}
