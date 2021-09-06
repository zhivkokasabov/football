import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PutRequestModel from '@app/models/put-request.model';
import { HttpService } from '@app/services/http.service';
import ANotification from '@notifications/models/a-notification.model';
import NotificationType from '@notifications/models/notification-type.model';
import NotificationsCount from '@notifications/models/notifications-count.model';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {

  constructor(
    private http: HttpService,
  ) { }

  public getNotificationTypes(): Observable<NotificationType[]> {
    const url = `${environment.baseUrl}/notifications/notification-types`;
    const model = new GetRequestModel({ url });

    return new Observable((observer) => {
      return this.http.get(model).subscribe((types: NotificationType[]) => {
        const notificationTypes = types.map((x: any) => new NotificationType(x));

        observer.next(notificationTypes);
      },
      (error: any) => observer.error(error),
      () => observer.complete());
    });
  }

  public getUserNotifications(): Observable<ANotification[]> {
    const url = `${environment.baseUrl}/notifications`;
    const model = new GetRequestModel({ url });

    return new Observable((observer) => {
      return this.http.get(model).subscribe((result: any) => {
        const notifications = result.map((x: any) => new ANotification(x));

        observer.next(notifications);
      },
      (error: any) => observer.error(error),
      () => observer.complete());
    });
  }

  public getNotificationsCount(): Observable<NotificationsCount> {
    const url = `${environment.baseUrl}/notifications/count`;
    const model = new GetRequestModel({ url });

    return new Observable((observer) => {
      return this.http.get(model).subscribe((result: any) => {
        const notificationsCount = new NotificationsCount(result);

        observer.next(notificationsCount);
      },
      (error: any) => observer.error(error),
      () => observer.complete());
    });
  }

  public resolveRequest(notification: ANotification): Observable<void> {
    const url = `${environment.baseUrl}/notifications`;
    const model = new PutRequestModel({ url, body: notification });

    return this.http.put(model);
  }
}
