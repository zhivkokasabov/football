import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import Team from '@teams/models/team.model';
import { TeamsService } from '@teams/services/teams.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-teams',
  styleUrls: ['./teams.component.scss'],
  templateUrl: './teams.component.html',
})
export class TeamsComponent extends Base implements OnInit {
  public team: Team;
  public form: FormGroup;

  constructor(
    private teamsService: TeamsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      entryKey: [''],
    });

    this.teamsService.getUserTeam().subscribe((team) => {
      if (team) {
        this.router.navigate([`team/${team.id}`]);
      }
    });
  }

  public tryJoinTeam(): void {
    const entryKey = this.form.get('entryKey')?.value;

    this.teamsService.addUserToTeam(entryKey).subscribe((team) => {
      if (team) {
        this.router.navigate([`team/${team.id}`]);
      }
    });
  }
}
