import { Injectable } from '@angular/core';
import PostRequestModel from '@app/models/post-request.model';
import PutRequestModel from '@app/models/put-request.model';
import { HttpService } from '@app/services/http.service';
import { environment } from '@src/environments/environment';
import MatchScore from '@tournament/models/match-score.model';
import TournamentMatch from '@tournament/models/tournament-match.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentMatchService {

  constructor(private http: HttpService) { }

  public saveTournamentMatch(result: MatchScore, matchId: number): Observable<TournamentMatch[][]> {
    return new Observable<TournamentMatch[][]>((observer) => {
      const url = `${environment.baseUrl}/tournamentMatches/${matchId}`;
      const model = new PostRequestModel({ url, body: result });

      return this.http.post(model).subscribe((response) => {
        const matches = response.map((x: any) => {
          return x.map((y: any) => new TournamentMatch(y));
        });

        observer.next(matches);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public updateTournamentMatch(result: MatchScore, matchId: number): Observable<TournamentMatch[][]> {
    return new Observable<TournamentMatch[][]>((observer) => {
      const url = `${environment.baseUrl}/tournamentMatches/${matchId}`;
      const model = new PutRequestModel({ url, body: result });

      return this.http.put(model).subscribe((response) => {
        const matches = response.map((x: any) => {
          return x.map((y: any) => new TournamentMatch(y));
        });

        observer.next(matches);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }
}
