import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { HttpService } from '@app/services/http.service';
import { environment } from '@src/environments/environment';
import Team from '@teams/models/team.model';
import TournamentMatch from '@tournament/models/tournament-match.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  public team: Observable<Team>;
  private teamSubject: BehaviorSubject<Team>;

  constructor(
    private http: HttpService,
  ) {
    this.teamSubject = new BehaviorSubject<Team>(new Team());
    this.team = this.teamSubject.asObservable();
  }

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

  public getTeam(teamId: number): Observable<Team> {
    return new Observable<Team>((observer) => {
      const url = `${environment.baseUrl}/teams/${teamId}`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const team = new Team(result);

        this.teamSubject.next(team);
        observer.next(team);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  public getMatches(teamId: number): Observable<TournamentMatch[][]> {
    return new Observable<TournamentMatch[][]>((observer) => {
      const url = `${environment.baseUrl}/teams/${teamId}/matches`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result: any) => {
        const matches = result.map((group: any) => {
          return group.map((x: any) => new TournamentMatch(x));
        });

        observer.next(matches);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
