import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import Notification from '@profile/models/notification.model';
import { NotificationsService } from '@profile/services/notifications.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  styleUrls: ['./notifications.component.scss'],
  templateUrl: './notifications.component.html',
})
export class NotificationsComponent extends Base implements OnInit {
  public notifications: Notification[] = [];
  private currentUser: User;

  constructor(
    private notificationsService: NotificationsService,
    private userService: UserService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.userService.currentUser.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((currentUser) => {
      this.currentUser = currentUser;

      this.getNotifications();
    });
  }

  private getNotifications(): void {
    this.notificationsService.getNotifications(
      this.currentUser.id,
    ).pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((notifications: Notification[]) => {
      this.notifications = notifications;
    });
  }
}
