import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-orders-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-bag-check me-2"></i>Orders Dashboard
          </h1>
          <p class="lead text-muted">
            Track and manage all your customer orders
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
                <h6 class="card-subtitle text-muted mb-0">Total Orders</h6>
                <i class="bi bi-receipt-cutoff fs-4 text-primary"></i>
              </div>
              <h2 class="card-title mb-2">3,247</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>18.5%
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
                <h6 class="card-subtitle text-muted mb-0">Pending</h6>
                <i class="bi bi-clock-history fs-4 text-warning"></i>
              </div>
              <h2 class="card-title mb-2">248</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-warning-subtle text-warning me-2">
                  <i class="bi bi-hourglass-split"></i>Processing
                </span>
                <small class="text-muted">needs action</small>
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
                <h6 class="card-subtitle text-muted mb-0">Completed</h6>
                <i class="bi bi-check-circle-fill fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">2,876</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-check-all"></i>88.6%
                </span>
                <small class="text-muted">completion rate</small>
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
                <i class="bi bi-currency-dollar fs-4 text-info"></i>
              </div>
              <h2 class="card-title mb-2">$284K</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>22.1%
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
              <h5 class="card-title mb-0">Order Trends</h5>
              <p class="text-muted small mb-0">Orders over the last 30 days</p>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center justify-content-center"
                style="min-height: 300px"
              >
                <div class="text-center text-muted">
                  <i class="bi bi-graph-up fs-1 mb-3 d-block"></i>
                  <p>Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Order Status</h5>
              <p class="text-muted small mb-0">Current distribution</p>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Delivered</span>
                  <span class="fw-semibold">65%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style="width: 65%"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">In Transit</span>
                  <span class="fw-semibold">20%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style="width: 20%"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Processing</span>
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
              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Cancelled</span>
                  <span class="fw-semibold">3%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-danger"
                    role="progressbar"
                    style="width: 3%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Table -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h5 class="card-title mb-0">Recent Orders</h5>
                  <p class="text-muted small mb-0">Latest customer orders</p>
                </div>
                <div class="btn-group" role="group">
                  <button class="btn btn-outline-primary btn-sm active">
                    All
                  </button>
                  <button class="btn btn-outline-primary btn-sm">
                    Pending
                  </button>
                  <button class="btn btn-outline-primary btn-sm">
                    Completed
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Order ID</th>
                      <th class="border-0">Customer</th>
                      <th class="border-0">Date</th>
                      <th class="border-0">Items</th>
                      <th class="border-0">Total</th>
                      <th class="border-0 text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <span class="fw-semibold">#ORD-2024-1245</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            JD
                          </div>
                          <div>
                            <div class="fw-semibold">John Doe</div>
                            <small class="text-muted">john@example.com</small>
                          </div>
                        </div>
                      </td>
                      <td>Oct 20, 2025</td>
                      <td>3 items</td>
                      <td class="fw-semibold">$1,247.00</td>
                      <td class="text-end">
                        <span class="badge bg-info-subtle text-info"
                          ><i class="bi bi-truck me-1"></i>In Transit</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="fw-semibold">#ORD-2024-1244</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            JS
                          </div>
                          <div>
                            <div class="fw-semibold">Jane Smith</div>
                            <small class="text-muted">jane@example.com</small>
                          </div>
                        </div>
                      </td>
                      <td>Oct 19, 2025</td>
                      <td>5 items</td>
                      <td class="fw-semibold">$899.00</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          ><i class="bi bi-check-circle me-1"></i
                          >Delivered</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="fw-semibold">#ORD-2024-1243</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            MJ
                          </div>
                          <div>
                            <div class="fw-semibold">Mike Johnson</div>
                            <small class="text-muted">mike@example.com</small>
                          </div>
                        </div>
                      </td>
                      <td>Oct 19, 2025</td>
                      <td>2 items</td>
                      <td class="fw-semibold">$549.00</td>
                      <td class="text-end">
                        <span class="badge bg-warning-subtle text-warning"
                          ><i class="bi bi-hourglass-split me-1"></i
                          >Processing</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="fw-semibold">#ORD-2024-1242</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            SW
                          </div>
                          <div>
                            <div class="fw-semibold">Sarah Williams</div>
                            <small class="text-muted">sarah@example.com</small>
                          </div>
                        </div>
                      </td>
                      <td>Oct 18, 2025</td>
                      <td>1 item</td>
                      <td class="fw-semibold">$349.00</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          ><i class="bi bi-check-circle me-1"></i
                          >Delivered</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="fw-semibold">#ORD-2024-1241</span>
                      </td>
                      <td>
                        <div class="d-flex align-items-center">
                          <div
                            class="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style="width: 32px; height: 32px"
                          >
                            DB
                          </div>
                          <div>
                            <div class="fw-semibold">David Brown</div>
                            <small class="text-muted">david@example.com</small>
                          </div>
                        </div>
                      </td>
                      <td>Oct 18, 2025</td>
                      <td>4 items</td>
                      <td class="fw-semibold">$1,099.00</td>
                      <td class="text-end">
                        <span class="badge bg-danger-subtle text-danger"
                          ><i class="bi bi-x-circle me-1"></i>Cancelled</span
                        >
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mt-3"
              >
                <small class="text-muted">Showing 5 of 3,247 orders</small>
                <nav>
                  <ul class="pagination pagination-sm mb-0">
                    <li class="page-item disabled">
                      <a class="page-link" href="#">Previous</a>
                    </li>
                    <li class="page-item active">
                      <a class="page-link" href="#">1</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">2</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">3</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">Next</a>
                    </li>
                  </ul>
                </nav>
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
