import { Component, OnDestroy, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { PlayingDaysNamesFromNumber } from '@tournament/enums/playing-days.enum';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { combineLatest, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general',
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html',
})
export class GeneralComponent extends Base implements OnDestroy, OnInit {
  public tournament = new Tournament();
  public canEdit: boolean;
  public playingDaysNames = PlayingDaysNamesFromNumber;
  public tournamentTypesEnum = TournamentTypesEnum;

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
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
      this.canEdit = user.id === tournament.userId;
    });
  }

  private getTournament(): Observable<Tournament> {
    return this.tournamentService.tournament;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
