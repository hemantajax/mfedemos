import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-analytics-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-graph-up-arrow me-2"></i>Analytics Dashboard
          </h1>
          <p class="lead text-muted">
            Monitor your business metrics and insights in real-time
          </p>
        </div>
      </div>

      <!-- Key Metrics Cards -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Total Users</h6>
                <i class="bi bi-people-fill fs-4 text-primary"></i>
              </div>
              <h2 class="card-title mb-2">24,532</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>12.5%
                </span>
                <small class="text-muted">vs last month</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Revenue</h6>
                <i class="bi bi-currency-dollar fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">$89,432</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>8.3%
                </span>
                <small class="text-muted">vs last month</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Orders</h6>
                <i class="bi bi-cart-fill fs-4 text-info"></i>
              </div>
              <h2 class="card-title mb-2">3,247</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>15.7%
                </span>
                <small class="text-muted">vs last month</small>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Conversion Rate</h6>
                <i class="bi bi-graph-up fs-4 text-warning"></i>
              </div>
              <h2 class="card-title mb-2">3.24%</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-danger-subtle text-danger me-2">
                  <i class="bi bi-arrow-down-short"></i>2.1%
                </span>
                <small class="text-muted">vs last month</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Revenue Trends</h5>
              <p class="text-muted small mb-0">Last 12 months performance</p>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center justify-content-center"
                style="min-height: 300px"
              >
                <div class="text-center text-muted">
                  <i class="bi bi-bar-chart fs-1 mb-3 d-block"></i>
                  <p>Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Traffic Sources</h5>
              <p class="text-muted small mb-0">Where your visitors come from</p>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Organic Search</span>
                  <span class="fw-semibold">42%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    style="width: 42%"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Direct</span>
                  <span class="fw-semibold">28%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style="width: 28%"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Social Media</span>
                  <span class="fw-semibold">18%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style="width: 18%"
                  ></div>
                </div>
              </div>
              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Referral</span>
                  <span class="fw-semibold">12%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 12%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Recent Activity</h5>
              <p class="text-muted small mb-0">Latest user interactions</p>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Event</th>
                      <th class="border-0">User</th>
                      <th class="border-0">Location</th>
                      <th class="border-0">Time</th>
                      <th class="border-0 text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i class="bi bi-cart-check text-success me-2"></i>
                        Purchase Completed
                      </td>
                      <td>John Doe</td>
                      <td>New York, USA</td>
                      <td>2 minutes ago</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          >Success</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-person-plus text-primary me-2"></i>
                        New User Signup
                      </td>
                      <td>Jane Smith</td>
                      <td>London, UK</td>
                      <td>5 minutes ago</td>
                      <td class="text-end">
                        <span class="badge bg-info-subtle text-info"
                          >Completed</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-eye text-info me-2"></i>
                        Product Viewed
                      </td>
                      <td>Mike Johnson</td>
                      <td>Toronto, Canada</td>
                      <td>8 minutes ago</td>
                      <td class="text-end">
                        <span class="badge bg-secondary-subtle text-secondary"
                          >Active</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-cart-x text-warning me-2"></i>
                        Cart Abandoned
                      </td>
                      <td>Sarah Williams</td>
                      <td>Sydney, Australia</td>
                      <td>12 minutes ago</td>
                      <td class="text-end">
                        <span class="badge bg-warning-subtle text-warning"
                          >Pending</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-chat-dots text-primary me-2"></i>
                        Support Ticket
                      </td>
                      <td>David Brown</td>
                      <td>Berlin, Germany</td>
                      <td>15 minutes ago</td>
                      <td class="text-end">
                        <span class="badge bg-primary-subtle text-primary"
                          >Open</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
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
  `,
})
export class RemoteEntry {}
