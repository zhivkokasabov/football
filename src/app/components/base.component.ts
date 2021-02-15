import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  template: '',
})
export class Base implements OnDestroy {
  protected unsubscribe = new Subject<void>();

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
