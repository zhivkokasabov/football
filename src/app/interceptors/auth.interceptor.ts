import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('auth');

    const cloned = request.clone({
        headers: request.headers
        .set('Authorization', `Bearer ${token}`)
        .set('Access-Control-Allow-Origin', 'https://localhost:44382')
        .set('Access-Control-Allow-Headers', '*')
        .set('Access-Control-Allow-Methods', '*')
        .set('Accept', '*/*'),
      });

    return next.handle(cloned);
  }
}
