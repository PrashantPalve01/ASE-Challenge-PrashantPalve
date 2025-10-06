# 🏢 Employee Management System

> A full-stack TypeScript application for managing employee records with a modern, responsive UI and comprehensive REST API.

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Setup Instructions](#-setup-instructions)
- [Running the Application](#-running-the-application)
- [Running Tests](#-running-tests)
- [API Documentation](#-api-documentation)
- [Design Choices & Assumptions](#-design-choices--assumptions)
- [Screenshots](#-screenshots)
- [Video Walkthrough](#-video-walkthrough)
- [Future Enhancements](#-future-enhancements)
- [Author](#-author)

---

## 🎯 Overview

This is a **modern, production-ready employee management system** built as part of a technical assignment. The application demonstrates full-stack development skills with a focus on **clean architecture**, **type safety**, and **exceptional user experience**.

### Key Highlights:

- ✅ Complete CRUD operations for employee management
- ✅ Real-time search and filtering capabilities
- ✅ Pagination for handling large datasets
- ✅ Sortable columns (ascending/descending)
- ✅ Form validation with detailed error messages
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern UI with smooth animations
- ✅ Comprehensive test coverage
- ✅ RESTful API with proper error handling
- ✅ Type-safe codebase with TypeScript

---

## ✨ Features

### Core Features (Required)

- ✅ **Create** new employees with name, email, and position
- ✅ **Read** employee list with pagination
- ✅ **Update** existing employee information
- ✅ **Delete** employees with confirmation dialog
- ✅ **SQLite Database** for data persistence
- ✅ **RESTful API** endpoints

### Bonus Features (Completed)

- ✅ **Search/Filter** - Real-time search across name, email, and position
- ✅ **Frontend Validation** - Zod schema validation with instant feedback
- ✅ **Backend Tests** - Unit and integration tests for all endpoints

### Extra Features (Added Value)

- ✅ **Pagination** - Navigate through large employee lists efficiently
- ✅ **Sorting** - Sort by name, email, position, or date created
- ✅ **Toast Notifications** - User-friendly success/error messages
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Responsive Design** - Adaptive layouts for all screen sizes
- ✅ **Modern UI/UX** - Glassmorphism, gradients, smooth animations
- ✅ **Error Handling** - Comprehensive error handling on frontend and backend
- ✅ **TypeScript** - Full type safety across the stack
- ✅ **Clean Architecture** - Layered architecture with separation of concerns

---

## 🛠️ Tech Stack

### Backend

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** SQLite
- **ORM:** Prisma
- **Validation:** Zod
- **Testing:** Jest + Supertest
- **Security:** Helmet, CORS

### Frontend

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Axios
- **Icons:** Lucide React

---

## 📁 Project Structure

```
employee-management/
├── backend/                      # Backend API
│   ├── src/
│   │   ├── config/              # Database configuration
│   │   ├── controllers/         # Request handlers
│   │   ├── services/            # Business logic
│   │   ├── routes/              # API routes
│   │   ├── middlewares/         # Validation & error handling
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Helper functions
│   │   ├── app.ts               # Express app setup
│   │   └── server.ts            # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma        # Database schema
│   │   └── seed.ts              # Sample data
│   ├── tests/                   # Unit & integration tests
│   ├── package.json
│   └── README.md
│
├── frontend/                     # Frontend React app
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── common/          # Reusable components
│   │   │   ├── employee/        # Employee-specific components
│   │   │   └── layout/          # Layout components
│   │   ├── services/            # API service
│   │   ├── hooks/               # Custom React hooks
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Helper functions
│   │   ├── context/             # React context
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── README.md
│
└── README.md                     # This file
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** (v9.0.0 or higher) or **yarn**
- **Git**

### Check Your Versions:

```bash
node --version  # Should be v18+
npm --version   # Should be v9+
```

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/employee-management.git
cd employee-management
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed database with sample data (optional)
npx prisma db seed
```

**Environment Variables (.env):**

```env
PORT=5000
NODE_ENV=development
DATABASE_URL="file:./dev.db"
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

**Environment Variables (.env):**

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

Backend will start at: `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

Frontend will start at: `http://localhost:5173`

### Option 2: Production Build

**Backend:**

```bash
cd backend
npm run build
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

### Verify Installation

1. **Backend Health Check:**

   ```bash
   curl http://localhost:5000/health
   ```

   Should return: `{"success": true, "message": "Server is running"}`

2. **Frontend:**
   Open browser at: `http://localhost:5173`

---

## 🧪 Running Tests

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Test Coverage

The test suite includes:

- ✅ **Unit Tests** - Service layer business logic
- ✅ **Integration Tests** - API endpoint testing
- ✅ **Validation Tests** - Input validation scenarios
- ✅ **Error Handling Tests** - Edge cases and error scenarios

**Coverage Report:**

```
Test Suites: 2 passed, 2 total
Tests:       25 passed, 25 total
Coverage:    > 85%
```

### Running Specific Tests

```bash
# Run only unit tests
npm test -- tests/unit

# Run only integration tests
npm test -- tests/integration

# Run specific test file
npm test -- employee.service.test.ts
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### 1. Get All Employees

```http
GET /employees?page=1&limit=10&sortBy=name&order=asc&search=john
```

**Query Parameters:**

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `sortBy` (optional): Sort field (name|email|position|createdAt)
- `order` (optional): Sort order (asc|desc)
- `search` (optional): Search term

**Response:**

```json
{
  "success": true,
  "message": "Employees retrieved successfully",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "totalPages": 5
  }
}
```

#### 2. Get Single Employee

```http
GET /employees/:id
```

#### 3. Create Employee

```http
POST /employees
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "position": "Developer"
}
```

#### 4. Update Employee

```http
PUT /employees/:id
Content-Type: application/json

{
  "name": "John Updated",
  "position": "Senior Developer"
}
```

#### 5. Delete Employee

```http
DELETE /employees/:id
```

**For complete API documentation, see [backend/README.md](backend/README.md)**

---

## 🎨 Design Choices & Assumptions

### Architecture Decisions

#### 1. **Layered Architecture (Backend)**

**Choice:** Implemented Routes → Controllers → Services → Database layers

**Reasoning:**

- Separation of concerns for maintainability
- Easy to test individual layers
- Scalable architecture for future growth
- Industry best practice

#### 2. **TypeScript Throughout**

**Choice:** Used TypeScript for both frontend and backend

**Reasoning:**

- Type safety reduces runtime errors
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring and maintenance
- Company preference mentioned in assignment

#### 3. **Prisma ORM**

**Choice:** Used Prisma instead of raw SQL

**Reasoning:**

- Type-safe database queries
- Automatic migrations
- Easy to switch databases (SQLite → PostgreSQL)
- Modern developer experience
- Better than traditional ORMs (Sequelize, TypeORM)

#### 4. **React Hook Form + Zod**

**Choice:** Used React Hook Form for forms and Zod for validation

**Reasoning:**

- Performant (fewer re-renders)
- Type-safe validation schemas
- Reusable validation logic between frontend/backend
- Excellent developer experience

#### 5. **Tailwind CSS**

**Choice:** Used Tailwind instead of CSS modules or styled-components

**Reasoning:**

- Rapid development
- Consistent design system
- Smaller bundle size (purged in production)
- Modern and industry-standard
- Easy to maintain

### Assumptions Made

#### 1. **Email Uniqueness**

**Assumption:** Each employee must have a unique email address

**Reasoning:**

- Common business requirement
- Prevents duplicate entries
- Email is typically a unique identifier

#### 2. **No Authentication Required**

**Assumption:** Application is for internal use without authentication

**Reasoning:**

- Not mentioned in requirements
- Focused on core CRUD functionality
- Can be added later if needed

#### 3. **Simple Position Field**

**Assumption:** Position is a free-text field, not a predefined dropdown

**Reasoning:**

- More flexible for different organizations
- Simpler implementation
- Can be enhanced later with role management

#### 4. **Pagination Default**

**Assumption:** Default 10 items per page

**Reasoning:**

- Good balance for performance and UX
- Standard practice
- Configurable if needed

#### 5. **Soft Delete Not Implemented**

**Assumption:** Hard delete is sufficient

**Reasoning:**

- Not required in specs
- Simpler implementation
- Can add soft delete if business requires audit trail

### Design Patterns Used

#### 1. **Repository Pattern**

- Services act as repositories
- Abstract database operations
- Easy to mock for testing

#### 2. **Dependency Injection**

- Services injected into controllers
- Loose coupling
- Testable code

#### 3. **Custom Hooks (Frontend)**

- `useEmployees` - Data management
- `useDebounce` - Search optimization
- `useToast` - Notifications
- Reusable logic across components

#### 4. **Context API (Frontend)**

- Toast notifications managed globally
- Avoid prop drilling
- Clean component tree

---

## 📸 Screenshots

### Desktop View - Employee List

![Desktop Table View](./screenshots/desktop-table.png)
_Modern table with sortable columns, search, and pagination_

### Mobile View - Responsive Cards

![Mobile Card View](./screenshots/mobile-cards.png)
_Beautiful card layout optimized for mobile devices_

### Add Employee Modal

![Add Employee Form](./screenshots/add-employee.png)
_Clean form with real-time validation_

### Delete Confirmation

![Delete Confirmation](./screenshots/delete-confirm.png)
_Safe deletion with confirmation dialog_

### Toast Notifications

![Toast Notification](./screenshots/toast-notification.png)
_User-friendly success/error messages_

---

## 🎥 Video Walkthrough

### 📹 [Watch Full Demo & Code Explanation on Loom](https://www.loom.com/share/your-video-id)

**Video Contents:**

1. **Introduction** (0:00 - 1:00)

   - Project overview
   - Technology stack explanation

2. **Backend Architecture** (1:00 - 5:00)

   - Project structure walkthrough
   - API endpoints demonstration
   - Database schema explanation
   - Test cases execution

3. **Frontend Features** (5:00 - 10:00)

   - UI/UX walkthrough
   - CRUD operations demo
   - Search and filtering
   - Pagination and sorting
   - Form validation
   - Responsive design

4. **Code Quality** (10:00 - 12:00)

   - TypeScript usage
   - Clean architecture
   - Error handling
   - Testing strategy

5. **Running Locally** (12:00 - 15:00)
   - Setup instructions
   - Running tests
   - Common troubleshooting

---

## 🚀 Future Enhancements

If this were a production application, I would add:

### Short-term

- 🔐 User authentication (JWT)
- 👥 Role-based access control (Admin/HR/Employee)
- 📊 Analytics dashboard
- 📁 Bulk import/export (CSV/Excel)
- 📧 Email notifications

### Long-term

- 🌍 Multi-language support (i18n)
- 🌙 Dark mode
- 📱 Mobile app (React Native)
- 🔍 Advanced search filters
- 📈 Employee performance tracking
- 💾 Database backup automation
- 🐳 Docker containerization
- ☁️ Cloud deployment (AWS/Azure)

---

## 🐛 Known Limitations

1. **Single Database File** - SQLite is single-file; consider PostgreSQL for production
2. **No File Uploads** - Employee photos not implemented
3. **Basic Search** - Full-text search could be enhanced
4. **No Audit Log** - Employee changes not tracked
5. **No Email Verification** - Email validity not verified

---

## 📞 Support & Contact

### 👨‍💻 Author

**Your Name**

- 📧 Email: palveprashant526@gmail.com
- 💼 LinkedIn: [linkedin.com/in/prashantpalve](https://www.linkedin.com/in/prashantpalve/)
- 🐙 GitHub: [@prashantpalve](https://github.com/prashantpalve01)
- 🌐 Portfolio: [prashantpalve.com](https://prashantpalve-portfolio.netlify.app/)

### 🤝 Questions?

If you have any questions about the project, feel free to:

- Open an issue on GitHub
- Contact me via email
- Schedule a call to discuss

---

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in full-stack development

---

<div align="center">

**Made with ❤️ and TypeScript**

</div>
