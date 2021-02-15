import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view-tournament',
  styleUrls: ['./view-tournament.component.scss'],
  templateUrl: './view-tournament.component.html',
})
export class ViewTournamentComponent implements OnInit, OnDestroy {
  public tournament: Tournament;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((params) => {
      this.getTournament(params.id);
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  private getTournament(id: number): void {
    this.tournamentService.getTournament(id).pipe(
      take(1),
    ).subscribe((tournament) => {
      this.tournament = tournament;
    });
  }
}
