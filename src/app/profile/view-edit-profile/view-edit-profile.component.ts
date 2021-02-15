import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserTypes } from '../../enums/user-types.enum';
import { IConfirmBeforeLeave } from '../../interfaces/confirm-before-leave.interface';
import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-view-edit-profile',
  styleUrls: ['./view-edit-profile.component.scss'],
  templateUrl: './view-edit-profile.component.html',
})
export class ViewEditProfileComponent implements OnInit {
  public user: User;
  public isEditing: boolean;
  public userTypePlayer = UserTypes.PLAYER;
  private $unsubscribe = new Subject<void>();

  constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUser.pipe(
      takeUntil(this.$unsubscribe),
    ).subscribe((currentUser) => {
      this.user = currentUser;
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
