import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve, Router,
  RouterStateSnapshot,
} from '@angular/router';
import TournamentAccess from '@tournament/models/tournament-access.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentAccessesResolver implements Resolve<TournamentAccess[]> {
  constructor(
    private tournamentService: TournamentService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TournamentAccess[]> {
    return this.tournamentService.getTournamentAccesses();
  }
}
