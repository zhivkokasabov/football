export default class NotificationType {
  public id: number;
  public type: string;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
