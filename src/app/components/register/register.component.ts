import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Router } from '@angular/router';
import { UserTypes } from '@app/enums/user-types.enum';
import PlayerPosition from '@app/models/player-position.model';
import UserType from '@app/models/user-type.model';
import User from '@app/models/user.model';
import { PlayerPositionService } from '@app/services/player-position.service';
import { SnackbarService } from '@app/services/snackbar.service';
import { UserService } from '@app/services/user.service';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  public userTypes: UserType[] = [];
  public userType: UserType;
  public playerPositions: PlayerPosition[];
  public showPlayerForm = false;
  public showOrganizationForm = false;

  constructor(
    private userService: UserService,
    private playerPositionService: PlayerPositionService,
    private snackbarService: SnackbarService,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.userService.getUserTypes().subscribe((userTypes) => {
      this.userTypes = userTypes;
    });

    this.playerPositionService.getPlayerPositions().subscribe((positions: PlayerPosition[]) => {
      this.playerPositions = positions;
    });
  }

  public selectionChange(selection: MatSelectChange): void {
    this.userType = this.userTypes.find((x) => x.name === selection.value.name) || new UserType();

    if (this.userType.name === UserTypes.ORGANIZATION) {
      this.toggleOrganizationForm();
    } else {
      this.togglePlayerForm();
    }
  }

  public onSubmit(user: User): void {
    user.roles = [this.userType.output()];
    user.password = user.password;

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
