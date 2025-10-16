import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  stats = [
    {
      title: 'Total Users',
      value: '12,543',
      icon: 'bi-people-fill',
      color: 'primary',
      change: '+12.5%',
    },
    {
      title: 'Revenue',
      value: '$45,678',
      icon: 'bi-currency-dollar',
      color: 'success',
      change: '+8.2%',
    },
    {
      title: 'Orders',
      value: '1,234',
      icon: 'bi-cart-fill',
      color: 'warning',
      change: '+5.7%',
    },
    {
      title: 'Visitors',
      value: '89,432',
      icon: 'bi-graph-up',
      color: 'info',
      change: '+15.3%',
    },
  ];

  recentActivities = [
    {
      user: 'John Doe',
      action: 'Created new order',
      time: '2 minutes ago',
      icon: 'bi-cart-plus',
    },
    {
      user: 'Jane Smith',
      action: 'Updated profile',
      time: '15 minutes ago',
      icon: 'bi-person-check',
    },
    {
      user: 'Mike Johnson',
      action: 'Completed payment',
      time: '1 hour ago',
      icon: 'bi-check-circle',
    },
    {
      user: 'Sarah Williams',
      action: 'Left a review',
      time: '2 hours ago',
      icon: 'bi-star-fill',
    },
    {
      user: 'Tom Brown',
      action: 'Registered account',
      time: '3 hours ago',
      icon: 'bi-person-plus',
    },
  ];

  quickLinks = [
    { title: 'Add New User', icon: 'bi-person-plus-fill', color: 'primary' },
    {
      title: 'View Reports',
      icon: 'bi-file-earmark-bar-graph',
      color: 'success',
    },
    { title: 'Settings', icon: 'bi-gear-fill', color: 'warning' },
    { title: 'Analytics', icon: 'bi-pie-chart-fill', color: 'info' },
  ];
}
