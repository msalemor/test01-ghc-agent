# Customer Management System

A full-stack customer management application built with FastAPI (backend) and Vite + TypeScript (frontend).

## Features

- ✅ **Create** customers with name, email, phone, and notes
- ✅ **View** customer list with responsive card layout
- ✅ **View** individual customer details with clickable email/phone links
- ✅ **Edit** customer information with pre-populated forms
- ✅ **Delete** customers with confirmation dialog
- ✅ Modern, responsive UI with professional styling
- ✅ Real-time success/error messages
- ✅ CORS-enabled API for frontend integration

## Technology Stack

### Backend (FastAPI)
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation and settings management
- **Uvicorn** - Lightning-fast ASGI server
- **UUID** - Unique customer identifiers

### Frontend (Vite + TypeScript)
- **Vite** - Next-generation frontend tooling
- **TypeScript** - Type-safe JavaScript
- **Vanilla TypeScript** - No framework dependencies
- **CSS Grid & Flexbox** - Modern responsive layout
- **Fetch API** - HTTP client for backend communication

## Prerequisites

- Python 3.8+
- Node.js 16+
- npm or yarn

## Installation & Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server
python main.py
```

The backend will be available at `http://localhost:8000`

- API documentation: `http://localhost:8000/docs`
- Alternative docs: `http://localhost:8000/redoc`

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API health check |
| GET | `/customers` | Get all customers |
| GET | `/customers/{id}` | Get customer by ID |
| POST | `/customers` | Create new customer |
| PUT | `/customers/{id}` | Update customer |
| DELETE | `/customers/{id}` | Delete customer |

## Customer Data Model

```json
{
  "id": "uuid",
  "name": "string",
  "email": "string", 
  "phone": "string",
  "notes": "string (optional)"
}
```

## Screenshots

### Initial State
![Initial State](https://github.com/user-attachments/assets/e50b1dd0-c698-44d3-abac-343637c618d8)

### Add Customer Form
![Add Customer Form](https://github.com/user-attachments/assets/d9389765-da3c-4b7d-8193-4d42dac5d0ed)

### Customer List
![Customer List](https://github.com/user-attachments/assets/337affb2-7c45-4080-b71c-33418aa8a881)

### Customer Details
![Customer Details](https://github.com/user-attachments/assets/3c25bc3b-20f0-403f-a169-df1edaec2471)

### Updated Customer
![Updated Customer](https://github.com/user-attachments/assets/7b6a0c4f-8558-4585-9006-b1189fd564f4)

## Development

### Backend Development

The backend uses FastAPI with in-memory storage. For production, you would replace the in-memory dictionary with a proper database (PostgreSQL, MongoDB, etc.).

### Frontend Development

The frontend is built with vanilla TypeScript for simplicity. The application is fully responsive and works on desktop and mobile devices.

### Architecture

```
├── backend/
│   ├── main.py          # FastAPI application
│   ├── models.py        # Pydantic models
│   └── requirements.txt # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── main.ts         # Application entry point
│   │   ├── customer-app.ts # Main application class
│   │   ├── api.ts          # API client
│   │   ├── types.ts        # TypeScript interfaces
│   │   └── style.css       # Application styles
│   ├── index.html       # HTML template
│   └── package.json     # Node.js dependencies
└── README.md
```

## Production Deployment

### Backend
- Use a proper ASGI server like Gunicorn with Uvicorn workers
- Add a database (PostgreSQL recommended)
- Implement authentication and authorization
- Add input validation and error handling
- Configure HTTPS

### Frontend
- Build for production: `npm run build`
- Serve static files with nginx or similar
- Configure environment variables for API endpoints
- Implement proper error boundaries
- Add loading states and offline support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
