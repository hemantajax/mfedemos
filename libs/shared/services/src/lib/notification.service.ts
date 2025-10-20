import { Injectable, signal } from '@angular/core';

export interface Notification {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

/**
 * Service for managing application notifications
 * Uses Angular signals for reactive state management
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  // Signal-based notification state
  private notificationSignal = signal<Notification | null>(null);

  // Read-only signal for external use
  readonly notification = this.notificationSignal.asReadonly();

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
   * Clear the current notification
   */
  clear(): void {
    this.notificationSignal.set(null);
  }

  /**
   * Show a notification with custom options
   */
  private show(notification: Notification): void {
    this.notificationSignal.set(notification);

    // Auto-clear notification after duration
    if (notification.duration) {
      setTimeout(() => this.clear(), notification.duration);
    }
  }
}
