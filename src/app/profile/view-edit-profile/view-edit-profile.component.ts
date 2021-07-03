import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTypes } from '@app/enums/user-types.enum';
import { IConfirmBeforeLeave } from '@app/interfaces/confirm-before-leave.interface';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-edit-profile',
  styleUrls: ['./view-edit-profile.component.scss'],
  templateUrl: './view-edit-profile.component.html',
})
export class ViewEditProfileComponent implements OnInit, IConfirmBeforeLeave {
  public user: User;
  public isEditing: boolean;
  public userTypePlayer = UserTypes.PLAYER;
  public userType: string;
  private $unsubscribe = new Subject<void>();

  constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUser.pipe(
      takeUntil(this.$unsubscribe),
    ).subscribe((currentUser) => {
      this.user = currentUser;

      if (currentUser && currentUser.roles && currentUser.roles.length) {
        this.userType = currentUser.roles[0].name;
      }
    });
  }

  public ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  public editForm(): void {
    this.isEditing = true;
  }

  public cancelEdit(): void {
    this.user = new User(this.user);
    this.isEditing = false;
  }

  public updateProfile(user: User): void {
    debugger;
  }

  public hasUnsavedData(): boolean {
    if (this.isEditing) {
      return true;
    } else {
      return false;
    }
  }
}
