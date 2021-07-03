import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import TournamentMatch from '@tournament/models/tournament-match.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-team-matches',
  styleUrls: ['./team-matches.component.scss'],
  templateUrl: './team-matches.component.html',
})
export class TeamMatchesComponent extends Base implements OnInit {
  public teamMatches: TournamentMatch[] = [];

  constructor(
    private teamService: TeamService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.teamService.team.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((team: Team) => {
      this.teamService.getMatches(team.id).subscribe((tournamentMatches) => {
        this.teamMatches = tournamentMatches;
      });
    });
  }
}
