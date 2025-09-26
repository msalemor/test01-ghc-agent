# Customer Management System

A full-stack customer management application built with FastAPI (backend) and Vite + TypeScript (frontend).

## Features

- **Complete CRUD Operations**: Create, Read, Update, Delete customers
- **Customer Fields**: Name, Email, Phone Number, and Notes
- **Responsive UI**: Clean, modern interface that works on desktop and mobile
- **Real-time Updates**: Changes reflect immediately in the UI
- **Form Validation**: Client-side and server-side validation
- **RESTful API**: Well-structured REST endpoints with proper HTTP methods

## Screenshots

### Main Interface
![Customer Management System](https://github.com/user-attachments/assets/862120bf-581c-4a09-84e2-46f4f8f5b574)

### After Testing CRUD Operations
![Customer Management Final](https://github.com/user-attachments/assets/06175ff8-0356-471e-a57b-5983440138fc)

## Technology Stack

**Backend:**
- FastAPI (Python web framework)
- Pydantic (data validation)
- Uvicorn (ASGI server)
- CORS middleware for frontend integration

**Frontend:**
- Vite (build tool)
- TypeScript (type safety)
- Vanilla JavaScript (no framework dependencies)
- Modern CSS with responsive design

## Project Structure

```
├── main.py                 # FastAPI backend server
├── requirements.txt        # Python dependencies
├── frontend/
│   ├── index.html         # Main HTML template
│   ├── package.json       # Node.js dependencies
│   ├── vite.config.ts     # Vite configuration
│   ├── tsconfig.json      # TypeScript configuration
│   └── src/
│       ├── main.ts        # Frontend main application
│       ├── style.css      # Application styles
│       ├── types/
│       │   └── Customer.ts # TypeScript interfaces
│       └── services/
│           └── CustomerService.ts # API service layer
```

## Setup Instructions

### Prerequisites

- Python 3.8+ installed
- Node.js 16+ installed
- npm or yarn package manager

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Start the FastAPI server:
```bash
python main.py
```

The API will be available at `http://localhost:8000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Building for Production

To build the frontend for production:
```bash
cd frontend
npm run build
```

The built files will be in the `frontend/dist` directory.

## API Endpoints

The FastAPI backend provides the following REST endpoints:

- `GET /` - API health check
- `GET /customers` - Get all customers
- `GET /customers/{id}` - Get a specific customer
- `POST /customers` - Create a new customer
- `PUT /customers/{id}` - Update an existing customer
- `DELETE /customers/{id}` - Delete a customer

### API Documentation

Once the backend is running, you can view the interactive API documentation at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Usage

1. **Adding Customers**: Fill out the form on the left and click "Add Customer"
2. **Viewing Customers**: All customers are displayed in cards on the right side
3. **Editing Customers**: Click the "Edit" button on any customer card to modify their information
4. **Deleting Customers**: Click the "Delete" button and confirm to remove a customer

## Development Notes

- The backend uses in-memory storage for simplicity. In production, integrate with a proper database.
- CORS is configured to allow requests from the frontend development server.
- The frontend uses modern ES modules and TypeScript for better development experience.
- Error handling is implemented for both client and server-side operations.

## Next Steps for Production

- [ ] Add database integration (PostgreSQL, MySQL, etc.)
- [ ] Implement user authentication and authorization
- [ ] Add input sanitization and advanced validation
- [ ] Implement pagination for large customer lists
- [ ] Add search and filtering capabilities
- [ ] Set up proper logging and monitoring
- [ ] Add unit and integration tests
- [ ] Configure CI/CD pipeline
