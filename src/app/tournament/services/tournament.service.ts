import { Injectable } from '@angular/core';
import GetRequestModel from '@app/models/get-request.model';
import PostRequestModel from '@app/models/post-request.model';
import PutRequestModel from '@app/models/put-request.model';
import { HttpService } from '@app/services/http.service';
import ANotification from '@notifications/models/a-notification.model';
import { environment } from '@src/environments/environment';
import TournamentAccess from '@tournament/models/tournament-access.model';
import TournamentMatch from '@tournament/models/tournament-match.model';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import TournamentType from '@tournament/models/tournament-type.model';
import Tournament from '@tournament/models/tournament.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentService {
  public tournament: Observable<Tournament>;
  private tournamentSubject: BehaviorSubject<Tournament>;
  private tournamentTypes: TournamentType[] = [];
  private tournamentAccesses: TournamentAccess[] = [];

  constructor(private http: HttpService) {
    this.tournamentSubject = new BehaviorSubject<Tournament>(new Tournament());
    this.tournament = this.tournamentSubject.asObservable();
  }

  public newTournament(body: Tournament): Observable<any> {
    const url = `${environment.baseUrl}/tournament`;
    const model = new PostRequestModel({ url, body });

    return this.http.post(model);
  }

  public updateTournament(body: Tournament): Observable<any> {
    const url = `${environment.baseUrl}/tournament/${body.tournamentId}`;
    const model = new PostRequestModel({ url, body });

    return this.http.put(model);
  }

  public getTournament(tournamentId: number): Observable<Tournament> {
    return new Observable<Tournament>((observer) => {
      const url = `${environment.baseUrl}/tournament/${tournamentId}`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournament = new Tournament(result);

        this.tournamentSubject.next(tournament);
        observer.next(tournament);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public getTournamentTypes(): Observable<TournamentType[]> {
    if (this.tournamentTypes.length) {
      return new Observable((obs) => {
        obs.next(this.tournamentTypes);
        obs.complete();
      });
    }

    return new Observable<TournamentType[]>((observer) => {
      const url = `${environment.baseUrl}/tournamentTypes`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournamentTypes = result.map((entity: any) => {
          return new TournamentType(entity);
        });

        observer.next(tournamentTypes);
        observer.complete();
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public getTournamentParticipants(tournamentId: number): Observable<TournamentParticipant[]> {
    return new Observable<TournamentParticipant[]>((observer) => {
      const url = `${environment.baseUrl}/tournament/${tournamentId}/participants`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournament = result.map((entity: any) => {
          return new TournamentParticipant(entity);
        });

        observer.next(tournament);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public getTournamentMatches(tournamentId: number): Observable<TournamentMatch[][]> {
    return new Observable<TournamentMatch[][]>((observer) => {
      const url = `${environment.baseUrl}/tournament/${tournamentId}/matches`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const matches = result.map((group: any) => {
          return group.map((match: any) => {
            return new TournamentMatch(match);
          });
        });

        observer.next(matches);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public getTournamentAccesses(): Observable<TournamentAccess[]> {
    if (this.tournamentAccesses.length) {
      return new Observable((obs) => {
        obs.next(this.tournamentAccesses);
        obs.complete();
      });
    }

    return new Observable<TournamentAccess[]>((observer) => {
      const url = `${environment.baseUrl}/tournamentAccesses`;
      const model = new GetRequestModel({ url });

      return this.http.get(model).subscribe((result) => {
        const tournament = result.map((entity: any) => {
          return new TournamentAccess(entity);
        });

        observer.next(tournament);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public joinTournament(tournamentId: number): Observable<void> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/join-tournament`;
    const model = new PutRequestModel({ url });

    return this.http.put(model);
  }

  public requestToJoinTournament(notification: ANotification, tournamentId: number): Observable<void> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/request-to-join-tournament`;
    const model = new PostRequestModel({ url, body: notification });

    return this.http.post(model);
  }

  public getUserAllowedToParticipate(tournamentId: number): Observable<boolean> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/user-is-allowed`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }

  public canProceedToEliminations(tournamentId: number): Observable<boolean> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/can-proceed-to-eliminations`;
    const model = new GetRequestModel({ url });

    return this.http.get(model);
  }

  public proceedToEliminations(tournamentId: number): Observable<TournamentMatch[][]> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/proceed-to-eliminations`;
    const model = new PostRequestModel({ url, body: {} });

    return new Observable<TournamentMatch[][]>((observer) => {
      return this.http.post(model).subscribe((result) => {
        const matches = result.map((group: any) => {
          return group.map((match: any) => {
            return new TournamentMatch(match);
          });
        });

        observer.next(matches);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public closeTournament(tournamentId: number): Observable<Tournament> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/close`;
    const model = new PutRequestModel({ url, body: {} });

    return new Observable<Tournament>((observer) => {
      return this.http.put(model).subscribe((result) => {
        const tournament = new Tournament(result);

        this.tournamentSubject.next(tournament);
        observer.next(tournament);
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public startTournament(tournamentId: number): Observable<void> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/start`;
    const model = new PutRequestModel({ url, body: {} });

    return new Observable<void>((observer) => {
      return this.http.put(model).subscribe((result) => {
        observer.next();
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }

  public leaveTournament(tournamentId: number): Observable<void> {
    const url = `${environment.baseUrl}/tournament/${tournamentId}/leave`;
    const model = new PutRequestModel({ url, body: {} });

    return new Observable<void>((observer) => {
      return this.http.put(model).subscribe((result) => {
        observer.next();
      },
      (error) => observer.error(error),
      () => observer.complete());
    });
  }
}
