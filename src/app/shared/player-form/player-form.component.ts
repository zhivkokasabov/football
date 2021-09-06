import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import PlayerPosition from '@app/models/player-position.model';
import User from '@app/models/user.model';
import { PlayerPositionService } from '@app/services/player-position.service';
import { ValidationMessages } from '@app/utils/validation-messages.utils';

@Component({
  selector: 'app-player-form',
  styleUrls: ['./player-form.component.scss'],
  templateUrl: './player-form.component.html',
})
export class PlayerFormComponent implements OnInit, OnChanges {
  @Output() private onFormSubmit = new EventEmitter<User>();
  @Output() public onCancelEdit = new EventEmitter<void>();
  @Input() public profile: User;
  @Input() public isReadOnly: boolean;
  @Input() public hideRegisterButton: boolean;

  public form: FormGroup;
  public playerPositions: PlayerPosition[] = [];
  public validationMessages = new ValidationMessages();
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private playerPositionService: PlayerPositionService,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      nickname: [''],
      password: ['', Validators.required],
      playerPositions: [],
    });
    this.formSubmitAttempt = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile) {
      this.form = this.fb.group({
        email: [this.profile.email, Validators.required],
        firstName: [this.profile.firstName],
        lastName: [this.profile.lastName],
        nickname: [this.profile.nickname, [Validators.required, Validators.minLength(4), Validators.maxLength(64)]],
        password: [this.profile.password, Validators.required],
        playerPositions: [this.profile.positions],
      });
      this.formSubmitAttempt = false;
    }
  }

  public ngOnInit(): void {
    this.playerPositionService.getPlayerPositions().subscribe((playerPositions) => {
      this.playerPositions = playerPositions;

      const positions = this.form.get('playerPositions');

      if (positions && positions.value) {
        const ids = positions.value.map((x: any) => x.id);
        positions.setValue(playerPositions.filter((x: any) => ids.includes(x.id)));
      }
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
    const user = this.form.value;

    if (this.form.valid) {
      this.onFormSubmit.emit(
        new User({
          ...user,
          positions: user.playerPositions,
        }),
      );
    }

    this.formSubmitAttempt = true;
  }

  public onCancel(): void {
    this.onCancelEdit.emit();
  }
}
