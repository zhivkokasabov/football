import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentResolver implements Resolve<Tournament> {
  constructor(
    private tournamentService: TournamentService,
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Tournament> {
    return this.tournamentService.getTournament(route.params.id);
  }
}
