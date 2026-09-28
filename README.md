# Task Manager API

A RESTful Task Management API built with Node.js, Express.js, and PostgreSQL. The application provides secure user authentication, role-based authorization, task CRUD operations, request validation, and user-specific task access.

## Features

* User registration and login
* Password hashing using bcrypt
* JWT-based authentication
* Role-based authorization
* Admin-only user management
* Create, read, update, and delete tasks
* Users can access only their own tasks
* Request validation
* Centralized error handling
* PostgreSQL database integration

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* JWT (JSON Web Token)
* bcrypt
* Postman / Thunder Client for API testing

## Project Structure

```text
task-manager-api/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   └── taskController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   ├── validationMiddleware.js
│   └── errorMiddleware.js
│
├── routes/
│   ├── userRoutes.js
│   └── taskRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

## Authentication

The API uses JWT for authentication.

After successful login, the server returns a JWT containing the authenticated user's ID and role.

Protected endpoints require the token in the Authorization header:

```text
Authorization: Bearer <JWT_TOKEN>
```

## Authorization

The application implements role-based access control.

There are two roles:

* `user`
* `admin`

Normal users can manage their own tasks.

Admin-only endpoints require the authenticated user's role to be `admin`.

## API Endpoints

### User Endpoints

| Method | Endpoint           | Description                        | Authentication |
| ------ | ------------------ | ---------------------------------- | -------------- |
| POST   | `/users/register`  | Register a new user                | No             |
| POST   | `/users/login`     | Login and receive JWT              | No             |
| GET    | `/users/profile`   | Get authenticated user information | Required       |
| GET    | `/users/admin/all` | Get all users                      | Admin          |

### Task Endpoints

| Method | Endpoint     | Description         | Authentication |
| ------ | ------------ | ------------------- | -------------- |
| POST   | `/tasks/`    | Create a task       | Required       |
| GET    | `/tasks/`    | Get user's tasks    | Required       |
| GET    | `/tasks/:id` | Get a specific task | Required       |
| PUT    | `/tasks/:id` | Update a task       | Required       |
| DELETE | `/tasks/:id` | Delete a task       | Required       |

## Task Ownership

Tasks are associated with the authenticated user's ID.

When accessing, updating, or deleting a task, the API checks both:

```text
task ID
+
authenticated user ID
```

This prevents one user from accessing or modifying another user's tasks.

## Example Task

### Create Task

```http
POST /tasks/
```

Request body:

```json
{
  "title": "Practice DSA",
  "description": "Solve binary search problems",
  "status": "pending"
}
```

Example response:

```json
{
  "message": "task created successfully",
  "task": {
    "id": 1,
    "title": "Practice DSA",
    "description": "Solve binary search problems",
    "status": "pending",
    "user_id": 4,
    "created_at": "2026-09-20T08:10:28.660Z"
  }
}
```

## Validation

The API validates incoming requests before processing them.

Examples of rejected requests include:

* Missing required fields
* Password shorter than the required length
* Missing login password
* Missing task title

## Error Handling

The API handles common errors such as:

* Invalid credentials
* Missing authentication token
* Invalid or expired JWT
* Unauthorized role access
* Task not found
* Invalid request data
* Duplicate user email

## Running the Project

### 1. Clone the repository

```bash
git clone <your-repository-url>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_management
DB_USER=your_database_user
DB_PASSWORD=your_database_password
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` to GitHub.

### 4. Start the server

```bash
node server.js
```

The API will run on:

```text
http://localhost:3000
```

## Testing

The API was tested using Postman / Thunder Client, including:

* Successful registration
* Successful login
* JWT authentication
* Invalid credentials
* Missing JWT
* Invalid JWT
* Task creation
* Task retrieval
* Task update
* Task deletion
* Task ownership protection
* Admin authorization
* Request validation
* Not-found handling

## Future Improvements

Possible future enhancements include:

* Pagination
* Task filtering and searching
* Task due dates
* Task priorities
* Refresh tokens
* Automated unit and integration tests
* API documentation using Swagger/OpenAPI
* Docker support
