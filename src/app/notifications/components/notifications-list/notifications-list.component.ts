import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationTypes } from '@notifications/enums/notification-types.enum';
import ANotification from '@notifications/models/a-notification.model';
import NotificationType from '@notifications/models/notification-type.model';
import NotificationsGroup from '@notifications/models/notifications-group.model';

@Component({
  selector: 'app-notifications-list',
  styleUrls: ['./notifications-list.component.scss'],
  templateUrl: './notifications-list.component.html',
})
export class NotificationsListComponent {
  public notificationTypes = NotificationTypes;

  @Input() public notificationsGroups: NotificationsGroup[] = [];
  @Output() public rejectRequest: EventEmitter<ANotification> = new EventEmitter();
  @Output() public acceptRequest: EventEmitter<ANotification> = new EventEmitter();
  @Output() public dismissRequest: EventEmitter<ANotification> = new EventEmitter();

  constructor() {
  }
}
