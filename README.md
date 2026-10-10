# TaskFlow

TaskFlow is a full-stack task management application built with the MERN stack. Users can register, log in, and manage their personal tasks with priorities, statuses, due dates, search, and filters.

## Features

- **Authentication:** Register and log in using JWT authentication.
- **Password security:** Passwords hashed with bcrypt.
- **Session persistence:** Restore the user's session after refreshing the page.
- **Task management:** Create, edit, and delete tasks.
- **User-specific access:** Users can access only their own tasks.
- **Priority management:** Low, medium, and high priorities.
- **Status tracking:** To-do, in-progress, and done statuses.
- **Due dates:** Highlight overdue tasks.
- **Search and filters:** Search by task title and filter by status or priority.
- **Quick status updates:** Change task status directly from task cards.
- **Dashboard:** Display live task counters.

## Technologies

**Frontend**
- React 18
- Vite
- React Router
- Context API

**Backend**
- Node.js
- Express.js
- JWT authentication
- bcryptjs
- CORS
- dotenv

**Database**
- MongoDB
- Mongoose

## Project Structure

```text
taskflow/
├── server/     # Express API, configuration, models, middleware, and routes
└── client/     # React application, pages, components, and context
```

## Prerequisites

- Node.js 18 or later
- MongoDB running locally or a MongoDB Atlas database
- npm

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:khanshahnwaz/TaskManager_MERN_StartupMeu.git
cd TaskManager_MERN_StartupMeu
```

### 2. Configure the backend

```bash
cd server
npm install
```

Copy `.env.example` to `.env` and configure the environment variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Add any other environment variables required by your implementation.

### 3. Install frontend dependencies

Open a new terminal and run:

```bash
cd taskflow/client
npm install
```

## Running the Application

Start the backend in the first terminal:

```bash
cd server
npm run dev
```

The API runs at `http://localhost:5000`.

Start the frontend in a second terminal:

```bash
cd client
npm run dev
```

The React application runs at `http://localhost:5173`.

The Vite development server proxies `/api` requests to the Express backend.

## API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new account |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Get the current user |
| GET | `/api/tasks` | List tasks with optional filters |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

The task listing endpoint supports the `status`, `priority`, and `search` query parameters.

## AI-Assisted Development

## AI Tool Used

**Tool used:** Code0

## AI Development Experience

I used an AI development tool as an assistant while building TaskFlow, a task management application using the MERN stack. I worked on both the React frontend and the Express backend, including authentication, task management, database models, and API integration.

The main thing I focused on was making the different parts of the application work together. For example, the frontend needs to send the JWT with protected API requests, the backend needs to verify the token, and the database queries need to ensure that each user can access only their own tasks.

I also paid attention to handling loading states, displaying errors, validating task data, and keeping the dashboard updated after creating, editing, deleting, or changing the status of a task. I reviewed the generated code against the application's requirements rather than treating AI-generated suggestions as automatically correct.

### Tasks Where I Used the AI Tool

1. **Component development:** Worked on reusable React components for authentication, task creation and editing, task cards, and the dashboard. The login and registration screens share an authentication component, while the task form supports both creating and editing tasks.

2. **API creation:** Worked on Express endpoints for registration, login, retrieving the current user, and creating, listing, updating, and deleting tasks. JWT middleware protects the task routes and identifies the authenticated user.

3. **Debugging and error handling:** Worked on handling API errors, restoring authentication after a page refresh, and keeping the frontend state synchronized with backend changes. The application displays error messages when requests fail and uses a loading state during authentication.

4. **Database integration:** Integrated MongoDB using Mongoose models for users and tasks. Added password hashing with bcrypt, schema validation, task ownership through user references, and filtering by task status, priority, and title.

5. **Code organization and refactoring:** Organized the frontend into pages, reusable components, an authentication context, and a shared API helper. Configured the Vite development proxy to forward `/api` requests to Express and centralized request headers, JSON serialization, and error handling.


