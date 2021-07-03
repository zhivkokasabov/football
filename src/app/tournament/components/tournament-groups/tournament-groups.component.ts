import { Component, OnDestroy, OnInit } from '@angular/core';
import { groupBy } from '@app/utils/group-by.util';
import TournamentMatch from '@tournament/models/tournament-match.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-groups',
  styleUrls: ['./tournament-groups.component.scss'],
  templateUrl: './tournament-groups.component.html',
})
export class TournamentGroupsComponent implements OnInit, OnDestroy {
  public numberOfRounds: number;
  public groupedTournamentMatches: TournamentMatch[][] = [];
  private tournament: Tournament;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      this.tournament = tournament;

      this.tournamentService.getTournamentMatches(tournament.tournamentId).pipe(
        takeUntil(this.unsubscribe),
      ).subscribe((tournamentMatches: TournamentMatch[][]) => {
        this.groupedTournamentMatches = tournamentMatches;
      });
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
