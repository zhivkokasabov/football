export default class Notification {
  public requesterName: string;
  public message: string;
  public entityType: string;
  public showActions: boolean;
  public entityName: string;
  public url: string[];

  constructor(init: any = {}) {
    this.requesterName = init.requester.firstName;
    this.entityType = init.entityType;
    this.entityName = init.entityName;

    switch (init.requestTypeId) {
      case 1:
        this.message = ' invited you to join team ';
        this.showActions = true;
        this.url = ['/team/', init.entityId];
        break;
      default:
        break;
    }
  }
}
