import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import { HttpService } from '@app/services/http.service';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import Tournament from '@tournament/models/tournament.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  private tournamentSubject: BehaviorSubject<Tournament>;
  public tournament: Observable<Tournament>;

  constructor(private http: HttpService) {
    this.tournamentSubject = new BehaviorSubject<Tournament>(new Tournament());
    this.tournament = this.tournamentSubject.asObservable();
  }

  public newTournament(body: Tournament): Observable<any> {
    const url = `${environment.baseUrl}/tournaments`;
    const model = new PostRequestModel({ url, body });

    return this.http.post(model);
  }

  public getTournament(tournamentId: number): Observable<Tournament> {
    return new Observable<Tournament>((observer) => {
      const url = `${environment.baseUrl}/tournaments/${tournamentId}`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournament = new Tournament(result);

        this.tournamentSubject.next(tournament);
        observer.next(tournament);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  public getTournamentParticipants(tournamentId: number): Observable<TournamentParticipant[]> {
    return new Observable<TournamentParticipant[]>((observer) => {
      const url = `${environment.baseUrl}/tournaments/${tournamentId}/participants`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournament = result.map((entity: any) => {
          return new TournamentParticipant(entity);
        });

        observer.next(tournament);
        observer.complete();
      }, (error) => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}
