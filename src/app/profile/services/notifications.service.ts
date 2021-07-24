import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { HttpService } from '@app/services/http.service';
import Notification from '@notifications/models/notification.model';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private http: HttpService,
  ) { }

  public getNotifications(): Observable<Notification[]> {
    return new Observable<Notification[]>((observer) => {
      const url = `${environment.baseUrl}/notifications/user-notifications`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const notifications = result.map((entity: any) => new Notification(entity));

        observer.next(notifications);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
