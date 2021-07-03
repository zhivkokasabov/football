import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SnackbarService } from '@app/services/snackbar.service';
import { Observable, throwError  } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 400) {
          response.error.errors.forEach((error: any) => {
            this.snackbarService.error(error.error);
          });
        } else if (response.status === 500) {
          this.snackbarService.error('Oops, something went wrong!');
        } else if (response.status === 401) {
          this.router.navigate(['/login']);
        }

        return throwError(response);
      }),
    );
  }
}
