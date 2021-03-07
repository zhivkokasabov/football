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
      if (tournament.id) {
        this.getTournamentMatches(tournament);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getTournamentMatches(tournament: Tournament): void {
    this.tournamentService.getTournamentMatches(tournament.id)
      .subscribe((tournamentMatches: TournamentMatch[]) => {
        const rounds = tournamentMatches.map((tm) => tm.round);
        const roundSet = new Set(rounds);

        this.setTournamentWinner(tournamentMatches);

        this.rounds = Array.from(roundSet).map((round) => {
          const roundMatches = tournamentMatches.filter((tm) => tm.round === round );
          const numberOfMatchesThisRound = roundMatches.length;
          let coef = numberOfMatchesThisRound * 2;

          return roundMatches.map((tm) => {
              if (round > 1) {
                const { sequenceId } = tm;
                const firstMatch = tournamentMatches[sequenceId - coef];
                const secondMatch = tournamentMatches[sequenceId - coef + 1];

                tm.homeTeam.name = firstMatch.winner ? firstMatch.winner.name : `Winner match ${sequenceId - coef}`;
                tm.awayTeam.name = secondMatch.winner ? secondMatch.winner.name : `Winner match ${sequenceId - coef + 1}`;

                coef--;
              }

              return tm;
            });
        });
      });
  }

  private setTournamentWinner(tournamentMatches: TournamentMatch[]): void {
    const finalMatchWinnner = tournamentMatches.slice(-1).pop()?.winner;

    this.tournamentWinner = finalMatchWinnner ? finalMatchWinnner.name : `Winner match ${tournamentMatches.length}`;
  }
}
