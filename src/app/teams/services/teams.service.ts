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

  public getUserTeam(): Observable<Team> {
    const url = `${environment.baseUrl}/teams/user-team`;
    const model = new GetRequestModel({ url });

    return new Observable<Team>((observer) => {
      return this.http.get(model).subscribe((response: any) => {
        const team = new Team(response);

        observer.next(team);
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  public addUserToTeam(entryKey: string): Observable<Team> {
    const url = `${environment.baseUrl}/teams/${entryKey}/join`;
    const model = new PostRequestModel({ url });

    return new Observable<Team>((observer) => {
      return this.http.post(model).subscribe((response: any) => {
        const team = new Team(response);

        observer.next(team);
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
