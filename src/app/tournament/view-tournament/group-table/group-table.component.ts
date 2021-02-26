import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ColorLegend } from '@app/utils/color-legend.util';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import { TournamentService } from '@tournament/services/tournament.service';

@Component({
  selector: 'app-group-table',
  styleUrls: ['./group-table.component.scss'],
  templateUrl: './group-table.component.html',
})
export class GroupTableComponent implements OnChanges, OnInit {
  @Input() public teams: TournamentParticipant[];

  public displayedColumns = [
    'rowNumber',
    'name',
    'played',
    'goalDifference',
    'points',
  ];
  public rows: any[] = [];
  public groupName: string;
  public advancingTeams: number;
  public colorLegend: ColorLegend;
  private emptyTeamName = 'Team';

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.subscribe((tournament) => {
      this.advancingTeams = tournament.teamsAdvancingAfterGroups;

      this.setColorLegend(tournament.type);
    });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.teams) {
      const teams = changes.teams.currentValue;

      this.groupName = teams[0].group;
      this.rows = teams.sort((team1: TournamentParticipant, team2: TournamentParticipant) => {
        return team1.teamSequenceId - team2.teamSequenceId;
      }).map((participant: TournamentParticipant, index: number) => {
        const { team } = participant;

        return {
          goalDifference: 0,
          name: team ? team.name : `${this.emptyTeamName} ${participant.teamSequenceId}`,
          played: 0,
          points: 0,
          rowNumber: index + 1,
        };
      });
    }
  }

  private setColorLegend(type: string): void {
    this.colorLegend = new ColorLegend(type);
  }
}
