# React Assignment - Full Stack Production Build

This workspace contains a complete React + Express + MongoDB implementation for the internship assignment.

## Stack

- Frontend: React, Vite, Tailwind CSS, React Router, Axios, Framer Motion
- Backend: Node.js, Express, MongoDB, Mongoose
- Architecture: Separate frontend/backend folders with REST APIs and clean module boundaries

## Structure

- `frontend/` - polished React UI for the assignment flow and application review screens
- `backend/` - production-style API, models, controllers, routes, validation, and error handling
- `backend/.env` - backend environment template
- `frontend/.env` - frontend environment template

## Local Setup

1. Install dependencies from the repository root.
2. Create your `.env` files from the examples.
3. Start the backend and frontend with `npm run dev`.

## API

The frontend talks to the backend through `VITE_API_BASE_URL`, which defaults to `http://localhost:5000/api`.

## Notes

- MongoDB is required for persistence.
- Passwords are hashed before storing in the database.
- The application includes create, read, update, and delete endpoints for a real backend flow.
