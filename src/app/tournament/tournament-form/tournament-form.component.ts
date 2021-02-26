import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import User from '@app/models/user.model';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { ValidationMessages } from '@app/utils/validation-messages.utils';
import { PlayingDays, PlayingDaysNames } from '@tournament/enums/playing-days.enum';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-form',
  styleUrls: ['./tournament-form.component.scss'],
  templateUrl: './tournament-form.component.html',
})
export class TournamentFormComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public readOnly: boolean;
  @ViewChild(MatDatepicker) private picker: MatDatepicker<any>;

  public form: FormGroup;
  public validationMessages = new ValidationMessages();
  public descriptionMaxLength = 100;
  public playingDaysNames = PlayingDaysNames;
  public playingDays = PlayingDays;
  public filterDatesFactoryMethod = this.filterDatesFactoryMethodWithoutBinding.bind(this);
  private formSubmitAttempt: boolean;
  private currentUser: User;
  private unsubscribe = new Subject<void>();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private router: Router,
    private snackbarService: SnackbarService,
  ) { }

  public ngOnInit(): void {
    this.getUser();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.readOnly) {
      this.setupForm();

      if (changes.readOnly.currentValue === true) {
        this.form.disable();
      } else {
        this.form.enable();
      }
    }
  }

  private getUser(): void {
    this.userService.currentUser
    .pipe(
      takeUntil(this.unsubscribe),
    )
    .subscribe((user: User) => {
      this.currentUser = user;
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

  public onPlayingDaysChange(changeEvent: MatRadioChange): void {
    if (this.form.get('startDate')?.value) {
      this.picker.select(undefined);
    }
  }

  public filterDatesFactoryMethodWithoutBinding(d: Date | null): boolean {
    const playingDays = this.form.get('playingDays')?.value;
    const day = this.dateFactoryMethod(d);

    switch (playingDays) {
      case this.playingDays.workDays:
        return this.enableWorkDays(day);
      case this.playingDays.weekEnd:
        return this.enableWeekEnds(day);
      default:
        return true;
    }

    return day !== 0 && day !== 6;
  }

  private enableWeekEnds(day: number): boolean {
    return day === 0 || day === 6;
  }

  private enableWorkDays(day: number): boolean {
    return day !== 0 && day !== 6;
  }

  private dateFactoryMethod(d: any): number {
    if (d) {
      return d.day();
    } else {
      return new Date().getDay();
    }
  }

  private setupForm(): void {
    this.form = this.fb.group({
      avenue: ['', Validators.required],
      description: ['', Validators.maxLength(this.descriptionMaxLength)],
      firstMatchStartsAt: ['09:11', Validators.required],
      groupSize: [2, Validators.min(2)],
      halfTimeLength: [null],
      matchLength: [null, Validators.required],
      name: ['test ala bala', [Validators.required, Validators.maxLength(24), Validators.minLength(4)]],
      playingDays: [1],
      playingFields: [null, [Validators.min(1), Validators.required]],
      rules: [''],
      startDate: [null, Validators.required],
      teamAdvancingAfterGroups: [1, Validators.min(1)],
      teamsCount: [null, Validators.required],
    });
    this.formSubmitAttempt = false;
  }
}
