import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import TournamentPlacement from '@team/models/tournament-placement.model';
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
  public placements: TournamentPlacement[] = [];

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
      this.canEdit = team.members.find((m) => m.id === user.id)?.isTeamCaptain === true;

      this.getTeamPlacements(team.id);
    });
  }

  public copyKeyToClipboard(): void {
    navigator.clipboard.writeText(this.team.entryKey).then(() => {
      this.snackbarService.success('Copying to clipboard was successful!');
    }, (err) => {
      this.snackbarService.error('Could not copy text');
    });
  }

  private getTeamPlacements(id: number): void {
    this.teamService.getTeamPlacements(id).subscribe((placements: TournamentPlacement[]) => {
      this.placements = placements;
      // [
      //   ...placements,
      //   new TournamentPlacement({ ...placements[0], placement: '2nd' }),
      //   new TournamentPlacement({ ...placements[0], placement: '3rd' }),
      //   new TournamentPlacement({ ...placements[0], placement: '4th' }),
      //   new TournamentPlacement({ ...placements[0], placement: '3rd-4th' }),
      //   new TournamentPlacement({ ...placements[0], placement: '5th-8th' }),
      //   new TournamentPlacement({ ...placements[0], placement: '5th-16th' }),
      // ];
    });
  }

  private getTeam(): Observable<Team> {
    return this.teamService.team;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
