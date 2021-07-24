import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PutRequestModel from '@app/models/put-request.model';
import { HttpService } from '@app/services/http.service';
import NotificationType from '@notifications/models/notification-type.model';
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

  public acceptInvitation(notificationId: number): Observable<void> {
    const url = `${environment.baseUrl}/notifications/${notificationId}`;
    const model = new PutRequestModel({ url, body: {} });

    return this.http.put(model);
  }

  public rejectInvitation(notificationId: number): Observable<void> {
    const url = `${environment.baseUrl}/notifications/${notificationId}`;
    const model = new PutRequestModel({ url, body: {} });

    return this.http.put(model);
  }
}
