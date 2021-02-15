import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestsInProgressService } from '@app/services/requests-in-progress.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestsInProgressInterceptor implements HttpInterceptor {
  constructor(
    private service: RequestsInProgressService,
  ) {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.service.incrementActiveRequests();

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.service.decrementActiveRequests();
        }
      },
      (err: any) => {
        this.service.decrementActiveRequests();
      }),
    );
  }
}
