import { Component, Input, OnInit } from '@angular/core';
import NotificationType from '@notifications/models/notification-type.model';
import Notification from '@notifications/models/notification.model';
import { NotificationsService } from '@notifications/services/notifications.service';

@Component({
  selector: 'app-notifications-list',
  styleUrls: ['./notifications-list.component.scss'],
  templateUrl: './notifications-list.component.html',
})
export class NotificationsListComponent implements OnInit {
  @Input() public notifications: Notification[] = [];
  private notificationTypes: NotificationType[] = [];

  constructor(
    private notificationsService: NotificationsService,
  ) { }

  public ngOnInit(): void {
    this.notificationsService.getNotificationTypes().subscribe((types: NotificationType[]) => {
      this.notificationTypes = types;
    });
  }
}
