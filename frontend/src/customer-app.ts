import type { Customer, CustomerCreate, CustomerUpdate } from './types';
import { CustomerAPI } from './api';

export class CustomerApp {
  private customers: Customer[] = [];
  private currentView: 'list' | 'create' | 'edit' | 'detail' = 'list';
  private selectedCustomer: Customer | null = null;

  init() {
    this.renderLayout();
    this.loadCustomers();
  }

  private renderLayout() {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = `
      <div class="customer-app">
        <header>
          <h1>Customer Management System</h1>
          <button id="create-customer-btn" class="btn btn-primary">Add New Customer</button>
        </header>
        <main id="main-content">
          <!-- Dynamic content will be rendered here -->
        </main>
      </div>
    `;

    // Add event listeners
    document.getElementById('create-customer-btn')!.addEventListener('click', () => {
      this.showCreateForm();
    });
  }

  private async loadCustomers() {
    try {
      this.customers = await CustomerAPI.getCustomers();
      this.renderCustomerList();
    } catch (error) {
      this.showError('Failed to load customers. Please make sure the backend is running on http://localhost:8000');
    }
  }

  private renderCustomerList() {
    this.currentView = 'list';
    const content = document.getElementById('main-content')!;
    
    if (this.customers.length === 0) {
      content.innerHTML = `
        <div class="empty-state">
          <h2>No customers found</h2>
          <p>Start by adding your first customer!</p>
        </div>
      `;
      return;
    }

    content.innerHTML = `
      <div class="customer-list">
        <h2>Customers (${this.customers.length})</h2>
        <div class="customer-grid">
          ${this.customers.map(customer => `
            <div class="customer-card" data-id="${customer.id}">
              <h3>${this.escapeHtml(customer.name)}</h3>
              <p><strong>Email:</strong> ${this.escapeHtml(customer.email)}</p>
              <p><strong>Phone:</strong> ${this.escapeHtml(customer.phone)}</p>
              ${customer.notes ? `<p><strong>Notes:</strong> ${this.escapeHtml(customer.notes)}</p>` : ''}
              <div class="customer-actions">
                <button class="btn btn-secondary" onclick="customerApp.showCustomerDetail('${customer.id}')">View</button>
                <button class="btn btn-primary" onclick="customerApp.showEditForm('${customer.id}')">Edit</button>
                <button class="btn btn-danger" onclick="customerApp.deleteCustomer('${customer.id}')">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  private showCreateForm() {
    this.currentView = 'create';
    const content = document.getElementById('main-content')!;
    
    content.innerHTML = `
      <div class="customer-form">
        <h2>Add New Customer</h2>
        <form id="customer-form">
          <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" required>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" required>
          </div>
          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes" rows="4"></textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="customerApp.showCustomerList()">Cancel</button>
            <button type="submit" class="btn btn-primary">Create Customer</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('customer-form')!.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleCreateCustomer();
    });
  }

  showEditForm(customerId: string) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) return;

    this.selectedCustomer = customer;
    this.currentView = 'edit';
    const content = document.getElementById('main-content')!;
    
    content.innerHTML = `
      <div class="customer-form">
        <h2>Edit Customer</h2>
        <form id="customer-form">
          <div class="form-group">
            <label for="name">Name *</label>
            <input type="text" id="name" name="name" value="${this.escapeHtml(customer.name)}" required>
          </div>
          <div class="form-group">
            <label for="email">Email *</label>
            <input type="email" id="email" name="email" value="${this.escapeHtml(customer.email)}" required>
          </div>
          <div class="form-group">
            <label for="phone">Phone *</label>
            <input type="tel" id="phone" name="phone" value="${this.escapeHtml(customer.phone)}" required>
          </div>
          <div class="form-group">
            <label for="notes">Notes</label>
            <textarea id="notes" name="notes" rows="4">${this.escapeHtml(customer.notes || '')}</textarea>
          </div>
          <div class="form-actions">
            <button type="button" class="btn btn-secondary" onclick="customerApp.showCustomerList()">Cancel</button>
            <button type="submit" class="btn btn-primary">Update Customer</button>
          </div>
        </form>
      </div>
    `;

    document.getElementById('customer-form')!.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleUpdateCustomer();
    });
  }

  showCustomerDetail(customerId: string) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) return;

    this.currentView = 'detail';
    const content = document.getElementById('main-content')!;
    
    content.innerHTML = `
      <div class="customer-detail">
        <h2>Customer Details</h2>
        <div class="detail-card">
          <h3>${this.escapeHtml(customer.name)}</h3>
          <div class="detail-row">
            <strong>Email:</strong> 
            <a href="mailto:${this.escapeHtml(customer.email)}">${this.escapeHtml(customer.email)}</a>
          </div>
          <div class="detail-row">
            <strong>Phone:</strong> 
            <a href="tel:${this.escapeHtml(customer.phone)}">${this.escapeHtml(customer.phone)}</a>
          </div>
          ${customer.notes ? `
            <div class="detail-row">
              <strong>Notes:</strong>
              <p>${this.escapeHtml(customer.notes)}</p>
            </div>
          ` : ''}
        </div>
        <div class="form-actions">
          <button class="btn btn-secondary" onclick="customerApp.showCustomerList()">Back to List</button>
          <button class="btn btn-primary" onclick="customerApp.showEditForm('${customer.id}')">Edit Customer</button>
          <button class="btn btn-danger" onclick="customerApp.deleteCustomer('${customer.id}')">Delete Customer</button>
        </div>
      </div>
    `;
  }

  private async handleCreateCustomer() {
    const form = document.getElementById('customer-form') as HTMLFormElement;
    const formData = new FormData(form);
    
    const customerData: CustomerCreate = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      notes: formData.get('notes') as string || undefined,
    };

    try {
      await CustomerAPI.createCustomer(customerData);
      await this.loadCustomers(); // Refresh the list
      this.showSuccess('Customer created successfully!');
    } catch (error) {
      this.showError('Failed to create customer');
    }
  }

  private async handleUpdateCustomer() {
    if (!this.selectedCustomer) return;

    const form = document.getElementById('customer-form') as HTMLFormElement;
    const formData = new FormData(form);
    
    const customerData: CustomerUpdate = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      notes: formData.get('notes') as string || undefined,
    };

    try {
      await CustomerAPI.updateCustomer(this.selectedCustomer.id, customerData);
      await this.loadCustomers(); // Refresh the list
      this.showSuccess('Customer updated successfully!');
    } catch (error) {
      this.showError('Failed to update customer');
    }
  }

  async deleteCustomer(customerId: string) {
    const customer = this.customers.find(c => c.id === customerId);
    if (!customer) return;

    if (!confirm(`Are you sure you want to delete ${customer.name}?`)) {
      return;
    }

    try {
      await CustomerAPI.deleteCustomer(customerId);
      await this.loadCustomers(); // Refresh the list
      this.showSuccess('Customer deleted successfully!');
    } catch (error) {
      this.showError('Failed to delete customer');
    }
  }

  showCustomerList() {
    this.renderCustomerList();
  }

  private showError(message: string) {
    this.showMessage(message, 'error');
  }

  private showSuccess(message: string) {
    this.showMessage(message, 'success');
  }

  private showMessage(message: string, type: 'error' | 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());

    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    document.querySelector('.customer-app header')!.appendChild(messageDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}

// Make it globally available for onclick handlers
declare global {
  interface Window {
    customerApp: CustomerApp;
  }
}

window.customerApp = new CustomerApp();