import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserTypes } from '@app/enums/user-types.enum';
import User from '@app/models/user.model';
import { UserService } from '@app/services/user.service';
import Tournament from '@tournament/models/tournament.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TournamentsService } from './services/tournaments.service';

@Component({
  selector: 'app-tournaments',
  styleUrls: ['./tournaments.component.scss'],
  templateUrl: './tournaments.component.html',
})
export class TournamentsComponent implements OnInit {
  public tournaments: Tournament[] = [];
  public userTypeOrganization = UserTypes.ORGANIZATION;
  public userTypeId: number;
  private userId: number;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentsService: TournamentsService,
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    this.userService.currentUser.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((user: User) => {
      this.userId = user.id;
      this.userTypeId = user.userTypeId;

      this.tournamentsService.getUserTournaments(user.id).subscribe((tournaments: Tournament[]) => {
        this.tournaments = tournaments;
      });
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
