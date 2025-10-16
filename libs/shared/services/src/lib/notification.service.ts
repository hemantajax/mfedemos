import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

/**
 * Service for managing application notifications
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationSubject = new Subject<Notification>();
  public notification$ = this.notificationSubject.asObservable();

  /**
   * Show a success notification
   */
  success(message: string, duration = 3000): void {
    this.show({ type: 'success', message, duration });
  }

  /**
   * Show an error notification
   */
  error(message: string, duration = 5000): void {
    this.show({ type: 'error', message, duration });
  }

  /**
   * Show a warning notification
   */
  warning(message: string, duration = 4000): void {
    this.show({ type: 'warning', message, duration });
  }

  /**
   * Show an info notification
   */
  info(message: string, duration = 3000): void {
    this.show({ type: 'info', message, duration });
  }

  /**
   * Show a notification with custom options
   */
  private show(notification: Notification): void {
    this.notificationSubject.next(notification);
  }
}
