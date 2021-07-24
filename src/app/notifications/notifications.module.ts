import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsListComponent } from '@notifications/components/notifications-list/notifications-list.component';

@NgModule({
  declarations: [NotificationsListComponent],
  exports: [
    NotificationsListComponent,
  ],
  imports: [
    CommonModule,
  ],
})
export class NotificationsModule { }
