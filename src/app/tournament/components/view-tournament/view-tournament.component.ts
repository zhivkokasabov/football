import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import NavItem from '@app/models/nav-item.model';
import { SubNavBaseComponent } from '@shared/sub-nav-base/sub-nav-base.component';

@Component({
  selector: 'app-view-tournament',
  templateUrl: './view-tournament.component.html',
})
export class ViewTournamentComponent extends SubNavBaseComponent {
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'general', icon: 'settings_suggest' }),
    new NavItem({ routerLink: 'table', icon: 'table_chart' }),
    new NavItem({ routerLink: 'groups', icon: 'groups' }),
  ];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super(activatedRoute, router);
  }
}
