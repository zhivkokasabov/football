import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private router: Router,
  ) { }

  public canActivate(): boolean {
    const token = localStorage.getItem('auth');

    if (token) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
