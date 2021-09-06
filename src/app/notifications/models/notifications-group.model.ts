import ANotification from '@notifications/models/a-notification.model';

export default class NotificationsGroup {
  public groupName: string;
  public list: ANotification[];

  constructor(init: any = {}) {
    Object.assign(this, init);
  }
}
