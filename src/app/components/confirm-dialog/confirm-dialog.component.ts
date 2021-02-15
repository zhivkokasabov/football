import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  styleUrls: ['./confirm-dialog.component.scss'],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
  ) { }

  public closeDialog(): void {
    const keepChanges = true;

    this.dialogRef.close(keepChanges);
  }
}
