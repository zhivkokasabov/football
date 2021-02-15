import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private duration = 30000;

  constructor(private snackbar: MatSnackBar) {}

  public success(message: string, action?: any): void {
    this.snackbar.open(message, action, {
      duration: this.duration,
      panelClass: 'snackbar-success',
    });
  }

  public error(message: string, action?: any): void {
    this.snackbar.open(message, action, {
      duration: this.duration,
      panelClass: 'snackbar-error',
    });
  }
}
