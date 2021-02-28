import { Component, OnDestroy, OnInit } from '@angular/core';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { PlayingDaysNamesFromNumber } from '@tournament/enums/playing-days.enum';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-general',
  styleUrls: ['./general.component.scss'],
  templateUrl: './general.component.html',
})
export class GeneralComponent implements OnDestroy, OnInit {
  public tournament = new Tournament();
  public canEdit: boolean;
  public isEditing = false;
  public playingDaysNames = PlayingDaysNamesFromNumber;
  public tournamentTypesEnum = TournamentTypesEnum;
  private currentUser: User;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    combineLatest(
      this.getUser(),
      this.getTournament(),
    ).pipe(
      takeUntil(this.unsubscribe),
      map(([user, tournament]) => ({ user, tournament })),
    ).subscribe(({ user, tournament }) => {
      this.currentUser = user;
      this.tournament = tournament;
      this.canEdit = user.id === tournament.userId;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public editTournament(): void {
    this.isEditing = true;
  }

  public onEditCancel(): void {
    this.isEditing = false;
  }

  private getTournament(): Observable<Tournament> {
    return this.tournamentService.tournament;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
