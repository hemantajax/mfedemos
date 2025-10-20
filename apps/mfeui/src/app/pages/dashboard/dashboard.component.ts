import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // Remote MFE configurations
  remoteMFEs = [
    {
      id: 1,
      name: 'Product Catalog',
      description: 'Browse and search products with advanced filtering',
      icon: 'bi-shop',
      color: 'primary',
      url: '/products',
      status: 'active', // 'active', 'planned', 'development'
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      port: 4201,
    },
    {
      id: 2,
      name: 'Shopping Cart',
      description: 'Cart and checkout management system',
      icon: 'bi-cart-fill',
      color: 'success',
      url: '/cart',
      status: 'active',
      remoteEntry: 'http://localhost:4202/remoteEntry.js',
      port: 4202,
    },
    {
      id: 3,
      name: 'User Profile',
      description: 'Manage your profile and account settings',
      icon: 'bi-person-circle',
      color: 'info',
      url: '/profile',
      status: 'active',
      remoteEntry: 'http://localhost:4203/remoteEntry.js',
      port: 4203,
    },
    {
      id: 4,
      name: 'Orders Management',
      description: 'View, track and manage your orders',
      icon: 'bi-box-seam',
      color: 'warning',
      url: '/orders',
      status: 'active',
      remoteEntry: 'http://localhost:4204/remoteEntry.js',
      port: 4204,
    },
    {
      id: 5,
      name: 'Analytics Dashboard',
      description: 'Business insights, metrics and reports',
      icon: 'bi-graph-up-arrow',
      color: 'danger',
      url: '/analytics',
      status: 'active',
      remoteEntry: 'http://localhost:4205/remoteEntry.js',
      port: 4205,
    },
    {
      id: 6,
      name: 'Notifications',
      description: 'Notification center and alert management',
      icon: 'bi-bell-fill',
      color: 'secondary',
      url: '/notifications',
      status: 'active',
      remoteEntry: 'http://localhost:4206/remoteEntry.js',
      port: 4206,
    },
    {
      id: 7,
      name: 'Messaging',
      description: 'Real-time chat and messaging system',
      icon: 'bi-chat-dots-fill',
      color: 'primary',
      url: '/messages',
      status: 'active',
      remoteEntry: 'http://localhost:4207/remoteEntry.js',
      port: 4207,
    },
    {
      id: 8,
      name: 'Admin Panel',
      description: 'Administrative tools and configuration',
      icon: 'bi-gear-fill',
      color: 'dark',
      url: '/admin',
      status: 'planned',
      remoteEntry: 'http://localhost:4208/remoteEntry.js',
      port: 4208,
    },
  ];

  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      active: 'success',
      development: 'warning',
      planned: 'secondary',
    };
    return statusMap[status] || 'secondary';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      active: 'bi-check-circle-fill',
      development: 'bi-hourglass-split',
      planned: 'bi-clock-fill',
    };
    return iconMap[status] || 'bi-clock-fill';
  }
}
