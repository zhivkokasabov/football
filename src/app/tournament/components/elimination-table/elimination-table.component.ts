import { Component, OnDestroy, OnInit } from '@angular/core';
import TournamentMatch from '@tournament/models/tournament-match.model';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-elimination-table',
  styleUrls: ['./elimination-table.component.scss'],
  templateUrl: './elimination-table.component.html',
})
export class EliminationTableComponent implements OnInit, OnDestroy {
  public teams: any[];
  public rounds: any[][];
  public tournamentWinner: string;
  private unsubscribe = new Subject<void>();
  private emptyTeamName = 'Team';

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      if (tournament.tournamentId) {
        this.getTournamentMatches(tournament);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getTournamentMatches(tournament: Tournament): void {
    this.tournamentService.getTournamentMatches(tournament.tournamentId)
      .subscribe((tournamentMatches: TournamentMatch[][]) => {
        this.rounds = tournamentMatches
          .map((x: TournamentMatch[]) => x.filter((t: TournamentMatch) => t.isEliminationMatch));

        const lastRound = tournamentMatches[tournamentMatches.length - 1];
        this.setTournamentWinner(lastRound[0]);
      });
  }

  private setTournamentWinner(tournamentMatch: TournamentMatch): void {
    if (!tournamentMatch.result) {
      this.tournamentWinner = `Winner match ${tournamentMatch.sequenceId}`;
    } else {
      const result = tournamentMatch.result.split(' : ');

      this.tournamentWinner = parseInt(result[0], 10) > parseInt(result[1], 10)
        ? tournamentMatch.homeTeam.name
        : tournamentMatch.awayTeam.name;
    }
  }
}
