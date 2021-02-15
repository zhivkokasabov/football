import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import NavItem from '../models/nav-item.model';

@Component({
  selector: 'app-profile',
  styleUrls: ['./profile.component.scss'],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {
  public navItems: NavItem[] = [
    new NavItem({ routerLink: 'user-settings', icon: 'perm_identity' }),
    new NavItem({ routerLink: 'tournaments', icon: 'sports_soccer' }),
    new NavItem({ routerLink: 'notifications', icon: 'feedback' }),
    new NavItem({ routerLink: 'messages', icon: 'message' }),
  ];
  public activeLink: string | undefined;
  private $unsubscribe = new Subject<void>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    const lastUrlSegment = this.getLastUrlSegment(this.router.url);

    if (this.navItems.find((navItem) => navItem.routerLink === lastUrlSegment)) {
      this.activeLink = lastUrlSegment;
    } else {
      const url = this.navItems[0].routerLink;
      this.router.navigate([`${url}`], { relativeTo: this.activatedRoute.parent });
    }

    this.router.events.pipe(
      takeUntil(this.$unsubscribe),
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.getLastUrlSegment(event.url);
      }
    });
  }

  public ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  private getLastUrlSegment(url: string): string | undefined {
    return url.split('/').pop();
  }
}
