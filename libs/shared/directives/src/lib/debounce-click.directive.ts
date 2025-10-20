import { Directive, OnDestroy, OnInit, input, output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Debounces click events to prevent multiple rapid clicks
 * Usage: <button (debounceClick)="onClick()" [debounceTime]="500">Click</button>
 */
@Directive({
  selector: '[debounceClick]',
  host: {
    '(click)': 'clickEvent($event)',
  },
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  debounceTime = input<number>(500);
  debounceClick = output();

  private clicks = new Subject();
  private subscription?: Subscription;

  ngOnInit(): void {
    this.subscription = this.clicks
      .pipe(debounceTime(this.debounceTime()))
      .subscribe((e) => this.debounceClick.emit(e));
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  clickEvent(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
