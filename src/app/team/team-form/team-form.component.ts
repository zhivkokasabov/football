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
  styleUrls: [
    '../../styles/_form.scss',
    './team-form.component.scss',
  ],
  templateUrl: './team-form.component.html',
})
export class TeamFormComponent extends Base implements OnInit {
  @Output() public onCancel = new EventEmitter<void>();
  public form: FormGroup;
  public validationMessages = new ValidationMessages();
  public playersFormControl = new FormControl();
  public addedMembers: User[] = [];
  public players: User[] = [];
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

    this.playersFormControl.valueChanges.pipe(
      takeUntil(this.unsubscribe),
      filter((value) => typeof value === 'string'),
      debounceTime(500),
    ).subscribe((value: string) => {
      this.userService.filterUsers(value).subscribe((users: User[]) => {
        this.players = users;
      });
    });
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
    this.form.controls.users.setValue(this.addedMembers);
    this.formSubmitAttempt = true;

    this.teamService.createTeam(
      new Team(this.form.value),
    ).subscribe((team: Team) => {
      this.snackbarService.success(`Team ${team.name} created successfully!`);

      this.form.reset();
      this.router.navigate([`/teams`]);
    });
  }

  public optionClicked(event: Event, player: User): void {
    event.stopPropagation();

    this.removePlayerFromList(player);
    this.addTeamMember(player);
  }

  public removeMember(player: User): void {
    this.removeAddedPlayer(player);
    this.addPlayer(player);
  }

  public displayFn(user: User): string {
    return [user.firstName, user.lastName, `${user.nickname ? `(${user.nickname})` : ''}`].join(' ');
  }

  private addPlayer(player: User): void {
    this.players.push(player);
  }

  private removeAddedPlayer(player: User): void {
    this.addedMembers = this.addedMembers.filter((a) => a.nickname !== player.nickname);
  }

  private removePlayerFromList(player: User): void {
    this.players = this.players.filter((p) => p.nickname !== player.nickname);
  }

  private addTeamMember(player: User): void {
    this.addedMembers.push(player);
  }

  private setupForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(24), Validators.minLength(4)]],
      users: [[]],
    });
  }
}
