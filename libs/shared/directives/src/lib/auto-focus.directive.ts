import { Directive, ElementRef, OnInit, inject } from '@angular/core';

/**
 * Automatically focuses an element when it is rendered
 * Usage: <input appAutoFocus />
 */
@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  private elementRef = inject(ElementRef);

  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }
}
