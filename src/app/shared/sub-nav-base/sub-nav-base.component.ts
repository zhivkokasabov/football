import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Base } from '@app/components/base.component';
import { ISubNav } from '@app/interfaces/sub-nav.interface';
import NavItem from '@app/models/nav-item.model';
import { getLastUrlSegment } from '@app/utils/get-last-url-segment.util';
import { takeUntil } from 'rxjs/operators';

@Component({
  template: '',
})
export class SubNavBaseComponent extends Base implements ISubNav, OnInit {
  public navItems: NavItem[] = [];
  public activeLink: string | undefined;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
  ) {
    super();
  }

  public ngOnInit(): void {
    const lastUrlSegment = getLastUrlSegment(this.router.url);

    if (this.navItems.find((navItem) => navItem.routerLink === lastUrlSegment)) {
      this.activeLink = lastUrlSegment;
    } else if (lastUrlSegment !== 'edit') {
      const url = this.navItems[0].routerLink;
      this.router.navigate([`${url}`], { relativeTo: this.activatedRoute });
    } else {
      this.activeLink = 'edit';
    }

    this.router.events.pipe(
      takeUntil(this.unsubscribe),
    ).subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.activeLink = getLastUrlSegment(event.url);
      }
    });
  }
}
