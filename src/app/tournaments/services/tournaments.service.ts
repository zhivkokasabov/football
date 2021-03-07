import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import { HttpService } from '@app/services/http.service';
import { environment } from '@src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentsService {

  constructor(
    private http: HttpService,
  ) { }

  public getUserTournaments(userId: number): Observable<any> {
    const url = `${environment.baseUrl}/user-tournaments/${userId}`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }

  public getAllTournaments(): Observable<any> {
    const url = `${environment.baseUrl}/tournaments`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }
}
