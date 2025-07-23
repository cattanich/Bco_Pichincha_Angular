import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../../../core/services/notification/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      notification => {
        this.notification = notification;
      }
    );
  }

  closeNotification(): void {
    this.notificationService.clearNotification();
  }

  // Helper method to get appropriate CSS class based on notification type
  getNotificationClass(): string {
    if (!this.notification) return '';
    
    switch (this.notification.type) {
      case 'success': return 'notification-success';
      case 'error': return 'notification-error';
      case 'info': return 'notification-info';
      case 'warning': return 'notification-warning';
      default: return '';
    }
  }
}
