import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';

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
    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe(
        () => {
          this.snackbarService.success('Login successfull!');

          this.router.navigate(['/']);
        },
      );
    }

    this.formSubmitAttempt = true;
  }
}
