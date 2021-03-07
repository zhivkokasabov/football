import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatRadioChange } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { ValidationMessages } from '@app/utils/validation-messages.utils';
import { PlayingDays, PlayingDaysNames } from '@tournament/enums/playing-days.enum';
import { TournamentTypesEnum } from '@tournament/enums/tournament-types.enum';
import TournamentAccess from '@tournament/models/tournament-access.model';
import TournamentType from '@tournament/models/tournament-type.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-form',
  styleUrls: ['../../styles/_form.scss'],
  templateUrl: './tournament-form.component.html',
})
export class TournamentFormComponent implements OnInit, OnDestroy {
  @Input() public tournament: Tournament;
  @Output() public onEditCancel = new EventEmitter<void>();
  @Output() public onFormSubmit = new EventEmitter<Tournament>();
  @ViewChild(MatDatepicker) private picker: MatDatepicker<any>;

  public form: FormGroup;
  public validationMessages = new ValidationMessages();
  public descriptionMaxLength = 100;
  public playingDaysNames = PlayingDaysNames;
  public playingDays = PlayingDays;
  public filterDatesFactoryMethod = this.filterDatesFactoryMethodWithoutBinding.bind(this);
  public tournamentTypes: TournamentType[] = [];
  public tournamentTypesEnum = TournamentTypesEnum;
  public tournamentAccesses: TournamentAccess[] = [];
  private formSubmitAttempt: boolean;
  private currentUser: User;
  private unsubscribe = new Subject<void>();

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe(({ types, accesses }) => {
      this.tournamentAccesses = accesses;
      this.tournamentTypes = types;

      this.setupForm();
    });

    this.getUser();
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
      const tournament = this.form.value;

      this.onFormSubmit.emit(new Tournament(tournament));
    }

    this.formSubmitAttempt = true;
  }

  public onCancel(): void {
    this.onEditCancel.emit();
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

  public compareWithType(t1: TournamentType, id: number): boolean {
    return t1.id === id;
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
      accessId: [this.tournament.accessId || this.tournamentAccesses[0]?.id],
      avenue: [this.tournament.avenue, Validators.required],
      description: [this.tournament.description, Validators.maxLength(this.descriptionMaxLength)],
      firstMatchStartsAt: [this.tournament.firstMatchStartsAt, Validators.required],
      groupSize: [this.tournament.groupSize, [Validators.required, Validators.min(2)]],
      halfTimeLength: [this.tournament.halfTimeLength],
      id: [this.tournament.id],
      matchLength: [this.tournament.matchLength, Validators.required],
      name: [this.tournament.name, [Validators.required, Validators.maxLength(24), Validators.minLength(4)]],
      playingDays: [this.tournament.playingDays || this.playingDays.workDays],
      playingFields: [this.tournament.playingFields, [Validators.min(1), Validators.required]],
      rules: [this.tournament.rules],
      startDate: [this.tournament.startDate, Validators.required],
      teamsAdvancingAfterGroups: [this.tournament.teamsAdvancingAfterGroups, [Validators.required, Validators.min(1)]],
      teamsCount: [this.tournament.teamsCount, Validators.required],
      typeId: [this.tournament.typeId, Validators.required],
    });

    this.subscribeToFormChanges();
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

  private subscribeToFormChanges(): void {
    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((formValues: any) => {
      if (formValues.typeId === this.tournamentTypesEnum.classic) {
        this.form.controls.groupSize.setValidators(
          [Validators.required, Validators.min(2)]);
        this.form.controls.teamsAdvancingAfterGroups.setValidators(
          [Validators.required, Validators.min(1)]);
      } else {
        this.form.controls.groupSize.setValidators(null);
        this.form.controls.teamsAdvancingAfterGroups.setValidators(null);
      }
    });
  }
}
