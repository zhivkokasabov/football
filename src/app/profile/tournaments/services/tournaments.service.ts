import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import GetRequestModel from '../../../models/get-request.model';
import { HttpService } from '../../../services/http.service';

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
