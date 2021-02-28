import { Component, OnDestroy, OnInit } from '@angular/core';
import { ColorLegend } from '@app/utils/color-legend.util';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-round-robin-table',
  styleUrls: ['../styles/table.scss'],
  templateUrl: './round-robin-table.component.html',
})
export class RoundRobinTableComponent implements OnInit, OnDestroy {
  public displayedColumns = [
    'rowNumber',
    'name',
    'played',
    'goalDifference',
    'points',
  ];
  public colorLegend: ColorLegend;
  public teams: any[];
  public advancingTeams: number;
  private emptyTeamName = 'Team';
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      if (tournament.id) {
        this.advancingTeams = tournament.teamsAdvancingAfterGroups;

        this.setColorLegend(tournament.typeId);
        this.getTournamentParticipants(tournament);
      }
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private setColorLegend(typeId: number): void {
    this.colorLegend = new ColorLegend(typeId);
  }

  private getTournamentParticipants(tournament: Tournament): void {
    this.tournamentService.getTournamentParticipants(tournament.id)
      .subscribe((tournamentParticipants: TournamentParticipant[]) => {
        this.teams = tournamentParticipants.map((participant: TournamentParticipant, index: number) => {
          const { team } = participant;

          return {
            goalDifference: 0,
            name: team ? team.name : `${this.emptyTeamName} ${participant.teamSequenceId}`,
            played: 0,
            points: 0,
            rowNumber: index + 1,
          };
        });
      });
  }
}
