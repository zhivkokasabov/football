import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-team',
  styleUrls: ['./edit-team.component.scss'],
  templateUrl: './edit-team.component.html',
})
export class EditTeamComponent extends Base implements OnInit {
  public members: User[] = [];
  public canEdit: boolean;
  private team: Team;

  constructor(
    private teamService: TeamService,
    private userService: UserService,
    private snackbarService: SnackbarService,
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
      this.members = team.members;
      this.canEdit = team.members.find((m) => m.id === user.id)?.isTeamCaptain === true;
    });
  }

  public onRemoveClick(id: number): void {
    this.teamService.removeMember(this.team.id, id).subscribe(() => {
      const member = this.members.find((m: User) => m.id === id);
      this.members = this.members.filter((m: User) => m.id !== id);

      if (member) {
        this.snackbarService.success(`${member.nickname} succesfully removed from team`);
      }
    });
  }

  private getTeam(): Observable<Team> {
    return this.teamService.team;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
