import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '@app/utils/validation-messages.utils';
import User from '../../models/user.model';

@Component({
  selector: 'app-organisator-form',
  styleUrls: ['./organisator-form.component.scss'],
  templateUrl: './organisator-form.component.html',
})
export class OrganisatorFormComponent {
  @Output() private onFormSubmit = new EventEmitter<User>();
  @Output() public onCancelEdit = new EventEmitter<void>();
  @Input() public profile: User;
  @Input() public isReadOnly: boolean;
  @Input() public hideRegisterButton: boolean;

  public validationMessages = new ValidationMessages();
  public form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      nickname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', Validators.required],
    });
    this.formSubmitAttempt = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile) {
      this.form = this.fb.group({
        email: [this.profile.email, Validators.required],
        nickname: [this.profile.nickname, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
        password: [this.profile.password, Validators.required],
      });
      this.formSubmitAttempt = false;
    }
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
      this.onFormSubmit.emit(new User(this.form.value));
    }

    this.formSubmitAttempt = true;
  }

  public onCancel(): void {
    this.onCancelEdit.emit();
  }
}
