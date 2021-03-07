import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general',
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html',
})
export class GeneralComponent extends Base implements OnInit {
  public team: Team;
  public canEdit: boolean;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
  ) {
    super();
  }

  public ngOnInit(): void {
    combineLatest(
      this.getUser(),
      this.getTeam(),
    ).pipe(
      takeUntil(this.unsubscribe),
      map(([user, team]) => ({ user, team })),
    ).subscribe(({ user, team }) => {
      this.team = team;
      this.canEdit = user.id === team.userId;
    });
  }

  private getTeam(): Observable<Team> {
    return this.teamService.team;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
