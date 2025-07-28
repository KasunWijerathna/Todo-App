# Todo Application

A full-stack todo task management application built with React, Node.js, TypeScript, and PostgreSQL.

## Features

- ✅ Create new tasks with title and description
- ✅ View the 5 most recent incomplete tasks
- ✅ Mark tasks as completed (they disappear from the list)
- ✅ Clean, modern UI matching the provided mockup
- ✅ Responsive design
- ✅ Comprehensive test coverage

## Architecture

The application follows a three-tier architecture:

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  Frontend   │◄──►│   Backend   │◄──►│  Database   │
│   (React)   │    │  (Express)  │    │ (PostgreSQL)│
└─────────────┘    └─────────────┘    └─────────────┘
```

### Components

1. **Frontend (React + TypeScript)**
   - Single Page Application (SPA)
   - Modern UI with clean design
   - Responsive layout
   - Component-based architecture

2. **Backend (Node.js + Express + TypeScript)**
   - RESTful API
   - Input validation
   - Error handling
   - Service layer pattern

3. **Database (PostgreSQL)**
   - Relational database
   - Task table with proper schema
   - ACID compliance

## Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **Testing Library** - Component testing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **PostgreSQL** - Database
- **pg** - PostgreSQL client
- **express-validator** - Input validation
- **Jest** - Testing framework

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Reverse proxy for frontend

## Getting Started

### Prerequisites

- Docker
- Docker Compose
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. **Start the application**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Development

#### Running Tests

**Backend Tests:**
```bash
cd backend
npm install
npm test
npm run test:coverage
```

**Frontend Tests:**
```bash
cd frontend
npm install
npm test
npm run test:coverage
```

#### Development Mode

**Backend:**
```bash
cd backend
npm install
npm run dev
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## API Documentation

### Endpoints

#### `POST /api/tasks`
Create a new task.

**Request Body:**
```json
{
  "title": "Task Title",
  "description": "Task Description"
}
```

**Response:**
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": false,
  "created_at": "2023-01-01T00:00:00Z"
}
```

#### `GET /api/tasks`
Get the 5 most recent incomplete tasks.

**Response:**
```json
[
  {
    "id": 1,
    "title": "Task Title",
    "description": "Task Description",
    "completed": false,
    "created_at": "2023-01-01T00:00:00Z"
  }
]
```

#### `PATCH /api/tasks/:id/complete`
Mark a task as completed.

**Response:**
```json
{
  "id": 1,
  "title": "Task Title",
  "description": "Task Description",
  "completed": true,
  "created_at": "2023-01-01T00:00:00Z"
}
```

## Database Schema

```sql
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Testing

### Backend Test Coverage
- **Unit Tests**: Models, Services, Controllers
- **Integration Tests**: API endpoints
- **Coverage**: >90% for all layers

### Frontend Test Coverage
- **Unit Tests**: Components, API functions
- **Coverage**: >90% for components

### Running All Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test
```

## Project Structure

```
todo-app/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── index.ts        # Server entry point
│   ├── tests/              # Backend tests
│   ├── Dockerfile          # Backend container
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── api/            # API functions
│   │   ├── types/          # TypeScript types
│   │   └── main.tsx        # App entry point
│   ├── tests/              # Frontend tests
│   ├── Dockerfile          # Frontend container
│   └── package.json
├── db/
│   └── init.sql            # Database initialization
├── docker-compose.yml      # Container orchestration
└── README.md
```

## Clean Code Principles

The codebase follows clean code principles:

- **Single Responsibility Principle**: Each function/class has one reason to change
- **Open/Closed Principle**: Open for extension, closed for modification
- **Dependency Inversion**: High-level modules don't depend on low-level modules
- **DRY (Don't Repeat Yourself)**: No code duplication
- **Meaningful Names**: Clear, descriptive variable and function names
- **Small Functions**: Functions are short and focused
- **Comments**: Code is self-documenting with minimal comments

## SOLID Principles

- **S** - Single Responsibility: Each class has one responsibility
- **O** - Open/Closed: Classes are open for extension, closed for modification
- **L** - Liskov Substitution: Subtypes are substitutable for their base types
- **I** - Interface Segregation: Clients don't depend on interfaces they don't use
- **D** - Dependency Inversion: Depend on abstractions, not concretions

## Deployment

The application is containerized and ready for deployment:

1. **Production Build**
   ```bash
   docker-compose -f docker-compose.yml up --build
   ```

2. **Environment Variables**
   - Database configuration is handled via Docker environment variables
   - No sensitive data is hardcoded

3. **Scaling**
   - Each component can be scaled independently
   - Database can be replaced with managed service
   - Load balancer can be added for high availability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License. 