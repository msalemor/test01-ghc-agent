from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid

app = FastAPI(title="Customer Management API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],  # Vite default ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (in production, use a database)
customers_db = {}

class CustomerBase(BaseModel):
    name: str
    email: str
    phone: str
    notes: Optional[str] = ""

class CustomerCreate(CustomerBase):
    pass

class CustomerUpdate(CustomerBase):
    pass

class Customer(CustomerBase):
    id: str

@app.get("/")
async def root():
    return {"message": "Customer Management API"}

@app.post("/customers", response_model=Customer)
async def create_customer(customer: CustomerCreate):
    customer_id = str(uuid.uuid4())
    new_customer = Customer(id=customer_id, **customer.dict())
    customers_db[customer_id] = new_customer
    return new_customer

@app.get("/customers", response_model=List[Customer])
async def get_customers():
    return list(customers_db.values())

@app.get("/customers/{customer_id}", response_model=Customer)
async def get_customer(customer_id: str):
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    return customers_db[customer_id]

@app.put("/customers/{customer_id}", response_model=Customer)
async def update_customer(customer_id: str, customer: CustomerUpdate):
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    updated_customer = Customer(id=customer_id, **customer.dict())
    customers_db[customer_id] = updated_customer
    return updated_customer

@app.delete("/customers/{customer_id}")
async def delete_customer(customer_id: str):
    if customer_id not in customers_db:
        raise HTTPException(status_code=404, detail="Customer not found")
    
    del customers_db[customer_id]
    return {"message": "Customer deleted successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)