import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-products-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-box-seam me-2"></i>Products Dashboard
          </h1>
          <p class="lead text-muted">
            Manage and monitor your product inventory and performance
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
                <h6 class="card-subtitle text-muted mb-0">Total Products</h6>
                <i class="bi bi-box-seam-fill fs-4 text-primary"></i>
              </div>
              <h2 class="card-title mb-2">1,847</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>7.2%
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
                <h6 class="card-subtitle text-muted mb-0">In Stock</h6>
                <i class="bi bi-check-circle-fill fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">1,632</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-arrow-up-short"></i>3.5%
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
                <h6 class="card-subtitle text-muted mb-0">Low Stock</h6>
                <i
                  class="bi bi-exclamation-triangle-fill fs-4 text-warning"
                ></i>
              </div>
              <h2 class="card-title mb-2">156</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-warning-subtle text-warning me-2">
                  <i class="bi bi-arrow-up-short"></i>5.1%
                </span>
                <small class="text-muted">needs attention</small>
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
                <h6 class="card-subtitle text-muted mb-0">Out of Stock</h6>
                <i class="bi bi-x-circle-fill fs-4 text-danger"></i>
              </div>
              <h2 class="card-title mb-2">59</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-danger-subtle text-danger me-2">
                  <i class="bi bi-arrow-down-short"></i>2.3%
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
              <h5 class="card-title mb-0">Product Sales Performance</h5>
              <p class="text-muted small mb-0">
                Top performing products last 30 days
              </p>
            </div>
            <div class="card-body">
              <div
                class="d-flex align-items-center justify-content-center"
                style="min-height: 300px"
              >
                <div class="text-center text-muted">
                  <i class="bi bi-bar-chart-line fs-1 mb-3 d-block"></i>
                  <p>Chart visualization will be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Category Distribution</h5>
              <p class="text-muted small mb-0">Products by category</p>
            </div>
            <div class="card-body">
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Electronics</span>
                  <span class="fw-semibold">35%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-primary"
                    role="progressbar"
                    style="width: 35%"
                  ></div>
                </div>
              </div>
              <div class="mb-3">
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Clothing</span>
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
                  <span class="text-muted">Home & Garden</span>
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
              <div>
                <div class="d-flex justify-content-between mb-2">
                  <span class="text-muted">Others</span>
                  <span class="fw-semibold">17%</span>
                </div>
                <div class="progress" style="height: 8px">
                  <div
                    class="progress-bar bg-warning"
                    role="progressbar"
                    style="width: 17%"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Products -->
      <div class="row">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <h5 class="card-title mb-0">Recent Products</h5>
              <p class="text-muted small mb-0">Latest added products</p>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                  <thead class="table-light">
                    <tr>
                      <th class="border-0">Product</th>
                      <th class="border-0">Category</th>
                      <th class="border-0">Price</th>
                      <th class="border-0">Stock</th>
                      <th class="border-0 text-end">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <i class="bi bi-laptop text-primary me-2"></i>
                        Premium Laptop Pro
                      </td>
                      <td>Electronics</td>
                      <td>$1,299</td>
                      <td>45 units</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          >In Stock</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-phone text-info me-2"></i>
                        Smartphone X12
                      </td>
                      <td>Electronics</td>
                      <td>$899</td>
                      <td>12 units</td>
                      <td class="text-end">
                        <span class="badge bg-warning-subtle text-warning"
                          >Low Stock</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-smartwatch text-success me-2"></i>
                        Smart Watch Elite
                      </td>
                      <td>Electronics</td>
                      <td>$349</td>
                      <td>78 units</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          >In Stock</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-headphones text-warning me-2"></i>
                        Wireless Headphones
                      </td>
                      <td>Electronics</td>
                      <td>$199</td>
                      <td>0 units</td>
                      <td class="text-end">
                        <span class="badge bg-danger-subtle text-danger"
                          >Out of Stock</span
                        >
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <i class="bi bi-camera text-primary me-2"></i>
                        Digital Camera 4K
                      </td>
                      <td>Electronics</td>
                      <td>$749</td>
                      <td>23 units</td>
                      <td class="text-end">
                        <span class="badge bg-success-subtle text-success"
                          >In Stock</span
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
