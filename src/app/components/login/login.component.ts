import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public form: FormGroup;
  private formSubmitAttempt: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.formSubmitAttempt = false;
  }

  public isFieldInvalid(field: string): boolean | undefined {
    return (!this.form.get(field)?.valid && this.form.get(field)?.touched) ||
    (this.form.get(field)?.untouched && this.formSubmitAttempt);
  }

  public onSubmit(): void {
    const user = this.form.value;
    user.password = user.password;

    if (this.form.valid) {
      this.userService.login(user).subscribe(
        (response) => {
          this.snackbarService.success('Login successfull!');

          this.router.navigate(['/']);
        },
      );
    }

    this.formSubmitAttempt = true;
  }
}
