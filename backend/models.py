from pydantic import BaseModel, EmailStr
from typing import Optional
from uuid import UUID, uuid4


class CustomerBase(BaseModel):
    name: str
    email: str
    phone: str
    notes: Optional[str] = None


class CustomerCreate(CustomerBase):
    pass


class CustomerUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    notes: Optional[str] = None


class Customer(CustomerBase):
    id: UUID
    
    class Config:
        from_attributes = True