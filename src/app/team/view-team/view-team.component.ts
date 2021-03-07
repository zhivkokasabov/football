import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import NavItem from '@app/models/nav-item.model';
import { getLastUrlSegment } from '@app/utils/get-last-url-segment.util';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'app-view-team',
  styleUrls: ['./view-team.component.scss'],
  templateUrl: './view-team.component.html',
})
export class ViewTeamComponent extends Base implements OnInit {
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'view', icon: 'settings_suggest' }),
    new NavItem({ routerLink: 'tournaments', icon: 'table_chart' }),
    new NavItem({ routerLink: 'results', icon: 'groups' }),
  ];
  public activeLink: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
  ) {
    super();
  }

  public ngOnInit(): void {
    const lastUrlSegment = getLastUrlSegment(this.router.url);

    if (this.navItems.find((navItem) => navItem.routerLink === lastUrlSegment)) {
      this.activeLink = lastUrlSegment;
    } else {
      const url = this.navItems[0].routerLink;

      this.router.navigate([`${url}`], { relativeTo: this.activatedRoute });
    }

    this.activatedRoute.params.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((params) => {
      this.getTeam(params.id);
    });

    this.router.events.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = getLastUrlSegment(event.url);
      }
    });
  }

  private getTeam(id: number): void {
    // this.teamsService.getTeam(id).pipe(
    //   take(1),
    // ).subscribe((team: Team) => {
    //   this.team = team;
    // });
  }
}
