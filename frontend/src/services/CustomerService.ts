import { Customer, CustomerCreate } from '../types/Customer'

export class CustomerService {
  private baseUrl = 'http://localhost:8000'

  async getAllCustomers(): Promise<Customer[]> {
    const response = await fetch(`${this.baseUrl}/customers`)
    if (!response.ok) {
      throw new Error(`Failed to fetch customers: ${response.statusText}`)
    }
    return response.json()
  }

  async getCustomer(id: string): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/customers/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch customer: ${response.statusText}`)
    }
    return response.json()
  }

  async createCustomer(customer: CustomerCreate): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    if (!response.ok) {
      throw new Error(`Failed to create customer: ${response.statusText}`)
    }
    return response.json()
  }

  async updateCustomer(id: string, customer: CustomerCreate): Promise<Customer> {
    const response = await fetch(`${this.baseUrl}/customers/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customer),
    })
    if (!response.ok) {
      throw new Error(`Failed to update customer: ${response.statusText}`)
    }
    return response.json()
  }

  async deleteCustomer(id: string): Promise<void> {
    const response = await fetch(`${this.baseUrl}/customers/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Failed to delete customer: ${response.statusText}`)
    }
  }
}