export default class Notification {
  public id: number;
  public message: string;
  public accepted: boolean;
  public rejected: boolean;
  public pending: boolean;
  public redirectUrl: string;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
