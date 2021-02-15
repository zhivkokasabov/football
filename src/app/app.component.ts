import { Component, OnInit } from '@angular/core';
import User from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public title = 'football';
  public currentUser: User;

  constructor(
    private userService: UserService,
  ) { }

  public ngOnInit(): void {
    const token = localStorage.getItem('auth');

    this.userService.currentUser.subscribe((user: User) => {
      this.currentUser = user;
    });

    if (token) {
      this.userService.getUser();
    }
  }
}
