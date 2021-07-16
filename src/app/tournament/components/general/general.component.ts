import { Component, OnDestroy, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import { PlayingDaysNamesFromNumber } from '@tournament/enums/playing-days.enum';
import { TournamentAccesses } from '@tournament/enums/tournament-accesses.enum';
import { TournamentTypesEnum, TournamentTypesFromNumber } from '@tournament/enums/tournament-types.enum';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { combineLatest, Observable } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general',
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html',
})
export class GeneralComponent extends Base implements OnDestroy, OnInit {
  public tournament = new Tournament();
  public canJoinTournament: boolean;
  public canRequestAccess: boolean;
  public playingDaysNames = PlayingDaysNamesFromNumber;
  public tournamentTypesEnum = TournamentTypesEnum;
  public tournamentTypesNames = TournamentTypesFromNumber;

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
    private teamService: TeamService,
    private snackbarService: SnackbarService,
  ) {
    super();
  }

  public ngOnInit(): void {
    combineLatest(
      this.getUser(),
      this.getTournament(),
    ).pipe(
      takeUntil(this.unsubscribe),
      map(([user, tournament]) => ({ user, tournament })),
    ).subscribe(({ user, tournament }) => {
      this.tournament = tournament;

      this.setActions(tournament);
    });
  }

  public joinTournament(): void {
    this.teamService.team.pipe(
      take(1),
    ).subscribe((team: Team) => {
      this.tournamentService.joinTournament(this.tournament.tournamentId)
        .subscribe(() => {
          this.canJoinTournament = false;
          this.canRequestAccess = false;
          this.snackbarService.success('Successfully joined tournament');
        });
    });
  }

  private getTournament(): Observable<Tournament> {
    return this.tournamentService.tournament;
  }

  private setActions(tournament: Tournament): void {
    this.tournamentService
      .getUserAllowedToParticipate(tournament.tournamentId)
      .subscribe((userIsAllowed: boolean) => {
        this.canJoinTournament = userIsAllowed
          && tournament.tournamentAccessId === TournamentAccesses.PUBLIC;

        this.canRequestAccess = userIsAllowed
          && tournament.tournamentAccessId === TournamentAccesses.PROTECTED;
      });
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
