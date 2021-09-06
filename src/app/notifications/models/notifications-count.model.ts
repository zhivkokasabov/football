export default class NotificationsCount {
  public incomingRequests: number;
  public outgoingRequest: number;

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
