import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserTypes } from '../../enums/user-types.enum';
import UserType from '../../models/user-type.model';
import User from '../../models/user.model';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public userTypes: UserType[] = [];
  public userType: UserType;
  public showPlayerForm = false;
  public showOrganizationForm = false;

  constructor(
    private userService: UserService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.userService.getUserTypes().subscribe((userTypes) => {
      this.userTypes = userTypes;
    });
  }

  public selectionChange(selection: MatSelectChange): void {
    this.userType = new UserType(selection.value);

    if (this.userType.id === UserTypes.ORGANIZATION) {
      this.toggleOrganizationForm();
    } else {
      this.togglePlayerForm();
    }
  }

  public onSubmit(user: User): void {
    user.userType = new UserType(this.userType);

    this.userService.register(user).subscribe(
      (res) => {
        this.snackbarService.success('Login successfull!');
        this.router.navigate(['/']);
      },
    );
  }

  private togglePlayerForm(): void {
    this.showPlayerForm = true;
    this.showOrganizationForm = false;
  }

  private toggleOrganizationForm(): void {
    this.showPlayerForm = false;
    this.showOrganizationForm = true;
  }
}
