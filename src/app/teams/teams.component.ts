import { Component, OnInit } from '@angular/core';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import Team from '@teams/models/team.model';
import { TeamsService } from '@teams/services/teams.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  styleUrls: ['./teams.component.scss'],
  templateUrl: './teams.component.html',
})
export class TeamsComponent extends Base implements OnInit {
  private currentUser: User;
  public teams: Team[] = [];

  constructor(
    private userService: UserService,
    private teamsService: TeamsService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.userService.currentUser.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((user: User) => {
      this.currentUser = user;

      this.teamsService.getUserTeams(this.currentUser.id).subscribe((teams) => {
        this.teams = teams;
      });
    });
  }
}
