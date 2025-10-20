import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CounterService } from '@nxmfe/shared/services';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private counterService = inject(CounterService);
  isMenuCollapsed = true;

  // Expose the counter signal directly
  counter = this.counterService.counter;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
