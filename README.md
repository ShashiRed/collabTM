# collabTM — Collaborative Task Manager

A modern, real-time collaborative task management application built with production-grade architecture, enabling teams to create, manage, and track tasks efficiently with live updates.

## Features

### Authentication & Authorization
- Secure user registration and login
- Password hashing with bcrypt
- JWT-based authentication via HttpOnly cookies
- Protected routes and session persistence

### Task Management
- Full CRUD operations for tasks
- Task attributes: title, description, due date, priority, status
- Authorization rules (creator/assignee only)
- Filtering by status and priority
- Sorting by due date

### Real-Time Collaboration
- Live task updates using Socket.io
- Instant UI synchronization across users
- Real-time assignment notifications

### Notifications
- In-app notification system
- Database-persisted notifications
- Instant delivery via WebSockets

### Dashboard
- View tasks created by user
- View tasks assigned to user
- Track overdue tasks
- Advanced filtering and sorting

## Tech Stack

**Frontend**
- React + Vite
- TypeScript
- Tailwind CSS
- React Query (TanStack Query)
- React Hook Form + Zod
- Socket.io Client

**Backend**
- Node.js + Express (TypeScript)
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Socket.io
- Zod validation

**Testing**
- Jest (unit tests)

## Architecture

```
backend/
 ├── controllers/     # HTTP request handlers
 ├── services/        # Business logic
 ├── repositories/    # Database access layer
 ├── dto/             # Validation schemas
 ├── sockets/         # Real-time events
 ├── middlewares/     # Auth & error handling
 └── tests/           # Unit tests

frontend/
 ├── pages/           # Route components
 ├── components/      # Reusable UI
 ├── api/             # API client
 ├── sockets/         # Socket.io client
 └── context/         # State management
```

## Environment Setup

**Backend** (`backend/.env`)
```
PORT=5001
DATABASE_URL=postgresql://user:password@host:port/db
JWT_SECRET=your-secret-key
CLIENT_URL=http://localhost:5174
```

**Frontend** (`.env`)
```
VITE_API_URL=http://localhost:5001/api/v1
```

## Running Locally

**Backend**
```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Real-Time Implementation

- `task:updated` → Broadcasts task changes
- `task:created` → Notifies all users of new tasks
- `task:deleted` → Syncs deletions across clients
- Notifications persisted in database and delivered via Socket.io

## Design Decisions

- **PostgreSQL + Prisma**: Strong relational integrity and type safety
- **HttpOnly cookies**: Secure JWT storage preventing XSS
- **React Query**: Server-state caching and optimistic updates
- **Socket.io**: Reliable bi-directional real-time communication
- **Clean architecture**: Separation of concerns for maintainability

## Testing

Unit tests cover:
- Authentication service logic
- Task creation and authorization
- Core business rules

Run tests:
```bash
cd backend
npm test
```

## Author

**Shashikanth Reddy**  
Full-Stack Developer | Java | React | Node.js
