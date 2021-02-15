import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve, Router,
  RouterStateSnapshot,
} from '@angular/router';
import TournamentType from '@tournament/models/tournament-type.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TournamentTypesResolver implements Resolve<TournamentType[]> {
  constructor(
    private tournamentService: TournamentService,
  ) {}

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TournamentType[]> {
    return this.tournamentService.getTournamentTypes();
  }
}
