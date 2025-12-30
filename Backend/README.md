# User Management System - Backend API

A complete Node.js + Express + MongoDB backend API for user management with authentication and role-based access control.

## Features

### Authentication

- ✅ User signup with validation
- ✅ User login with JWT authentication
- ✅ Get current user information
- ✅ Logout functionality

### User Management (Admin)

- ✅ View all users with pagination
- ✅ Search and filter users
- ✅ Activate/Deactivate user accounts
- ✅ Delete users
- ✅ View user statistics

### User Profile Management

- ✅ View profile
- ✅ Update profile (name, email)
- ✅ Change password

### Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Protected routes
- ✅ Role-based access control (admin/user)
- ✅ Input validation
- ✅ Error handling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Update `.env` file with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
JWT_SECRET=your-secret-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

4. Start MongoDB service

5. Run the server:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication Routes

#### POST /api/auth/signup

Register a new user

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "user"
}
```

#### POST /api/auth/login

Login user

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### GET /api/auth/me

Get current logged-in user (Protected)

#### POST /api/auth/logout

Logout user (Protected)

### User Routes (Protected)

#### GET /api/users/profile

Get user profile

#### PUT /api/users/profile

Update user profile

```json
{
  "fullName": "John Updated",
  "email": "john.updated@example.com"
}
```

#### PUT /api/users/password

Change password

```json
{
  "currentPassword": "Password123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

### Admin Routes (Protected - Admin Only)

#### GET /api/admin/users

Get all users with pagination
Query params: `page`, `limit`, `role`, `status`, `search`

#### GET /api/admin/users/:id

Get single user by ID

#### PUT /api/admin/users/:id/activate

Activate user account

#### PUT /api/admin/users/:id/deactivate

Deactivate user account

#### DELETE /api/admin/users/:id

Delete user

#### GET /api/admin/stats

Get user statistics

## Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error message",
  "errors": []
}
```

## Validation Rules

### Password Requirements

- Minimum 6 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

### Email Requirements

- Valid email format
- Unique (not already registered)

## Project Structure

```
backend/
├── config/
│   └── database.js          # MongoDB connection
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── userController.js    # User profile logic
│   └── adminController.js   # Admin operations logic
├── middleware/
│   ├── auth.js             # JWT & role verification
│   ├── errorHandler.js     # Global error handler
│   └── validator.js        # Input validation rules
├── models/
│   └── User.js             # User model schema
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── userRoutes.js       # User endpoints
│   └── adminRoutes.js      # Admin endpoints
├── .env                    # Environment variables
├── .env.example           # Example env file
├── server.js              # App entry point
└── package.json
```

## License

ISC
