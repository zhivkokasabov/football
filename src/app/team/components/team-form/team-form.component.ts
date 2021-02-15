import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { ValidationMessages } from '@app/utils/validation-messages.utils';
import { TeamService } from '@team/services/team.service';
import Team from '@teams/models/team.model';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-team-form',
  styleUrls: ['../../../styles/_form.scss'],
  templateUrl: './team-form.component.html',
})
export class TeamFormComponent extends Base implements OnInit {
  @Output() public onCancel = new EventEmitter<void>();
  public form: FormGroup;
  public validationMessages = new ValidationMessages();
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private teamService: TeamService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.setupForm();
  }

  public isFieldInvalid(field: string, validation?: string): any {
    const formField = this.form.get(field);

    if ((!formField?.valid && formField?.touched) ||
    (formField?.untouched && this.formSubmitAttempt)) {
      if (validation) {
        return formField.errors ? formField.errors[validation] : null;
      }

      return formField.errors;
    }
  }

  public onCancelClick(): void {
    this.onCancel.emit();
  }

  public onSubmit(): void {
    this.formSubmitAttempt = true;

    this.teamService.createTeam(
      new Team(this.form.value),
    ).subscribe((team: Team) => {
      this.snackbarService.success(`Team ${team.name} created successfully!`);

      this.form.reset();
      this.router.navigate([`/teams`]);
    });
  }

  private setupForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(24), Validators.minLength(4)]],
    });
  }
}
