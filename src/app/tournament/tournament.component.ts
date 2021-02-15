import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { ValidationMessages } from '@app/utils/validation-messages.utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Tournament from './models/tournament.model';
import { TournamentService } from './services/tournament.service';

@Component({
  selector: 'app-tournament',
  styleUrls: ['./tournament.component.scss'],
  templateUrl: './tournament.component.html',
})
export class TournamentComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public validationMessages = new ValidationMessages();
  public descriptionMaxLength = 100;
  private formSubmitAttempt: boolean;
  private currentUser: User;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private router: Router,
    private snackbarService: SnackbarService,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.setupForm();
    this.getUser();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
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

  public onSubmit(): void {
    if (this.form.valid) {
      this.tournamentService.newTournament(
        new Tournament(this.form.value),
      ).subscribe((res) => {
        this.snackbarService.success(`Tournament ${res.name} created successfully!`);

        this.router.navigate([`profile/${this.currentUser.id}/tournaments`]);
      });
    }

    this.formSubmitAttempt = true;
  }

  public onCancel(): void {
    this.router.navigate([`/profile/${this.currentUser.id}/tournaments`]);
  }

  private getUser(): void {
    this.userService.currentUser
    .pipe(
      takeUntil(this.unsubscribe$),
    )
    .subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  private setupForm(): void {
    this.form = this.fb.group({
      avenue: ['', Validators.required],
      description: ['', Validators.maxLength(this.descriptionMaxLength)],
      halfTimeLength: [null],
      latestMatchStart: ['', Validators.required],
      matchLength: [null, Validators.required],
      name: ['', [Validators.required, Validators.maxLength(24), Validators.minLength(4)]],
      playingFields: [null],
      rules: [''],
      startDate: [null, Validators.required],
      teamsCount: [null, Validators.required],
    });
    this.formSubmitAttempt = false;
  }
}
