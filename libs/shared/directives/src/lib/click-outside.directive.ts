import { Directive, ElementRef, inject, output } from '@angular/core';

/**
 * Detects clicks outside of the element
 * Usage: <div (clickOutside)="onClickOutside()">content</div>
 */
@Directive({
  selector: '[clickOutside]',
  host: {
    '(document:click)': 'onClick($event.target)',
  },
})
export class ClickOutsideDirective {
  private elementRef = inject(ElementRef);
  clickOutside = output<void>();

  onClick(target: HTMLElement): void {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.clickOutside.emit();
    }
  }
}
