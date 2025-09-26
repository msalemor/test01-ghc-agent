from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from uuid import UUID, uuid4
from models import Customer, CustomerCreate, CustomerUpdate

app = FastAPI(title="Customer Management API", version="1.0.0")

# Add CORS middleware to allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (in a real app, you'd use a database)
customers_db: Dict[UUID, Customer] = {}


@app.get("/")
async def root():
    return {"message": "Customer Management API"}


@app.get("/customers", response_model=List[Customer])
async def get_customers():
    """Get all customers"""
    return list(customers_db.values())


@app.get("/customers/{customer_id}", response_model=Customer)
async def get_customer(customer_id: UUID):
    """Get a specific customer by ID"""
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customers_db[customer_id]


@app.post("/customers", response_model=Customer, status_code=status.HTTP_201_CREATED)
async def create_customer(customer: CustomerCreate):
    """Create a new customer"""
    customer_id = uuid4()
    new_customer = Customer(id=customer_id, **customer.dict())
    customers_db[customer_id] = new_customer
    return new_customer


@app.put("/customers/{customer_id}", response_model=Customer)
async def update_customer(customer_id: UUID, customer_update: CustomerUpdate):
    """Update an existing customer"""
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    existing_customer = customers_db[customer_id]
    update_data = customer_update.dict(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(existing_customer, field, value)
    
    customers_db[customer_id] = existing_customer
    return existing_customer


@app.delete("/customers/{customer_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer(customer_id: UUID):
    """Delete a customer"""
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    del customers_db[customer_id]
    return None


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)