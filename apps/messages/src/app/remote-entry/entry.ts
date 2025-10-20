import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-messages-entry',
  template: `
    <div class="container-fluid py-4">
      <div class="row mb-4">
        <div class="col-12">
          <h1 class="display-4 mb-3">
            <i class="bi bi-chat-dots me-2"></i>Messages
          </h1>
          <p class="lead text-muted">
            Communicate with your team and customers
          </p>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="row g-4 mb-4">
        <div class="col-12 col-sm-6 col-lg-3">
          <div class="card border-0 shadow-sm h-100">
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-start mb-2"
              >
                <h6 class="card-subtitle text-muted mb-0">Total Messages</h6>
                <i class="bi bi-envelope-fill fs-4 text-primary"></i>
              </div>
              <h2 class="card-title mb-2">1,847</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-primary-subtle text-primary me-2">
                  <i class="bi bi-inbox"></i>All Time
                </span>
                <small class="text-muted">messages</small>
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
                <h6 class="card-subtitle text-muted mb-0">Unread</h6>
                <i
                  class="bi bi-envelope-exclamation-fill fs-4 text-warning"
                ></i>
              </div>
              <h2 class="card-title mb-2">23</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-warning-subtle text-warning me-2">
                  <i class="bi bi-exclamation-circle"></i>Pending
                </span>
                <small class="text-muted">new messages</small>
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
                <h6 class="card-subtitle text-muted mb-0">Active Chats</h6>
                <i class="bi bi-chat-left-text-fill fs-4 text-success"></i>
              </div>
              <h2 class="card-title mb-2">12</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-success-subtle text-success me-2">
                  <i class="bi bi-circle-fill" style="font-size: 0.5rem"></i
                  >Online
                </span>
                <small class="text-muted">conversations</small>
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
                <h6 class="card-subtitle text-muted mb-0">Avg Response</h6>
                <i class="bi bi-speedometer2 fs-4 text-info"></i>
              </div>
              <h2 class="card-title mb-2">2.5m</h2>
              <div class="d-flex align-items-center">
                <span class="badge bg-info-subtle text-info me-2">
                  <i class="bi bi-clock"></i>Fast
                </span>
                <small class="text-muted">response time</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Messages Layout -->
      <div class="row g-4">
        <!-- Conversations List -->
        <div class="col-12 col-lg-4">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-transparent border-0 pt-3">
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <h5 class="card-title mb-0">Conversations</h5>
                <button class="btn btn-primary btn-sm">
                  <i class="bi bi-plus-lg"></i>
                </button>
              </div>
              <div class="input-group input-group-sm">
                <span class="input-group-text border-end-0 bg-transparent">
                  <i class="bi bi-search"></i>
                </span>
                <input
                  type="text"
                  class="form-control border-start-0"
                  placeholder="Search messages..."
                />
              </div>
            </div>
            <div
              class="card-body p-0"
              style="max-height: 600px; overflow-y: auto"
            >
              <!-- Conversation 1 - Active with unread -->
              <div class="list-group list-group-flush">
                <a
                  href="#"
                  class="list-group-item list-group-item-action border-start border-primary border-4 active"
                >
                  <div class="d-flex align-items-start">
                    <div class="position-relative">
                      <div
                        class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 48px; height: 48px; min-width: 48px"
                      >
                        JD
                      </div>
                      <span
                        class="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
                        style="width: 12px; height: 12px"
                      ></span>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex justify-content-between align-items-start"
                      >
                        <h6 class="mb-1">John Doe</h6>
                        <small class="text-muted">2m</small>
                      </div>
                      <p class="mb-1 text-truncate small">
                        Hey, when will my order arrive?
                      </p>
                      <span class="badge bg-primary rounded-pill">3</span>
                    </div>
                  </div>
                </a>

                <!-- Conversation 2 -->
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex align-items-start">
                    <div class="position-relative">
                      <div
                        class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 48px; height: 48px; min-width: 48px"
                      >
                        JS
                      </div>
                      <span
                        class="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
                        style="width: 12px; height: 12px"
                      ></span>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex justify-content-between align-items-start"
                      >
                        <h6 class="mb-1">Jane Smith</h6>
                        <small class="text-muted">15m</small>
                      </div>
                      <p class="mb-0 text-truncate small text-muted">
                        Thanks for the quick response!
                      </p>
                    </div>
                  </div>
                </a>

                <!-- Conversation 3 -->
                <a
                  href="#"
                  class="list-group-item list-group-item-action border-start border-warning border-4"
                >
                  <div class="d-flex align-items-start">
                    <div class="position-relative">
                      <div
                        class="bg-info text-white rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 48px; height: 48px; min-width: 48px"
                      >
                        MJ
                      </div>
                      <span
                        class="position-absolute bottom-0 end-0 bg-secondary border border-2 border-white rounded-circle"
                        style="width: 12px; height: 12px"
                      ></span>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex justify-content-between align-items-start"
                      >
                        <h6 class="mb-1">Mike Johnson</h6>
                        <small class="text-muted">1h</small>
                      </div>
                      <p class="mb-1 text-truncate small">
                        I need help with my payment
                      </p>
                      <span class="badge bg-warning rounded-pill">1</span>
                    </div>
                  </div>
                </a>

                <!-- Conversation 4 -->
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex align-items-start">
                    <div class="position-relative">
                      <div
                        class="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 48px; height: 48px; min-width: 48px"
                      >
                        SW
                      </div>
                      <span
                        class="position-absolute bottom-0 end-0 bg-secondary border border-2 border-white rounded-circle"
                        style="width: 12px; height: 12px"
                      ></span>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex justify-content-between align-items-start"
                      >
                        <h6 class="mb-1">Sarah Williams</h6>
                        <small class="text-muted">3h</small>
                      </div>
                      <p class="mb-0 text-truncate small text-muted">
                        Great! I'll wait for the update.
                      </p>
                    </div>
                  </div>
                </a>

                <!-- Conversation 5 -->
                <a href="#" class="list-group-item list-group-item-action">
                  <div class="d-flex align-items-start">
                    <div class="position-relative">
                      <div
                        class="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
                        style="width: 48px; height: 48px; min-width: 48px"
                      >
                        DB
                      </div>
                      <span
                        class="position-absolute bottom-0 end-0 bg-secondary border border-2 border-white rounded-circle"
                        style="width: 12px; height: 12px"
                      ></span>
                    </div>
                    <div class="flex-grow-1 ms-3">
                      <div
                        class="d-flex justify-content-between align-items-start"
                      >
                        <h6 class="mb-1">David Brown</h6>
                        <small class="text-muted">Yesterday</small>
                      </div>
                      <p class="mb-0 text-truncate small text-muted">
                        Can you send me the invoice?
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Thread -->
        <div class="col-12 col-lg-8">
          <div class="card border-0 shadow-sm h-100">
            <!-- Chat Header -->
            <div class="card-header bg-transparent border-0 pt-3">
              <div class="d-flex justify-content-between align-items-center">
                <div class="d-flex align-items-center">
                  <div class="position-relative">
                    <div
                      class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                      style="width: 48px; height: 48px"
                    >
                      JD
                    </div>
                    <span
                      class="position-absolute bottom-0 end-0 bg-success border border-2 border-white rounded-circle"
                      style="width: 12px; height: 12px"
                    ></span>
                  </div>
                  <div class="ms-3">
                    <h5 class="mb-0">John Doe</h5>
                    <small class="text-success">
                      <i
                        class="bi bi-circle-fill"
                        style="font-size: 0.5rem"
                      ></i>
                      Online
                    </small>
                  </div>
                </div>
                <div class="btn-group">
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-telephone"></i>
                  </button>
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-camera-video"></i>
                  </button>
                  <button class="btn btn-outline-secondary btn-sm">
                    <i class="bi bi-three-dots-vertical"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages Area -->
            <div
              class="card-body"
              style="max-height: 450px; overflow-y: auto; background-color: #f8f9fa"
            >
              <!-- Received Message -->
              <div class="d-flex mb-3">
                <div
                  class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style="width: 32px; height: 32px; min-width: 32px"
                >
                  JD
                </div>
                <div>
                  <div class="bg-white rounded p-3 shadow-sm">
                    <p class="mb-0">
                      Hi! I placed an order yesterday. Can you tell me when it
                      will arrive?
                    </p>
                  </div>
                  <small class="text-muted ms-2">10:30 AM</small>
                </div>
              </div>

              <!-- Sent Message -->
              <div class="d-flex mb-3 justify-content-end">
                <div class="text-end">
                  <div class="bg-primary text-white rounded p-3 shadow-sm">
                    <p class="mb-0">
                      Hello! Let me check that for you right away.
                    </p>
                  </div>
                  <small class="text-muted me-2">10:31 AM</small>
                </div>
              </div>

              <!-- Sent Message -->
              <div class="d-flex mb-3 justify-content-end">
                <div class="text-end">
                  <div class="bg-primary text-white rounded p-3 shadow-sm">
                    <p class="mb-0">
                      Your order #ORD-2024-1245 is currently in transit and
                      should arrive by October 23rd, 2025.
                    </p>
                  </div>
                  <small class="text-muted me-2">10:32 AM</small>
                </div>
              </div>

              <!-- Received Message -->
              <div class="d-flex mb-3">
                <div
                  class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style="width: 32px; height: 32px; min-width: 32px"
                >
                  JD
                </div>
                <div>
                  <div class="bg-white rounded p-3 shadow-sm">
                    <p class="mb-0">Perfect! Thanks for the quick response!</p>
                  </div>
                  <small class="text-muted ms-2">10:33 AM</small>
                </div>
              </div>

              <!-- Typing Indicator -->
              <div class="d-flex mb-3">
                <div
                  class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style="width: 32px; height: 32px; min-width: 32px"
                >
                  JD
                </div>
                <div>
                  <div class="bg-white rounded p-3 shadow-sm">
                    <div class="typing-indicator">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Message Input -->
            <div class="card-footer bg-transparent border-0">
              <div class="input-group">
                <button class="btn btn-outline-secondary" type="button">
                  <i class="bi bi-paperclip"></i>
                </button>
                <button class="btn btn-outline-secondary" type="button">
                  <i class="bi bi-emoji-smile"></i>
                </button>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Type a message..."
                />
                <button class="btn btn-primary" type="button">
                  <i class="bi bi-send-fill"></i>
                </button>
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

    .list-group-item.active {
      background-color: #e7f1ff;
      border-color: transparent;
      color: inherit;
    }

    .list-group-item:hover {
      background-color: #f8f9fa;
    }

    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .typing-indicator span {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: #6c757d;
      animation: typing 1.4s infinite;
    }

    .typing-indicator span:nth-child(2) {
      animation-delay: 0.2s;
    }

    .typing-indicator span:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes typing {
      0%, 60%, 100% {
        transform: translateY(0);
        opacity: 0.7;
      }
      30% {
        transform: translateY(-10px);
        opacity: 1;
      }
    }
  `,
})
export class RemoteEntry {}
