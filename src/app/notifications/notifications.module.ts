import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { NotificationsListComponent } from '@notifications/components/notifications-list/notifications-list.component';
import { SharedModule } from '@shared/shared.module';
import { NotificationRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';

@NgModule({
  declarations: [NotificationsListComponent, NotificationsComponent],
  exports: [
    NotificationsListComponent,
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    SharedModule,
    MatDividerModule,
  ],
})
export class NotificationsModule { }
