import { Component } from '@angular/core';
import { Router } from '@angular/router';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import Tournament from '@tournament/models/tournament.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
})
export class TournamentComponent {
  public tournament = new Tournament();
  private currentUser: User;
  private unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUser
    .pipe(
      takeUntil(this.unsubscribe),
    )
    .subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onEditCancel(): void {
    this.router.navigate([`/profile/${this.currentUser.id}/tournaments`]);
  }
}
