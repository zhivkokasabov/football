import { Component, OnInit } from '@angular/core';
import { SnackbarService } from '@app/services/snackbar.service';
import ANotification from '@notifications/models/a-notification.model';
import NotificationType from '@notifications/models/notification-type.model';
import NotificationsGroup from '@notifications/models/notifications-group.model';
import { NotificationsService } from '@notifications/services/notifications.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent implements OnInit {
  public notifications: NotificationsGroup[] = [];

  constructor(
    private notificationsService: NotificationsService,
    private snackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
    forkJoin({
      notifications: this.notificationsService.getUserNotifications(),
      types: this.notificationsService.getNotificationTypes(),
    }).subscribe(({ types, notifications }) => {
      const groupedNotifications = types.map((type: NotificationType) => {
        return new NotificationsGroup({
          groupName: type.type,
          list: notifications.filter((x) => x.notificationTypeId === type.id),
        });
      }).filter((x: NotificationsGroup) => x.list.length);

      this.notifications = groupedNotifications;
    });
  }

  public dismissNotification(notification: ANotification): void {
    this.notificationsService.resolveRequest(notification).subscribe(() => {
      this.updateNotifications(notification.id);
    });
  }

  public acceptRequest(notification: ANotification): void {
    notification.accepted = true;

    this.notificationsService.resolveRequest(notification).subscribe(() => {
      this.updateNotifications(notification.id);

      this.snackbarService.success('Request accepted successfully');
    });
  }

  public rejectRequest(notification: ANotification): void {
    notification.rejected = true;

    this.notificationsService.resolveRequest(notification).subscribe(() => {
      this.updateNotifications(notification.id);

      this.snackbarService.success('Request rejected successfully');
    });
  }

  private updateNotifications(id: number): void {
    this.notifications = this.notifications.map((group: NotificationsGroup) => {
      return new NotificationsGroup({
        groupName: group.groupName,
        list: group.list.filter((x: ANotification) => x.id !== id),
      });
    }).filter((x: NotificationsGroup) => x.list.length);
  }
}
