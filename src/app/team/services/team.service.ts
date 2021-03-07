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
export class TeamService {

  constructor(
    private http: HttpService,
  ) { }

  public createTeam(body: Team): Observable<Team> {
    const url = `${environment.baseUrl}/teams`;
    const model = new PostRequestModel({ url, body });

    return new Observable<Team>((observer) => {
      return this.http.post(model).subscribe((response: any) => {
        observer.next(new Team(response));
        observer.complete();
      }, (error: any) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
