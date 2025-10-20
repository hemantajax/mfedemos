import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CounterService } from '@nxmfe/shared/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private counterService = inject(CounterService);
  isMenuCollapsed = true;
  counter$: Observable<number> = this.counterService.counter$;

  toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }
}
