# 🏢 Employee Management System

A modern, full-stack CRUD application for managing employee records built with React, TypeScript, Node.js, and Prisma.

![Project Status](https://img.shields.io/badge/status-complete-success)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![Node.js](https://img.shields.io/badge/Node.js-18+-green)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Running Tests](#running-tests)
- [Design Decisions](#design-decisions)
- [Assumptions](#assumptions)
- [Screenshots](#screenshots)
- [Video Demo](#video-demo)

---

## 🎯 Overview

This Employee Management System is a comprehensive solution for organizations to manage their employee database efficiently. The application provides a clean, intuitive interface for performing CRUD operations (Create, Read, Update, Delete) on employee records with advanced features like search, sorting, and pagination.

### Key Highlights

- **Full-Stack TypeScript** - End-to-end type safety
- **Modern UI/UX** - Beautiful, responsive design with smooth animations
- **Real-time Search** - Debounced search for optimal performance
- **Mobile Responsive** - Card view on mobile, table view on desktop
- **Form Validation** - Client and server-side validation using Zod
- **Comprehensive Testing** - Unit and integration tests included

---

## ✨ Features

### Core Features

- ✅ **View All Employees** - Display employees in a sortable, searchable table
- ✅ **Add Employee** - Create new employee records with validation
- ✅ **Edit Employee** - Update existing employee information
- ✅ **Delete Employee** - Remove employees with confirmation dialog
- ✅ **Search & Filter** - Real-time search across name, email, and position
- ✅ **Sorting** - Sort by name, email, or position (ascending/descending)
- ✅ **Pagination** - Client-side pagination (10 items per page)

### Bonus Features

- ✅ **Form Validation** - Real-time validation with error messages
- ✅ **Debounced Search** - Optimized search with 300ms delay
- ✅ **Responsive Design** - Mobile card view, desktop table view
- ✅ **Loading States** - Smooth loading indicators
- ✅ **Toast Notifications** - Success/error feedback
- ✅ **Empty States** - Beautiful UI when no data
- ✅ **Backend Tests** - Comprehensive test coverage

### Advanced Features

- ✅ **Animations** - Smooth transitions and hover effects
- ✅ **Glass Morphism** - Modern design with backdrop blur
- ✅ **Gradient UI** - Professional color schemes
- ✅ **Stats Dashboard** - Employee statistics cards
- ✅ **Error Handling** - Graceful error management
- ✅ **Type Safety** - Full TypeScript implementation

---

## 🛠️ Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Hook Form** - Form management
- **Zod** - Validation schema
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM
- **SQLite** - Database
- **Zod** - Validation
- **Jest** - Testing framework
- **Supertest** - API testing

---

## 📁 Project Structure

```
employee-management-system/
├── server/
│   ├── prisma/
│   │   ├── dev.db              # SQLite database
│   │   ├── migrations/         # Database migrations
│   │   └── schema.prisma       # Database schema
│   ├── src/
│   │   ├── controllers/
│   │   │   └── employeeController.ts
│   │   ├── middlewares/
│   │   │   └── errorHandler.ts
│   │   ├── models/
│   │   │   └── employee.ts
│   │   ├── routes/
│   │   │   └── employeeRoutes.ts
│   │   ├── utils/
│   │   │   └── validators.ts
│   │   └── server.ts
│   ├── tests/
│   │   └── employee.test.ts
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmployeeTable.tsx
│   │   │   ├── EmployeeModal.tsx
│   │   │   └── DeleteDialog.tsx
│   │   ├── hooks/
│   │   │   └── useDebounce.ts
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── types/
│   │   │   └── employee.ts
│   │   ├── utils/
│   │   │   └── validation.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── README.md
│
└── README.md (this file)
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

### Verify Installation

```bash
node --version  # Should be v18 or higher
npm --version   # Should be 9 or higher
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/PrashantPalve01/ASE-Challenge-PrashantPalve
cd ASE-Challenge-PrashantPalve
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd server

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma Client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Start the backend server
npm run dev
```

Backend will run on **http://localhost:5000**

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory (from root)
cd client

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Start the frontend development server
npm run dev
```

Frontend will run on **http://localhost:5173**

### 4. Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

The frontend will automatically connect to the backend API.

---

## 🧪 Running Tests

### Backend Tests

```bash
# Navigate to backend directory
cd backend

# Run all tests
npm test

```

**Expected Coverage:**

- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

### Test Coverage Includes:

- ✅ All CRUD operations (Create, Read, Update, Delete)
- ✅ Search functionality
- ✅ Validation error handling
- ✅ Error cases (404, 400, 409, 500)
- ✅ Database operations
- ✅ Edge cases

### Manual API Testing

You can also test the API endpoints manually:

```bash
# Health Check
curl http://localhost:5000/health

# Get All Employees
curl http://localhost:5000/api/employees

# Create Employee
curl -X POST http://localhost:5000/api/employees \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","position":"Developer"}'

# Update Employee
curl -X PUT http://localhost:5000/api/employees/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated"}'

# Delete Employee
curl -X DELETE http://localhost:5000/api/employees/1

# Search Employees
curl "http://localhost:5000/api/employees?search=john"
```

---

## 🎨 Design Decisions

### Architecture Decisions

#### **1. Layered Architecture (Backend)**

- **Routes → Controllers → Database**
- **Rationale:** Simple 3-layer architecture for a CRUD application. Kept controllers lean with direct database access via Prisma for simplicity.
- **Alternative Considered:** Adding a service layer, but decided against it to avoid over-engineering for a straightforward CRUD app.

#### **2. Client-Side Pagination & Sorting (Frontend)**

- **Rationale:** For small to medium datasets (< 1000 employees), client-side operations are faster and provide instant feedback.
- **Trade-off:** Not suitable for very large datasets, but appropriate for typical company employee databases.

#### **3. SQLite Database**

- **Rationale:** Lightweight, zero-configuration, perfect for development and demonstration.
- **Production Alternative:** Can easily switch to PostgreSQL or MySQL by changing Prisma datasource.

#### **4. TypeScript Throughout**

- **Rationale:** End-to-end type safety reduces bugs and improves developer experience.
- **Benefit:** Shared validation schemas (Zod) between frontend and backend.

### UI/UX Decisions

#### **1. Responsive Design: Table vs Cards**

- **Desktop (> 768px):** Table view for better data density
- **Mobile (< 768px):** Card view for better touch interaction
- **Rationale:** Different layouts optimized for different screen sizes.

#### **2. Debounced Search (300ms)**

- **Rationale:** Prevents excessive filtering while typing, improves performance.
- **User Experience:** Feels instant to users while being efficient.

#### **3. Modal Forms**

- **Rationale:** Keeps users in context, no page navigation needed.
- **Alternative Considered:** Separate pages, but modals provide better UX for simple forms.

#### **4. Confirmation Dialog for Delete**

- **Rationale:** Prevents accidental deletions, standard UX pattern.
- **Implementation:** Shows employee details to confirm the right person.

#### **5. Toast Notifications**

- **Rationale:** Non-intrusive feedback for user actions.
- **Position:** Top-right for visibility without blocking content.

### Technical Decisions

#### **1. Vite over Create React App**

- **Rationale:** Faster build times, modern tooling, better developer experience.

#### **2. Tailwind CSS over CSS-in-JS**

- **Rationale:** Utility-first approach, faster development, smaller bundle size.
- **Trade-off:** More classes in JSX, but better performance.

#### **3. React Hook Form + Zod**

- **Rationale:** Best-in-class form handling with minimal re-renders.
- **Benefit:** Zod schemas shared between frontend and backend.

#### **4. Axios over Fetch**

- **Rationale:** Better error handling, request/response interceptors, automatic JSON parsing.

---

## 📝 Assumptions

### Data Assumptions

1. **Email Uniqueness:** Each employee must have a unique email address (enforced by database constraint).
2. **Required Fields:** Name, email, and position are mandatory for all employees.
3. **Data Volume:** Designed for small to medium organizations (< 1000 employees).
4. **No Authentication:** This is a demo application without user authentication (would be required in production).

### Business Logic Assumptions

1. **No Soft Delete:** Employees are permanently deleted (in production, would implement soft delete).
2. **No Audit Trail:** No tracking of who created/modified records (would add in production).
3. **No Employee Roles:** All employees are treated equally (no hierarchy or permissions).
4. **No File Uploads:** No profile pictures or document attachments.

### Technical Assumptions

1. **Single User:** No concurrent edit conflicts handled (would need optimistic locking in production).
2. **No Caching:** Data fetched fresh on each request (would add Redis in production).
3. **Local Database:** SQLite for simplicity (would use PostgreSQL/MySQL in production).
4. **No Rate Limiting:** No API rate limits implemented (would add in production).

### UI/UX Assumptions

1. **Modern Browsers:** Assumes recent versions of Chrome, Firefox, Safari, or Edge.
2. **JavaScript Enabled:** Application requires JavaScript to function.
3. **English Only:** No internationalization (i18n) support.

---

## 🚢 Deployment (Optional)

### Backend Deployment

**Recommended:** Railway, Render, or Heroku

```bash
npm run build
npm start
```

### Frontend Deployment

**Recommended:** Vercel or Netlify

```bash
npm run build
# Upload dist/ folder
```

### Environment Variables for Production

**Backend:**

```env
PORT=5000
NODE_ENV=production
DATABASE_URL="postgresql://user:pass@host:5432/db"
```

**Frontend:**

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

---

## 🐛 Troubleshooting

### Backend Issues

**Port 5000 already in use:**

```bash
# Change PORT in .env file or kill the process
# Mac/Linux: lsof -ti:5000 | xargs kill -9
# Windows: netstat -ano | findstr :5000
```

**Prisma errors:**

```bash
npx prisma generate
npx prisma migrate reset
```

### Frontend Issues

**Port 5173 already in use:**

- Vite will automatically use the next available port

**CORS errors:**

- Ensure backend is running on port 5000
- Check VITE_API_BASE_URL in frontend .env

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api/employees
```

### Endpoints

| Method | Endpoint                     | Description         |
| ------ | ---------------------------- | ------------------- |
| GET    | `/api/employees`             | Get all employees   |
| GET    | `/api/employees?search=john` | Search employees    |
| GET    | `/api/employees/:id`         | Get single employee |
| POST   | `/api/employees`             | Create employee     |
| PUT    | `/api/employees/:id`         | Update employee     |
| DELETE | `/api/employees/:id`         | Delete employee     |

---

## 🤝 Contributing

This is a assignment project, but suggestions are welcome!

---

## 📄 License

This project is for educational and portfolio purposes.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@prashantpalve](https://github.com/prashantpalve01)
- LinkedIn: [Prashant Palve](https://www.linkedin.com/in/prashantpalve/)
- Email: palveprashant526@gmail.com

---

## 🙏 Acknowledgments

- Built as part of a technical assessment
- Special thanks to the Anthropic team for Claude assistance
- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from modern SaaS applications

---

## ✅ Checklist for Submission

- [x] All CRUD operations working
- [x] Search functionality implemented
- [x] Form validation (client & server)
- [x] Comprehensive tests with good coverage
- [x] Responsive design (mobile & desktop)
- [x] Clean, documented code
- [x] README with setup instructions
- [x] .env.example files provided
- [x] Git repository with clear commits
- [x] Video demo recorded (optional but recommended)

---

**🎉 Thank you for reviewing my submission!**

If you have any questions or need clarification on any part of the implementation, please feel free to reach out.
