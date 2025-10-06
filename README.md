# 🏢 Employee Management System

A full-stack TypeScript application for managing employee records with a modern, responsive UI and comprehensive REST API..

---

## Overview

- TypeScript on both frontend and backend
- React + Vite + Tailwind on the client
- Express + Prisma (SQLite) on the server
- Clean, responsive UI with client-side pagination, search, dialogs, and form validation

---

## Features (implemented)

- Create, Read, Update, Delete employees
- Search by name/email/position (server-side `?search=`)
- Client-side pagination (page/limit handled in the UI)
- Validation on both sides (Zod)
- Toast feedback, loading skeletons, and modals

---

## Tech Stack

- Frontend: React 18, TypeScript, Vite, Tailwind CSS, React Hook Form, Zod, Axios
- Backend: Node.js, Express, TypeScript, Prisma, SQLite, Zod

---

## Project Structure

```
ASE-Challenge-PrashantPalve/
├── client/                 # React app (Vite + TS + Tailwind)
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── hooks/
│       ├── types/
│       └── utils/
└── server/                 # Express API (TS + Prisma + SQLite)
    └── src/
        ├── controllers/
        ├── routes/
        ├── middlewares/
        ├── utils/
        └── server.ts
```

---

## Prerequisites

- Node.js 18+
- npm 9+

---

## Setup

Install dependencies:

```bash
cd server && npm install
cd ../client && npm install
```

Prisma (optional):

```bash
cd server
npx prisma generate
npx prisma migrate dev --name init
```

---

## Run locally

Server:

```bash
cd server
npm run dev
# http://localhost:5000
```

Client:

```bash
cd client
# Configure API base (optional). Defaults to http://localhost:5000
# Create .env if you want to override:
echo VITE_API_URL=http://localhost:5000 > .env
npm run dev
# http://localhost:5173
```

Health check:

```bash
curl http://localhost:5000/health
# {"status":"OK","message":"Server is running"}
```

---

## API (implemented)

Base URL: `http://localhost:5000/api`

- GET `/employees?search=<term>` → `{ success, count, data }`
- GET `/employees/:id`
- POST `/employees`
- PUT `/employees/:id`
- DELETE `/employees/:id`

Notes:

- Search filters by name, email, or position (contains).

---

## Frontend behavior

- Client-side pagination: UI fetches all employees and slices locally per page.
- Validation: React Hook Form + Zod mirrors backend validators.

---

## Future enhancements

- Backend pagination and sorting parameters
- Column sorting in the table
- Server-side test suite
- Authentication/roles (if needed)

---

## Author

Prashant Palve — palveprashant526@gmail.com — [LinkedIn](https://www.linkedin.com/in/prashantpalve/) — [GitHub](https://github.com/prashantpalve01)
