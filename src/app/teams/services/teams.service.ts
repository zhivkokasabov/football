import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { HttpService } from '@app/services/http.service';
import Team from '@teams/models/team.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  constructor(
    private http: HttpService,
  ) { }

  public getUserTeams(userId: number): Observable<Team[]> {
    const url = `${environment.baseUrl}/user-teams/${userId}`;
    const model = new GetRequestModel({ url });

    return new Observable<Team[]>((observer) => {
      return this.http.get(model).subscribe((response: any) => {
        const teams = response.map((entity: any) => new Team(entity));

        observer.next(teams);
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
