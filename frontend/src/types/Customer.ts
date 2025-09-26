export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  notes?: string
}

export interface CustomerCreate {
  name: string
  email: string
  phone: string
  notes?: string
}