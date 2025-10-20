import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-notifications-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-bell-fill me-2"></i>Notifications
          </h1>
          <p class="lead text-muted">
            Stay updated with all your latest activities and alerts
          </p>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="row mb-4">
        <div class="col-12">
          <ul class="nav nav-pills" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" type="button" role="tab">
                <i class="bi bi-inbox-fill me-2"></i>All
                <span class="badge bg-primary ms-2">12</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" type="button" role="tab">
                <i class="bi bi-exclamation-circle-fill me-2"></i>Unread
                <span class="badge bg-danger ms-2">5</span>
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" type="button" role="tab">
                <i class="bi bi-check-circle-fill me-2"></i>Read
                <span class="badge bg-success ms-2">7</span>
              </button>
            </li>
            <li class="nav-item ms-auto" role="presentation">
              <button class="btn btn-outline-primary btn-sm">
                <i class="bi bi-check2-all me-2"></i>Mark all as read
              </button>
            </li>
          </ul>
        </div>
      </div>

      <!-- Notifications List -->
      <div class="row">
        <div class="col-12">
          <!-- Notification Card 1 - Unread -->
          <div
            class="card border-0 shadow-sm mb-3 border-start border-primary border-4"
          >
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-primary-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-cart-check-fill fs-5 text-primary"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">New Order Placed</h6>
                      <p class="mb-2 text-muted">
                        Order #ORD-2024-1234 has been successfully placed. Total
                        amount: $289.99
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>2 minutes ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 2 - Unread -->
          <div
            class="card border-0 shadow-sm mb-3 border-start border-success border-4"
          >
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-credit-card-fill fs-5 text-success"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">Payment Successful</h6>
                      <p class="mb-2 text-muted">
                        Your payment of $289.99 has been successfully processed.
                        Transaction ID: TXN-789456123
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>15 minutes ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 3 - Unread -->
          <div
            class="card border-0 shadow-sm mb-3 border-start border-info border-4"
          >
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-info-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-truck fs-5 text-info"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">Order Shipped</h6>
                      <p class="mb-2 text-muted">
                        Your order #ORD-2024-1198 has been shipped. Estimated
                        delivery: Oct 23, 2025
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>1 hour ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 4 - Read -->
          <div class="card border-0 shadow-sm mb-3 bg-light">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-warning-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-percent fs-5 text-warning"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">Flash Sale Alert</h6>
                      <p class="mb-2 text-muted">
                        Don't miss out! 50% off on selected items. Sale ends in
                        6 hours.
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>3 hours ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 5 - Unread -->
          <div
            class="card border-0 shadow-sm mb-3 border-start border-danger border-4"
          >
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-danger-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i
                      class="bi bi-exclamation-triangle-fill fs-5 text-danger"
                    ></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">Payment Failed</h6>
                      <p class="mb-2 text-muted">
                        Payment for order #ORD-2024-1156 failed. Please update
                        your payment method.
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>Yesterday
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 6 - Read -->
          <div class="card border-0 shadow-sm mb-3 bg-light">
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-secondary-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-star-fill fs-5 text-secondary"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">Review Request</h6>
                      <p class="mb-2 text-muted">
                        We'd love to hear your feedback on your recent purchase.
                        Write a review and get 10% off your next order!
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>2 days ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Notification Card 7 - Unread -->
          <div
            class="card border-0 shadow-sm mb-3 border-start border-success border-4"
          >
            <div class="card-body">
              <div class="d-flex">
                <div class="flex-shrink-0">
                  <div
                    class="rounded-circle bg-success-subtle d-flex align-items-center justify-content-center"
                    style="width: 48px; height: 48px"
                  >
                    <i class="bi bi-box-seam fs-5 text-success"></i>
                  </div>
                </div>
                <div class="flex-grow-1 ms-3">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1 fw-bold">Order Delivered</h6>
                      <p class="mb-2 text-muted">
                        Your order #ORD-2024-1089 has been delivered
                        successfully. Enjoy your purchase!
                      </p>
                      <small class="text-muted">
                        <i class="bi bi-clock me-1"></i>3 days ago
                      </small>
                    </div>
                    <div class="dropdown">
                      <button class="btn btn-link text-muted" type="button">
                        <i class="bi bi-three-dots-vertical"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Load More Button -->
          <div class="text-center mt-4">
            <button class="btn btn-outline-primary">
              <i class="bi bi-arrow-down-circle me-2"></i>Load More
              Notifications
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .card {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    }

    .nav-pills .nav-link {
      color: #6c757d;
    }

    .nav-pills .nav-link.active {
      background-color: #0d6efd;
    }

    .btn-link:hover {
      text-decoration: none;
    }
  `,
})
export class RemoteEntry {}
