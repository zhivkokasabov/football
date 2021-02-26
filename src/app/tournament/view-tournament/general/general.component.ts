import { Component, OnDestroy, OnInit } from '@angular/core';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
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

  private getTournament(): Observable<Tournament> {
    return this.tournamentService.tournament;
  }

  private getUser(): Observable<User> {
    return this.userService.currentUser;
  }
}
