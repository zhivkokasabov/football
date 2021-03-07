import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import NavItemModel from '../../models/nav-item.model';
import User from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  styleUrls: ['./sidenav.component.scss'],
  templateUrl: './sidenav.component.html',
})
export class SidenavComponent implements OnDestroy, OnInit {
  public mobileQuery: MediaQueryList;
  public currentUser: User;
  public navItems = [
    new NavItemModel({ displayName: 'home', routerLink: '/', isPublic: true }),
    new NavItemModel({ displayName: 'profile', routerLink: '' }),
    new NavItemModel({ displayName: 'my tournamets', routerLink: '/tournaments' }),
    new NavItemModel({ displayName: 'my teams', routerLink: '/teams' }),
  ];
  public hideToolbar: boolean;

  private mobileQueryListener: () => void;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private userService: UserService,
    private router: Router,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  public ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.navItems[1].routerLink = `profile/${this.currentUser.id}`;
    });

    this.router.events.subscribe((event) => {
      const urlsHidingSidenav = ['/login', '/register'];

      if (event instanceof NavigationStart) {
        if (urlsHidingSidenav.indexOf(event.url) > -1) {
          this.hideToolbar = true;
        } else {
          this.hideToolbar = false;
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public logOut(): void {
    this.userService.logOut();
    this.router.navigate(['login']);
  }
}
