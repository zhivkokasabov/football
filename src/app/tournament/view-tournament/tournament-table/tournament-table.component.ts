import { Component, OnInit } from '@angular/core';
import TournamentParticipant from '@tournament/models/tournament-participant.model';
import { TournamentService } from '@tournament/services/tournament.service';

@Component({
  selector: 'app-tournament-table',
  styleUrls: ['./tournament-table.component.scss'],
  templateUrl: './tournament-table.component.html',
})
export class TournamentTableComponent implements OnInit {
  public groups: TournamentParticipant[][] = [];

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament
      .subscribe((tournament) => {
        if (tournament.id) {
          this.tournamentService.getTournamentParticipants(tournament.id)
            .subscribe((tournamentParticipants: TournamentParticipant[]) => {
              const groups = this.getGroups(tournamentParticipants);

              this.groups = Array.from(groups).map((group) => {
                return tournamentParticipants.filter((participant) => participant.group === group);
              });
            });
        }
      });
  }

  private getGroups(teams: TournamentParticipant[]): Set<string> {
    return new Set(
      teams.map((team) => team.group),
    );
  }
}
