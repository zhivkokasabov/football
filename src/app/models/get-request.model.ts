export default class GetRequestModel {
  public url: string;
  public httpOptions: any;

  constructor(init: any) {
    this.url = init.url;
    this.httpOptions = init.httpOptions;
  }
}
