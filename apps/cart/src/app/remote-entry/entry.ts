import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterService } from '@nxmfe/shared/services';

@Component({
  imports: [CommonModule],
  selector: 'app-cart-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-cart3 me-2"></i>Shopping Cart
          </h1>
          <p class="lead text-muted">
            Review and manage items in your shopping cart
          </p>
        </div>
      </div>

      <!-- Shared Counter Demo Card -->
      <div class="row mb-4">
        <div class="col-12">
          <div
            class="card border-success border-2 shadow-sm"
            style="border-style: dashed;"
          >
            <div class="card-body p-4">
              <div class="row align-items-center">
                <div class="col-md-6 mb-3 mb-md-0">
                  <div class="d-flex align-items-center mb-2">
                    <div
                      class="bg-success bg-opacity-10 rounded-circle p-2 me-3"
                    >
                      <i
                        class="bi bi-cloud-arrow-up-fill text-success fs-5"
                      ></i>
                    </div>
                    <h5 class="card-title mb-0 fw-bold">
                      Shared Counter Service Demo
                    </h5>
                  </div>
                  <p class="text-muted mb-0 ms-5 ps-2 small">
                    This is the same counter from Products MFE. Update it here
                    and see the changes reflected everywhere!
                  </p>
                </div>
                <div class="col-md-6">
                  <div
                    class="d-flex align-items-center justify-content-md-end gap-2 flex-wrap"
                  >
                    <button
                      class="btn btn-outline-danger rounded-pill px-3"
                      (click)="decrementCounter(5)"
                      title="Decrement by 5"
                    >
                      <i class="bi bi-dash-lg me-1"></i>
                      <span class="fw-bold">5</span>
                    </button>
                    <button
                      class="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                      style="width: 40px; height: 40px;"
                      (click)="decrementCounter()"
                      title="Decrement by 1"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <div
                      class="bg-light rounded-3 px-4 py-2 border border-2 border-success mx-2"
                      style="min-width: 80px; text-align: center;"
                    >
                      <div
                        class="text-muted small mb-0"
                        style="font-size: 0.7rem;"
                      >
                        Count
                      </div>
                      <div class="text-success fw-bold fs-3">
                        {{ counter() }}
                      </div>
                    </div>
                    <button
                      class="btn btn-outline-success rounded-circle d-flex align-items-center justify-content-center"
                      style="width: 40px; height: 40px;"
                      (click)="incrementCounter()"
                      title="Increment by 1"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                    <button
                      class="btn btn-outline-success rounded-pill px-3"
                      (click)="incrementCounter(5)"
                      title="Increment by 5"
                    >
                      <i class="bi bi-plus-lg me-1"></i>
                      <span class="fw-bold">5</span>
                    </button>
                    <div class="vr mx-1"></div>
                    <button
                      class="btn btn-outline-secondary rounded-pill px-3"
                      (click)="resetCounter()"
                      title="Reset Counter"
                    >
                      <i class="bi bi-arrow-counterclockwise me-1"></i>
                      <span class="small">Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Cart Summary Cards -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Items in Cart</h6>
                <i class="bi bi-cart-fill fs-4 text-primary"></i>
              </div>
              <h2 class="card-title mb-2">8</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-info-subtle text-info me-2">
                  <i class="bi bi-box"></i>Active
                </span>
                <small class="text-muted">items</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Subtotal</h6>
                <i class="bi bi-currency-dollar fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">$2,847</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-check-circle"></i>Valid
                </span>
                <small class="text-muted">before tax</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Savings</h6>
                <i class="bi bi-piggy-bank-fill fs-4 text-warning"></i>
              </div>
              <h2 class="card-title mb-2">$342</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-warning-subtle text-warning me-2">
                  <i class="bi bi-percent"></i>12%
                </span>
                <small class="text-muted">discount</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Estimated Total</h6>
                <i class="bi bi-cash-stack fs-4 text-info"></i>
              </div>
              <h2 class="card-title mb-2">$2,505</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-info-subtle text-info me-2">
                  <i class="bi bi-calculator"></i>Final
                </span>
                <small class="text-muted">+ shipping</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="row g-4">
        <!-- Cart Items -->
        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title mb-0">Cart Items</h5>
                  <p class="text-muted small mb-0">
                    8 items ready for checkout
                  </p>
                </div>
                <button class="btn btn-outline-danger btn-sm">
                  <i class="bi bi-trash me-1"></i>Clear Cart
                </button>
              </div>
            </div>
            <div class="card-body">
              <!-- Cart Item 1 -->
              <div
                class="d-flex align-items-center border-bottom pb-3 mb-3 flex-wrap"
              >
                <div
                  class="bg-light rounded d-flex align-items-center justify-content-center me-3"
                  style="width: 80px; height: 80px; min-width: 80px"
                >
                  <i class="bi bi-laptop fs-3 text-primary"></i>
                </div>
                <div class="flex-grow-1 me-3">
                  <h6 class="mb-1">Premium Laptop Pro 15"</h6>
                  <p class="text-muted small mb-1">
                    Intel i7, 16GB RAM, 512GB SSD
                  </p>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-success-subtle text-success"
                      >In Stock</span
                    >
                  </div>
                </div>
                <div
                  class="d-flex align-items-center gap-3 flex-wrap justify-content-end"
                >
                  <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      1
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="text-end" style="min-width: 80px">
                    <div class="fw-bold">$1,299</div>
                  </div>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    title="Remove"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <!-- Cart Item 2 -->
              <div
                class="d-flex align-items-center border-bottom pb-3 mb-3 flex-wrap"
              >
                <div
                  class="bg-light rounded d-flex align-items-center justify-content-center me-3"
                  style="width: 80px; height: 80px; min-width: 80px"
                >
                  <i class="bi bi-phone fs-3 text-info"></i>
                </div>
                <div class="flex-grow-1 me-3">
                  <h6 class="mb-1">Smartphone X12 Pro</h6>
                  <p class="text-muted small mb-1">256GB Storage, 5G Enabled</p>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-warning-subtle text-warning"
                      >Low Stock</span
                    >
                  </div>
                </div>
                <div
                  class="d-flex align-items-center gap-3 flex-wrap justify-content-end"
                >
                  <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      2
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="text-end" style="min-width: 80px">
                    <div class="fw-bold">$1,798</div>
                    <small class="text-muted">$899 each</small>
                  </div>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    title="Remove"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <!-- Cart Item 3 -->
              <div class="d-flex align-items-center pb-3 flex-wrap">
                <div
                  class="bg-light rounded d-flex align-items-center justify-content-center me-3"
                  style="width: 80px; height: 80px; min-width: 80px"
                >
                  <i class="bi bi-smartwatch fs-3 text-success"></i>
                </div>
                <div class="flex-grow-1 me-3">
                  <h6 class="mb-1">Smart Watch Elite</h6>
                  <p class="text-muted small mb-1">
                    Health Tracking, GPS, Water Resistant
                  </p>
                  <div class="d-flex align-items-center gap-2">
                    <span class="badge bg-success-subtle text-success"
                      >In Stock</span
                    >
                  </div>
                </div>
                <div
                  class="d-flex align-items-center gap-3 flex-wrap justify-content-end"
                >
                  <div class="btn-group btn-group-sm" role="group">
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      5
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                  <div class="text-end" style="min-width: 80px">
                    <div class="fw-bold">$1,745</div>
                    <small class="text-muted">$349 each</small>
                  </div>
                  <button
                    class="btn btn-outline-danger btn-sm"
                    type="button"
                    title="Remove"
                  >
                    <i class="bi bi-x-lg"></i>
                  </button>
                </div>
              </div>

              <div class="alert alert-info d-flex align-items-center mt-4">
                <i class="bi bi-info-circle-fill me-2"></i>
                <small>Add $155 more to qualify for free shipping!</small>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm sticky-top" style="top: 1rem">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Subtotal (8 items)</span>
                <span class="fw-semibold">$2,847</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Discount</span>
                <span class="text-success fw-semibold">-$342</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span class="text-muted">Shipping</span>
                <span class="fw-semibold">$0</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="text-muted">Tax (estimated)</span>
                <span class="fw-semibold">$0</span>
              </div>
              <hr />
              <div class="d-flex justify-content-between mb-3">
                <span class="h5 mb-0">Total</span>
                <span class="h5 mb-0 text-primary">$2,505</span>
              </div>

              <div class="d-grid gap-2 mb-3">
                <button class="btn btn-primary btn-lg">
                  <i class="bi bi-lock-fill me-2"></i>Proceed to Checkout
                </button>
                <button class="btn btn-outline-primary">
                  <i class="bi bi-arrow-left me-2"></i>Continue Shopping
                </button>
              </div>

              <div class="mt-3">
                <h6 class="mb-2">Apply Coupon</h6>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Enter code"
                  />
                  <button class="btn btn-outline-secondary" type="button">
                    Apply
                  </button>
                </div>
              </div>

              <div class="mt-3">
                <small class="text-muted">
                  <i class="bi bi-shield-check me-1"></i>Secure checkout with
                  SSL encryption
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Products -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">You Might Also Like</h5>
              <p class="text-muted small mb-0">Based on items in your cart</p>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-6 col-md-3">
                  <div class="card h-100 border">
                    <div class="card-body text-center">
                      <i class="bi bi-headphones fs-1 text-primary mb-2"></i>
                      <h6 class="mb-1">Wireless Headphones</h6>
                      <p class="text-muted small mb-2">$199</p>
                      <button class="btn btn-sm btn-outline-primary w-100">
                        <i class="bi bi-cart-plus me-1"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="card h-100 border">
                    <div class="card-body text-center">
                      <i class="bi bi-keyboard fs-1 text-success mb-2"></i>
                      <h6 class="mb-1">Mechanical Keyboard</h6>
                      <p class="text-muted small mb-2">$149</p>
                      <button class="btn btn-sm btn-outline-primary w-100">
                        <i class="bi bi-cart-plus me-1"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="card h-100 border">
                    <div class="card-body text-center">
                      <i class="bi bi-mouse fs-1 text-info mb-2"></i>
                      <h6 class="mb-1">Wireless Mouse</h6>
                      <p class="text-muted small mb-2">$79</p>
                      <button class="btn btn-sm btn-outline-primary w-100">
                        <i class="bi bi-cart-plus me-1"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
                <div class="col-6 col-md-3">
                  <div class="card h-100 border">
                    <div class="card-body text-center">
                      <i class="bi bi-usb-drive fs-1 text-warning mb-2"></i>
                      <h6 class="mb-1">USB-C Hub</h6>
                      <p class="text-muted small mb-2">$59</p>
                      <button class="btn btn-sm btn-outline-primary w-100">
                        <i class="bi bi-cart-plus me-1"></i>Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .bg-gradient-success {
      background: linear-gradient(135deg, #f8f9fa 0%, #e7f5ee 100%);
    }

    @media (max-width: 768px) {
      .sticky-top {
        position: relative !important;
      }
    }
  `,
})
export class RemoteEntry {
  protected counterService = inject(CounterService);
  // Use computed to ensure reactivity across MFE boundaries
  counter = this.counterService.counter;

  incrementCounter(amount = 1): void {
    this.counterService.increment(amount);
  }

  decrementCounter(amount = 1): void {
    this.counterService.decrement(amount);
  }

  resetCounter(): void {
    this.counterService.reset();
  }
}
