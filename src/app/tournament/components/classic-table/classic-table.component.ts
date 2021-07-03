import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ColorLegend } from '@app/utils/color-legend.util';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-classic-table',
  styleUrls: [
    '../../styles/table.scss',
    './classic-table.component.scss',
  ],
  templateUrl: './classic-table.component.html',
})
export class ClassicTableComponent implements OnInit, OnDestroy {
  public displayedColumns = [
    'rowNumber',
    'name',
    'played',
    'goalDifference',
    'points',
  ];
  public colorLegend: ColorLegend;
  public groups: any[] = [];
  private emptyTeamName = 'Team';
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      if (tournament.tournamentId) {
        this.setColorLegend(tournament.tournamentTypeId);
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
    this.tournamentService.getTournamentParticipants(tournament.tournamentId)
      .subscribe((tournamentParticipants: TournamentParticipant[]) => {
        const groups = this.getGroups(tournamentParticipants);

        this.groups = Array.from(groups).map((group) => {
          return {
            advancingTeams: tournament.teamsAdvancingAfterGroups,
            groupName: group,
            rows: tournamentParticipants
              .filter((participant) => participant.group === group)
              .map((participant: TournamentParticipant, index: number) => {
                const { team } = participant;

                return {
                  goalDifference: 0,
                  name: team ? team.name : `${this.emptyTeamName} ${participant.sequenceId}`,
                  played: 0,
                  points: 0,
                  rowNumber: index + 1,
                };
              }),
          };
        });
      });
  }

  private getGroups(teams: TournamentParticipant[]): Set<string> {
    return new Set(
      teams.map((team) => team.group),
    );
  }
}
