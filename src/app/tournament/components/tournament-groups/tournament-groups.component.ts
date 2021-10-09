import { Component, OnDestroy, OnInit } from '@angular/core';
import { SnackbarService } from '@app/services/snackbar.service';
import { groupBy } from '@app/utils/group-by.util';
import { UpsertMatch } from '@shared/tournament-match/tournament-match.component';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';
import TournamentMatch from '@tournament/models/tournament-match.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentMatchService } from '@tournament/services/tournament-match.service';
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
  public tournament: Tournament;
  public canProceedToEliminations = false;
  public canCloseTournament = false;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
    private matchService: TournamentMatchService,
    private snackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      this.tournament = tournament;

      if (tournament.canEdit && tournament.tournamentTypeId === TournamentTypesEnum.classic) {
        this.tournamentService.canProceedToEliminations(tournament.tournamentId)
          .subscribe((response) => {
            this.canProceedToEliminations = response;
          });
      }

      this.tournamentService.getTournamentMatches(tournament.tournamentId).pipe(
        takeUntil(this.unsubscribe),
      ).subscribe((tournamentMatches: TournamentMatch[][]) => {
        this.groupedTournamentMatches = tournamentMatches;
        this.setCanCloseTournament();
      });
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public save(model: UpsertMatch): void {
    this.matchService.saveTournamentMatch(model.score, model.matchId)
      .pipe(
        takeUntil(this.unsubscribe),
      ).subscribe((matches: TournamentMatch[][]) => {
        this.groupedTournamentMatches = matches;
        this.setCanCloseTournament();
        this.snackbarService.success('Result save successfully');
      });
  }

  public update(model: UpsertMatch): void {
    this.matchService.updateTournamentMatch(model.score, model.matchId)
      .pipe(
        takeUntil(this.unsubscribe),
      ).subscribe((matches: TournamentMatch[][]) => {
        this.groupedTournamentMatches = matches;
        this.setCanCloseTournament();
        this.snackbarService.success('Result updated successfully');
      });
  }

  public proceedToEliminations(): void {
    this.tournamentService.proceedToEliminations(this.tournament.tournamentId)
      .subscribe((matches: TournamentMatch[][]) => {
        this.groupedTournamentMatches = matches;
        this.canProceedToEliminations = false;
      });
  }

  public closeTournament(): void {
    this.tournamentService.closeTournament(this.tournament.tournamentId).subscribe(() => {
      this.snackbarService.success('Tournament successfully finished');
    });
  }

  private setCanCloseTournament(): void {
    const allMatchesHaveFinished = this.groupedTournamentMatches.every((x: TournamentMatch[]) => {
      return x.every((y: TournamentMatch) => !!y.result) === true;
    });

    this.canCloseTournament = this.tournament.canEdit && !this.tournament.hasFinished && allMatchesHaveFinished;
  }
}
