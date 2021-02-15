import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PagedResult from '@app/models/paged-result.model';
import { HttpService } from '@app/services/http.service';
import Tournament from '@app/tournament/models/tournament.model';
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
    const url = `${environment.baseUrl}/tournament/user-tournaments`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }

  public getAllTournaments(page: number, pageSize: number): Observable<PagedResult<Tournament>> {
    const url = `${environment.baseUrl}/tournament`;
    const model = new GetRequestModel({ url, httpOptions: { params: { pageSize, page } } });

    return new Observable((observer) => {
      return this.http.get(model).subscribe((response) => {
        const pagedResult = new PagedResult<Tournament>({
          items: response.items.map((x: any) => new Tournament(x)),
          meta: response.meta,
        });

        observer.next(pagedResult);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }
}
