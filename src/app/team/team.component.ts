import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import { IConfirmBeforeLeave } from '@app/interfaces/confirm-before-leave.interface';
import { TeamFormComponent } from '@team/components/team-form/team-form.component';

@Component({
  selector: 'app-team',
  styleUrls: ['./team.component.scss'],
  templateUrl: './team.component.html',
})
export class TeamComponent extends Base implements IConfirmBeforeLeave {
  @ViewChild(TeamFormComponent)
  public teamForm: TeamFormComponent;

  constructor(
    private router: Router,
  ) {
    super();
  }

  public hasUnsavedData(): boolean {
    const { form } = this.teamForm;

    return form.touched;
  }

  public onCancel(): void {
    this.router.navigate([`/teams`]);
  }
}
