import { Component, OnDestroy, OnInit } from '@angular/core';
import TournamentType from '@tournament/models/tournament-type.model';
import Tournament from '@tournament/models/tournament.model';
import { TournamentService } from '@tournament/services/tournament.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-tournament-groups',
  styleUrls: ['./tournament-groups.component.scss'],
  templateUrl: './tournament-groups.component.html',
})
export class TournamentGroupsComponent implements OnInit, OnDestroy {
  public numberOfRounds: number;
  public tournamentType: TournamentType;
  public noContentMsg = 'Tournament ogranisator has not picked a tournament type yet!';
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
  ) { }

  public ngOnInit(): void {
    this.tournamentService.tournament.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((tournament: Tournament) => {
      this.tournamentType = tournament.type;
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
