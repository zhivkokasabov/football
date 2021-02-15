export default class DeleteRequestModel {
  public url: string;
  public httpOptions: any;

  constructor(init: any) {
    this.url = init.url;
    this.httpOptions = init.httpOptions;
  }
}
