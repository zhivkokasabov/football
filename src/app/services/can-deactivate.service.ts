import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IConfirmBeforeLeave } from '../interfaces/confirm-before-leave.interface';
import { ConfirmDialogService } from './confirm-dialog.service';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<IConfirmBeforeLeave> {
  constructor(
    private confirmDialogService: ConfirmDialogService,
  ) {
  }

  public canDeactivate(component: IConfirmBeforeLeave): boolean | Observable<boolean> {
    if (component.hasUnsavedData()) {
      return new Observable<boolean>((observer) => {
        this.confirmDialogService.openDialog().subscribe(
          (result) => {
            observer.next(result ? true : false);
            observer.complete();
          },
        );
      });
    } else {
      return true;
    }
  }
}
