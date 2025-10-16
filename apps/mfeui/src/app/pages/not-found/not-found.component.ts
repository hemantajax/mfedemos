import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  suggestions = [
    {
      icon: 'bi-house-door',
      title: 'Go Home',
      description: 'Return to the dashboard',
      link: '/dashboard',
    },
    {
      icon: 'bi-info-circle',
      title: 'About Us',
      description: 'Learn more about our platform',
      link: '/about',
    },
    {
      icon: 'bi-envelope',
      title: 'Contact Support',
      description: 'Get help from our team',
      link: '/contact',
    },
  ];
}
