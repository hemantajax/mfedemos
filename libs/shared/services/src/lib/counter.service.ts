import { Injectable, signal } from '@angular/core';

/**
 * Shared Counter Service
 * Demonstrates state sharing across multiple micro frontends
 * This service maintains a global counter that can be accessed and modified from any MFE
 * Uses Angular signals for reactive state management
 */
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  // Signal-based counter state
  private counterSignal = signal<number>(0);

  // Read-only signal for external use
  readonly counter = this.counterSignal.asReadonly();

  /**
   * Get the current counter value
   */
  get currentValue(): number {
    return this.counterSignal();
  }

  /**
   * Increment the counter by a specified amount
   * @param amount - The amount to increment (default: 1)
   */
  increment(amount = 1): void {
    this.counterSignal.update((value) => value + amount);
  }

  /**
   * Decrement the counter by a specified amount
   * @param amount - The amount to decrement (default: 1)
   */
  decrement(amount = 1): void {
    this.counterSignal.update((value) => value - amount);
  }

  /**
   * Reset the counter to zero
   */
  reset(): void {
    this.counterSignal.set(0);
  }

  /**
   * Set the counter to a specific value
   * @param value - The value to set
   */
  setValue(value: number): void {
    this.counterSignal.set(value);
  }
}
