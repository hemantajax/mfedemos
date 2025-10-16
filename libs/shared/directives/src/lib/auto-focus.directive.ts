import { Directive, ElementRef, OnInit } from '@angular/core';

/**
 * Automatically focuses an element when it is rendered
 * Usage: <input appAutoFocus />
 */
@Directive({
  selector: '[appAutoFocus]',
  standalone: true,
})
export class AutoFocusDirective implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.elementRef.nativeElement.focus();
    }, 0);
  }
}
