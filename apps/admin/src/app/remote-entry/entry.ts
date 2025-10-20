import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-admin-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-shield-lock me-2"></i>Admin Dashboard
          </h1>
          <p class="lead text-muted">
            Manage your platform, users, and system settings
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
              <h2 class="card-title mb-2">45,782</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>14.2%
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
                <h6 class="card-subtitle text-muted mb-0">Active Sessions</h6>
                <i class="bi bi-activity fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">3,247</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-circle-fill" style="font-size: 0.5rem"></i
                  >Live
                </span>
                <small class="text-muted">online now</small>
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
                <h6 class="card-subtitle text-muted mb-0">Total Revenue</h6>
                <i class="bi bi-currency-dollar fs-4 text-info"></i>
              </div>
              <h2 class="card-title mb-2">$842K</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>28.5%
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
                <h6 class="card-subtitle text-muted mb-0">System Health</h6>
                <i class="bi bi-heart-pulse-fill fs-4 text-danger"></i>
              </div>
              <h2 class="card-title mb-2">98.5%</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-check-circle"></i>Healthy
                </span>
                <small class="text-muted">uptime</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Charts and Quick Actions -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Platform Statistics</h5>
              <p class="text-muted small mb-0">
                Overview of key metrics over time
              </p>
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
              <h5 class="card-title mb-0">Quick Actions</h5>
              <p class="text-muted small mb-0">Common administrative tasks</p>
            </div>
            <div class="card-body">
              <div class="d-grid gap-2">
                <button class="btn btn-outline-primary btn-lg text-start">
                  <i class="bi bi-person-plus me-2"></i>Add New User
                </button>
                <button class="btn btn-outline-success btn-lg text-start">
                  <i class="bi bi-box-seam me-2"></i>Manage Products
                </button>
                <button class="btn btn-outline-info btn-lg text-start">
                  <i class="bi bi-gear me-2"></i>System Settings
                </button>
                <button class="btn btn-outline-warning btn-lg text-start">
                  <i class="bi bi-file-earmark-text me-2"></i>View Reports
                </button>
                <button class="btn btn-outline-danger btn-lg text-start">
                  <i class="bi bi-shield-exclamation me-2"></i>Security Logs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity Table -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title mb-0">Recent Admin Activity</h5>
                  <p class="text-muted small mb-0">
                    Latest system changes and user actions
                  </p>
                </div>
                <button class="btn btn-outline-primary btn-sm">
                  <i class="bi bi-filter me-1"></i>Filter
                </button>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Timestamp</th>
                      <th class="border-0">User</th>
                      <th class="border-0">Action</th>
                      <th class="border-0">Module</th>
                      <th class="border-0 text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <small class="text-muted">2 minutes ago</small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            AD
                          </div>
                          <span class="fw-semibold">Admin User</span>
                        </div>
                      </td>
                      <td>Created new user account</td>
                      <td>
                        <span class="badge bg-primary-subtle text-primary"
                          >Users</span
                        >
                      </td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          ><i class="bi bi-check-circle me-1"></i>Success</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small class="text-muted">15 minutes ago</small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            JD
                          </div>
                          <span class="fw-semibold">John Doe</span>
                        </div>
                      </td>
                      <td>Updated product pricing</td>
                      <td>
                        <span class="badge bg-info-subtle text-info"
                          >Products</span
                        >
                      </td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          ><i class="bi bi-check-circle me-1"></i>Success</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small class="text-muted">1 hour ago</small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            SY
                          </div>
                          <span class="fw-semibold">System</span>
                        </div>
                      </td>
                      <td>Database backup completed</td>
                      <td>
                        <span class="badge bg-success-subtle text-success"
                          >System</span
                        >
                      </td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          ><i class="bi bi-check-circle me-1"></i>Success</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small class="text-muted">2 hours ago</small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            JS
                          </div>
                          <span class="fw-semibold">Jane Smith</span>
                        </div>
                      </td>
                      <td>Modified system settings</td>
                      <td>
                        <span class="badge bg-warning-subtle text-warning"
                          >Settings</span
                        >
                      </td>
                      <td class="text-end">
                        <span class="badge bg-warning-subtle text-warning"
                          ><i class="bi bi-exclamation-triangle me-1"></i
                          >Warning</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <small class="text-muted">3 hours ago</small>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            MJ
                          </div>
                          <span class="fw-semibold">Mike Johnson</span>
                        </div>
                      </td>
                      <td>Failed login attempt detected</td>
                      <td>
                        <span class="badge bg-danger-subtle text-danger"
                          >Security</span
                        >
                      </td>
                      <td class="text-end">
                        <span class="badge bg-danger-subtle text-danger"
                          ><i class="bi bi-x-circle me-1"></i>Failed</span
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
