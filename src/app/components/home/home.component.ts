import { Component, OnDestroy, OnInit } from '@angular/core';
import Tournament from '@tournament/models/tournament.model';
import { TournamentsService } from '@tournaments/services/tournaments.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public tournaments: Tournament[] = [];
  private unsubscribe = new Subject<void>();
  private page = 1;
  private pageSize = 20;

  constructor(
    private tournamentsService: TournamentsService,
  ) { }

  public ngOnInit(): void {
    this.tournamentsService.getAllTournaments(this.page, this.pageSize)
    .pipe(
      takeUntil(this.unsubscribe),
    )
    .subscribe((tournaments) => {
      this.tournaments = tournaments;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
