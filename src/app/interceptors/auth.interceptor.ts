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

    if (token) {
        const cloned = request.clone({
            headers: request.headers.set(
              'Authorization',
              `Bearer ${token}`,
            ),
          });

        return next.handle(cloned);
    } else {
        return next.handle(request);
    }
  }
}
