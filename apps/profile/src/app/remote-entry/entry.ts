import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-profile-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-person-circle me-2"></i>User Profile
          </h1>
          <p class="lead text-muted">
            Manage your personal information and preferences
          </p>
        </div>
      </div>

      <!-- Profile Overview -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm">
            <div class="card-body text-center">
              <div
                class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                style="width: 120px; height: 120px"
              >
                <i class="bi bi-person-fill" style="font-size: 4rem"></i>
              </div>
              <h4 class="mb-1">John Doe</h4>
              <p class="text-muted mb-3">john.doe@example.com</p>
              <div class="d-flex gap-2 justify-content-center mb-3">
                <span class="badge bg-success-subtle text-success">
                  <i class="bi bi-check-circle me-1"></i>Verified
                </span>
                <span class="badge bg-primary-subtle text-primary">
                  <i class="bi bi-star-fill me-1"></i>Premium
                </span>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary">
                  <i class="bi bi-pencil me-2"></i>Edit Profile
                </button>
                <button class="btn btn-outline-secondary">
                  <i class="bi bi-upload me-2"></i>Change Photo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Personal Information</h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label text-muted small">First Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value="John"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted small">Last Name</label>
                  <input
                    type="text"
                    class="form-control"
                    value="Doe"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted small"
                    >Email Address</label
                  >
                  <input
                    type="email"
                    class="form-control"
                    value="john.doe@example.com"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted small"
                    >Phone Number</label
                  >
                  <input
                    type="tel"
                    class="form-control"
                    value="+1 (555) 123-4567"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted small"
                    >Date of Birth</label
                  >
                  <input
                    type="date"
                    class="form-control"
                    value="1990-01-15"
                    readonly
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label text-muted small">Location</label>
                  <input
                    type="text"
                    class="form-control"
                    value="New York, USA"
                    readonly
                  />
                </div>
                <div class="col-12">
                  <label class="form-label text-muted small">Bio</label>
                  <textarea class="form-control" rows="3" readonly>
Software developer passionate about creating amazing user experiences. Love coding, coffee, and contributing to open source projects.</textarea
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Stats -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <i class="bi bi-bag-check-fill fs-1 text-primary mb-3"></i>
              <h3 class="mb-1">142</h3>
              <p class="text-muted mb-0">Total Orders</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <i class="bi bi-heart-fill fs-1 text-danger mb-3"></i>
              <h3 class="mb-1">87</h3>
              <p class="text-muted mb-0">Wishlist Items</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <i class="bi bi-star-fill fs-1 text-warning mb-3"></i>
              <h3 class="mb-1">53</h3>
              <p class="text-muted mb-0">Reviews Written</p>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body text-center">
              <i class="bi bi-trophy-fill fs-1 text-success mb-3"></i>
              <h3 class="mb-1">Gold</h3>
              <p class="text-muted mb-0">Membership Level</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders and Settings -->
      <div class="row g-4">
        <div class="col-12 col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title mb-0">Recent Orders</h5>
                  <p class="text-muted small mb-0">Your latest purchases</p>
                </div>
                <a href="#" class="btn btn-sm btn-outline-primary">View All</a>
              </div>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <div class="list-group-item px-0">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">Order #ORD-2024-1245</h6>
                      <small class="text-muted">Oct 20, 2025 • 3 items</small>
                    </div>
                    <div class="text-end">
                      <div class="fw-semibold mb-1">$1,247.00</div>
                      <span class="badge bg-info-subtle text-info"
                        >In Transit</span
                      >
                    </div>
                  </div>
                </div>
                <div class="list-group-item px-0">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">Order #ORD-2024-1198</h6>
                      <small class="text-muted">Oct 15, 2025 • 2 items</small>
                    </div>
                    <div class="text-end">
                      <div class="fw-semibold mb-1">$549.00</div>
                      <span class="badge bg-success-subtle text-success"
                        >Delivered</span
                      >
                    </div>
                  </div>
                </div>
                <div class="list-group-item px-0">
                  <div class="d-flex justify-content-between align-items-start">
                    <div>
                      <h6 class="mb-1">Order #ORD-2024-1143</h6>
                      <small class="text-muted">Oct 08, 2025 • 1 item</small>
                    </div>
                    <div class="text-end">
                      <div class="fw-semibold mb-1">$349.00</div>
                      <span class="badge bg-success-subtle text-success"
                        >Delivered</span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-6">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Account Settings</h5>
              <p class="text-muted small mb-0">Manage your preferences</p>
            </div>
            <div class="card-body">
              <div class="list-group list-group-flush">
                <a
                  href="#"
                  class="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i class="bi bi-shield-lock me-2 text-primary"></i>
                    <span>Security & Privacy</span>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i class="bi bi-bell me-2 text-warning"></i>
                    <span>Notifications</span>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i class="bi bi-credit-card me-2 text-success"></i>
                    <span>Payment Methods</span>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i class="bi bi-geo-alt me-2 text-info"></i>
                    <span>Addresses</span>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </a>
                <a
                  href="#"
                  class="list-group-item list-group-item-action px-0 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <i class="bi bi-palette me-2 text-danger"></i>
                    <span>Appearance</span>
                  </div>
                  <i class="bi bi-chevron-right text-muted"></i>
                </a>
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

    .list-group-item {
      border-left: 0;
      border-right: 0;
    }

    .list-group-item:first-child {
      border-top: 0;
    }

    .list-group-item:last-child {
      border-bottom: 0;
    }
  `,
})
export class RemoteEntry {}
