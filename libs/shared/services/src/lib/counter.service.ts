import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Shared Counter Service
 * Demonstrates state sharing across multiple micro frontends
 * This service maintains a global counter that can be accessed and modified from any MFE
 */
@Injectable({
  providedIn: 'root',
})
export class CounterService {
  private counterSubject = new BehaviorSubject<number>(0);
  public counter$: Observable<number> = this.counterSubject.asObservable();

  /**
   * Get the current counter value
   */
  get currentValue(): number {
    return this.counterSubject.value;
  }

  /**
   * Increment the counter by a specified amount
   * @param amount - The amount to increment (default: 1)
   */
  increment(amount: number = 1): void {
    const newValue = this.counterSubject.value + amount;
    this.counterSubject.next(newValue);
  }

  /**
   * Decrement the counter by a specified amount
   * @param amount - The amount to decrement (default: 1)
   */
  decrement(amount: number = 1): void {
    const newValue = this.counterSubject.value - amount;
    this.counterSubject.next(newValue);
  }

  /**
   * Reset the counter to zero
   */
  reset(): void {
    this.counterSubject.next(0);
  }

  /**
   * Set the counter to a specific value
   * @param value - The value to set
   */
  setValue(value: number): void {
    this.counterSubject.next(value);
  }
}
