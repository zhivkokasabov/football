export default class ANotification {
  public id: number;
  public message: string;
  public accepted: boolean;
  public rejected: boolean;
  public pending: boolean;
  public redirectUrl: string;
  public notificationTypeId: number;
  public senderId: number;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
