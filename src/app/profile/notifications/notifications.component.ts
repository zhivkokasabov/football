import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import Notification from '@notifications/models/notification.model';
import { NotificationsService } from '@profile/services/notifications.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent extends Base implements OnInit {
  public notifications: Notification[] = [];

  constructor(
    private notificationsService: NotificationsService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.notificationsService.getNotifications().pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
}
