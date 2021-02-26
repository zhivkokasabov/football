import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import NavItem from '@app/models/nav-item.model';
import { getLastUrlSegment } from '@app/utils/get-last-url-segment.util';
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
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'general', icon: 'settings_suggest' }),
    new NavItem({ routerLink: 'table', icon: 'table_chart' }),
    new NavItem({ routerLink: 'groups', icon: 'groups' }),
  ];
  public activeLink: string | undefined;
  private unsubscribe = new Subject<void>();

  constructor(
    private tournamentService: TournamentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((params) => {
      this.getTournament(params.id);
    });

    this.router.events.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = getLastUrlSegment(event.url);
      }
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
