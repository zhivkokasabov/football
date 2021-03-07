import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import NavItem from '@app/models/nav-item.model';
import { SubNavBaseComponent } from '@shared/sub-nav-base/sub-nav-base.component';

@Component({
  selector: 'app-view-team',
  styleUrls: ['./view-team.component.scss'],
  templateUrl: './view-team.component.html',
})
export class ViewTeamComponent extends SubNavBaseComponent {
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'general', icon: 'settings_suggest' }),
  ];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super(activatedRoute, router);
  }
}
