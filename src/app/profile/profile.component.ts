import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import NavItem from '@app/models/nav-item.model';
import { SubNavBaseComponent } from '@shared/sub-nav-base/sub-nav-base.component';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent extends SubNavBaseComponent {
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'user-settings', icon: 'perm_identity' }),
    new NavItem({ routerLink: 'messages', icon: 'message' }),
  ];

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super(activatedRoute, router);
  }
}
