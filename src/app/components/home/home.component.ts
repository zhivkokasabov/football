import { Component, OnDestroy, OnInit } from '@angular/core';
import PagedResult from '@app/models/paged-result.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentsService } from '@tournaments/services/tournaments.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  public tournaments: Tournament[] = [];
  public showLoadingMore = false;
  private unsubscribe = new Subject<void>();
  private page = 1;
  private pageSize = 10;

  constructor(
    private tournamentsService: TournamentsService,
  ) { }

  public ngOnInit(): void {
    this.getAllTournaments(this.page, this.pageSize)
    .subscribe((result: PagedResult<Tournament>) => {
      this.tournaments = result.items;

      this.setShowLoadingMore(result.meta.totalCount);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public loadMoreTournaments(): void {
    this.page += 1;

    this.getAllTournaments(this.page, this.pageSize).subscribe((result: PagedResult<Tournament>) => {
      this.tournaments = [...this.tournaments, ...result.items];

      this.setShowLoadingMore(result.meta.totalCount);
    });
  }

  private getAllTournaments(page: number, pageSize: number): Observable<PagedResult<Tournament>> {
    return this.tournamentsService.getAllTournaments(this.page, this.pageSize)
    .pipe(
      takeUntil(this.unsubscribe),
    );
  }

  private setShowLoadingMore(total: number): void {
    this.showLoadingMore = this.tournaments.length < total;
  }
}
