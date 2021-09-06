import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import NavItemModel from '@app/models/nav-item.model';
import User from '@app/models/user.model';
import { RequestsInProgressService } from '@app/services/requests-in-progress.service';
import { UserService } from '@app/services/user.service';
import NotificationsCount from '@notifications/models/notifications-count.model';
import { NotificationsService } from '@notifications/services/notifications.service';
import { interval, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

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
    new NavItemModel({ displayName: 'team', routerLink: '/teams' }),
  ];
  public hideToolbar: boolean;
  public showProgressBar: boolean;
  public isDesktop: boolean;
  public notificationsCount: NotificationsCount = new NotificationsCount({
    incomingRequests: 0,
    outgoingRequest: 0,
  });

  private mobileQueryListener: (event: MediaQueryListEvent) => void;
  private userSubject: Subject<number> = new Subject();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private media: MediaMatcher,
    private userService: UserService,
    private router: Router,
    private requestsInProgressService: RequestsInProgressService,
    private notificationsService: NotificationsService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = (event: MediaQueryListEvent) => {
      if (event.matches === false) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }

      changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addListener(this.mobileQueryListener);

    if (window.innerWidth > 600) {
      this.isDesktop = true;
    }
  }

  public ngOnInit(): void {
    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
      this.navItems[1].routerLink = `profile/${this.currentUser.id}`;

      this.turnOnNotifications();
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

    this.requestsInProgressService.ongoingRequestsSubject
      .pipe(debounceTime(500))
      .subscribe((value: boolean) => {
        this.showProgressBar = value;
      });
  }

  public ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public logOut(): void {
    this.userService.logOut();
    this.router.navigate(['login']);
  }

  private turnOnNotifications(): void {
    this.userSubject.next();
    this.userSubject.complete();

    this.userSubject = new Subject();

    this.notificationsService.getNotificationsCount().subscribe((count: NotificationsCount) => {
      this.notificationsCount = count;
    });

    interval(30 * 1000).pipe(
      takeUntil(this.userSubject),
    ).subscribe(() => {
      this.notificationsService.getNotificationsCount().subscribe((count: NotificationsCount) => {
        this.notificationsCount = count;
      });
    });
  }
}
