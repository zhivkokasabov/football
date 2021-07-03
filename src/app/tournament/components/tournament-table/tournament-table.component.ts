import { Component, OnDestroy, OnInit } from '@angular/core';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
})
export class TournamentTableComponent implements OnInit, OnDestroy {
  public tournamentTypes = TournamentTypesEnum;
  public tournament: Tournament;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      if (tournament.tournamentId) {
        this.tournament = tournament;
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
