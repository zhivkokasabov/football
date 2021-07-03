import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestsInProgressService {
  public ongoingRequestsSubject = new Subject<boolean>();
  private activeRequests = 0;

  constructor() { }

  public incrementActiveRequests(): void {
    this.activeRequests = this.activeRequests + 1;

    this.ongoingRequestsSubject.next(true);
  }

  public decrementActiveRequests(): void {
    this.activeRequests = this.activeRequests - 1;

    if (this.activeRequests === 0) {
      this.ongoingRequestsSubject.next(false);
    }
  }
}
