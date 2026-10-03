# itelect4-backend

Backend API for the Peer Tutoring Platform — Express + TypeScript + MongoDB.

## Tech Stack

- **Express** — HTTP server
- **TypeScript** — Type safety
- **MongoDB Atlas** — Cloud database
- **Mongoose** — Schema and validation
- **JWT** — Authentication
- **bcryptjs** — Password hashing

## Features

- User registration with password hashing
- JWT-based login
- Protected routes using `requireAuth` middleware
- Full CRUD on the **Session** resource
- Validation rules (required, enum, min/max) on the Session schema
- Every route filters by the authenticated user's ID

## Setup

1. Clone the repo
2. Copy `.env.example` to `.env` and fill in `MONGODB_URI` and `JWT_SECRET`
3. `npm install`
4. `npm run dev`

The API runs on `http://localhost:4000`.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/api/health` | No | Health check |
| POST | `/api/auth/register` | No | Create a new user |
| POST | `/api/auth/login` | No | Get a JWT token |
| GET | `/api/sessions` | Yes | List my sessions |
| GET | `/api/sessions/:id` | Yes | Read one session |
| POST | `/api/sessions` | Yes | Create a session |
| PATCH | `/api/sessions/:id` | Yes | Update a session |
| DELETE | `/api/sessions/:id` | Yes | Delete a session |

## Scripts

- `npm run dev` — Start the dev server with hot reload
- `npm run build` — Compile TypeScript to `dist/`
- `npm start` — Run the compiled server
- `npm run typecheck` — Type-check without emitting

## Author

**Jeric Lique** — ITELECT4 Student