import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notifications$: Observable<Notification | null> = this.notificationSubject.asObservable();

  constructor() { }

  showNotification(notification: Notification): void {
    this.notificationSubject.next(notification);
    
    // Auto-hide notification after specified duration
    if (notification.duration !== undefined) {
      setTimeout(() => {
        // Only clear if it's the same notification
        if (this.notificationSubject.value === notification) {
          this.clearNotification();
        }
      }, notification.duration);
    }
  }

  showSuccess(message: string, duration: number = 3000): void {
    this.showNotification({
      message,
      type: 'success',
      duration
    });
  }

  showError(message: string, duration: number = 5000): void {
    this.showNotification({
      message,
      type: 'error',
      duration
    });
  }

  showInfo(message: string, duration: number = 3000): void {
    this.showNotification({
      message,
      type: 'info',
      duration
    });
  }

  showWarning(message: string, duration: number = 4000): void {
    this.showNotification({
      message,
      type: 'warning',
      duration
    });
  }

  clearNotification(): void {
    this.notificationSubject.next(null);
  }
}
