import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamResolver implements Resolve<Team> {
  constructor(
    private teamService: TeamService,
  ) {}

  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Team> {
    return this.teamService.getTeam(route.params.id);
  }
}
