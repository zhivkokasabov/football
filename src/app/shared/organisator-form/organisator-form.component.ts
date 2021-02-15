import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      nickname: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formSubmitAttempt = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.profile) {
      this.form = this.fb.group({
        email: [this.profile.email, Validators.required],
        nickname: [this.profile.nickname, Validators.required],
        password: [this.profile.password, Validators.required],
      });
      this.formSubmitAttempt = false;
    }
  }

  public isFieldInvalid(field: string): boolean | undefined {
    return (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
    (this.form.get(field)?.untouched && this.formSubmitAttempt);
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
