import './style.css'
import { CustomerService } from './services/CustomerService'
import { Customer } from './types/Customer'

const customerService = new CustomerService()

// DOM elements
const form = document.getElementById('customer-form-element') as HTMLFormElement
const customerIdInput = document.getElementById('customer-id') as HTMLInputElement
const nameInput = document.getElementById('name') as HTMLInputElement
const emailInput = document.getElementById('email') as HTMLInputElement
const phoneInput = document.getElementById('phone') as HTMLInputElement
const notesInput = document.getElementById('notes') as HTMLTextAreaElement
const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement
const cancelBtn = document.getElementById('cancel-btn') as HTMLButtonElement
const formTitle = document.getElementById('form-title') as HTMLHeadingElement
const customersGrid = document.getElementById('customers-grid') as HTMLDivElement

let isEditing = false

// Initialize the app
async function init() {
  await loadCustomers()
  setupEventListeners()
}

// Load and display customers
async function loadCustomers() {
  try {
    const customers = await customerService.getAllCustomers()
    renderCustomers(customers)
  } catch (error) {
    console.error('Failed to load customers:', error)
    customersGrid.innerHTML = '<p class="error">Failed to load customers. Please try again.</p>'
  }
}

// Render customers in the grid
function renderCustomers(customers: Customer[]) {
  if (customers.length === 0) {
    customersGrid.innerHTML = '<p class="no-customers">No customers found. Add your first customer!</p>'
    return
  }

  customersGrid.innerHTML = customers.map(customer => `
    <div class="customer-card" data-id="${customer.id}">
      <h3>${customer.name}</h3>
      <p><strong>Email:</strong> ${customer.email}</p>
      <p><strong>Phone:</strong> ${customer.phone}</p>
      <p><strong>Notes:</strong> ${customer.notes || 'No notes'}</p>
      <div class="customer-actions">
        <button class="edit-btn" onclick="editCustomer('${customer.id}')">Edit</button>
        <button class="delete-btn" onclick="deleteCustomer('${customer.id}')">Delete</button>
      </div>
    </div>
  `).join('')
}

// Setup event listeners
function setupEventListeners() {
  form.addEventListener('submit', handleFormSubmit)
  cancelBtn.addEventListener('click', resetForm)
}

// Handle form submission
async function handleFormSubmit(e: Event) {
  e.preventDefault()
  
  const customerData = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    notes: notesInput.value.trim()
  }

  try {
    if (isEditing) {
      await customerService.updateCustomer(customerIdInput.value, customerData)
    } else {
      await customerService.createCustomer(customerData)
    }
    
    resetForm()
    await loadCustomers()
  } catch (error) {
    console.error('Failed to save customer:', error)
    alert('Failed to save customer. Please try again.')
  }
}

// Edit customer
async function editCustomer(id: string) {
  try {
    const customer = await customerService.getCustomer(id)
    
    customerIdInput.value = customer.id
    nameInput.value = customer.name
    emailInput.value = customer.email
    phoneInput.value = customer.phone
    notesInput.value = customer.notes || ''
    
    isEditing = true
    formTitle.textContent = 'Edit Customer'
    submitBtn.textContent = 'Update Customer'
    cancelBtn.style.display = 'inline-block'
    
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth' })
  } catch (error) {
    console.error('Failed to load customer for editing:', error)
    alert('Failed to load customer. Please try again.')
  }
}

// Delete customer
async function deleteCustomer(id: string) {
  if (!confirm('Are you sure you want to delete this customer?')) {
    return
  }

  try {
    await customerService.deleteCustomer(id)
    await loadCustomers()
  } catch (error) {
    console.error('Failed to delete customer:', error)
    alert('Failed to delete customer. Please try again.')
  }
}

// Reset form
function resetForm() {
  form.reset()
  customerIdInput.value = ''
  isEditing = false
  formTitle.textContent = 'Add New Customer'
  submitBtn.textContent = 'Add Customer'
  cancelBtn.style.display = 'none'
}

// Make functions available globally for onclick handlers
(window as any).editCustomer = editCustomer;
(window as any).deleteCustomer = deleteCustomer;

// Start the app
init()