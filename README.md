# User Management System 🚀

Full-stack user management with JWT authentication, role-based access, and admin dashboard.

## 📋 Project Overview

**Purpose:** Secure web app for managing user accounts with role-based access control (Admin/User dashboards).

**Features:** 🔐 JWT authentication • 👥 Role-based access • ✏️ CRUD operations • 📊 Real-time stats • 📱 Responsive design • 🌙 Dark mode • ✅ Toast notifications

**Tech Stack:** Node.js • Express • MongoDB • Mongoose • React • Tailwind CSS • JWT • bcrypt

---

## 🔧 Quick Setup

### 1. Install

```bash
git clone <repo-url>
cd "Backend Developer"

# Backend
cd Backend && npm install && cp .env.example .env

# Frontend
cd ../frontend && npm install
```

### 2. Configure Environment

**Backend (.env):**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/user-management
# Atlas: mongodb+srv://user:pass@cluster.mongodb.net/user-management
JWT_SECRET=your-32-character-secret-key-here
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env):** `REACT_APP_API_URL=http://localhost:5000/api`

### 3. Database Setup

**MongoDB Atlas:**

1. [Sign up](https://www.mongodb.com/cloud/atlas/register) → Create cluster (Free M0)
2. Database Access → Add user → Network Access → Add IP (0.0.0.0/0)
3. Connect → Copy connection string → Update MONGODB_URI

### 4. Run

```bash
# Terminal 1 - Backend
cd Backend && npm run dev  # http://localhost:5000

# Terminal 2 - Frontend
cd frontend && npm start   # http://localhost:3000

# Optional: Seed sample data
cd Backend && npm run seed  # admin@example.com / Password123
```

---

## 📚 API Documentation

**Base:** `http://localhost:5000/api` | **Auth:** `Authorization: Bearer <token>`

### Endpoints

**Authentication:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register user |
| POST | `/auth/login` | Login user |
| GET | `/auth/me` | Get current user ⚠️ |
| POST | `/auth/logout` | Logout ⚠️ |

**User Profile:** ⚠️ = Auth required
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users/profile` | Get profile ⚠️ |
| PUT | `/users/profile` | Update profile ⚠️ |
| PUT | `/users/password` | Change password ⚠️ |

**Admin:** 🔒 = Admin only
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/admin/users?page=1&limit=10&search=john&role=user` | List users 🔒 |
| GET | `/admin/users/:id` | Get user 🔒 |
| PUT | `/admin/users/:id/activate` | Activate 🔒 |
| PUT | `/admin/users/:id/deactivate` | Deactivate 🔒 |
| DELETE | `/admin/users/:id` | Delete 🔒 |
| GET | `/admin/stats` | Statistics 🔒 |

### Request/Response Examples

**Signup:**

```json
POST /api/auth/signup
{ "fullName": "John Doe", "email": "john@example.com", "password": "Pass123!", "confirmPassword": "Pass123!" }

Response (201): { "success": true, "token": "jwt-token...", "user": {...} }
```

**Login:**

```json
POST /api/auth/login
{ "email": "john@example.com", "password": "Pass123!" }

Response (200): { "success": true, "token": "jwt-token...", "user": {...} }
```

**Get Users (Admin):**

```
GET /api/admin/users?page=1&limit=10
Headers: Authorization: Bearer <admin-token>

Response: { "success": true, "users": [...], "total": 45, "page": 1, "pages": 5 }
```

**Get Stats (Admin):**

```json
GET /api/admin/stats
Response: { "success": true, "stats": { "totalUsers": 150, "activeUsers": 135, "adminUsers": 5, "newUsersThisWeek": 12 } }
```

### Status Codes

- `200` OK • `201` Created • `400` Bad Request • `401` Unauthorized • `403` Forbidden • `404` Not Found • `500` Server Error

### Postman Collection

Import `postman_collection.json` → Set variables: `base_url`, `token`, `admin_token`

---

## 🌐 Deployment

### MongoDB Atlas

1. [Atlas](https://mongodb.com/cloud/atlas/register) → Create cluster (FREE M0)
2. Database Access → Add user → Network Access → Add IP (0.0.0.0/0)
3. Connect → Copy URI → `mongodb+srv://user:pass@cluster.mongodb.net/user-management`

### Backend - Vercel

```bash
npm i -g vercel && cd Backend && vercel login && vercel
# Dashboard → Environment Variables:
# NODE_ENV=production, MONGODB_URI, JWT_SECRET, JWT_EXPIRE, FRONTEND_URL
vercel --prod
```

**Alternative: Render** - [Render.com](https://render.com) → New Web Service → Connect repo → Build: `npm install`, Start: `npm start`

### Frontend - Vercel

```bash
cd frontend
echo "REACT_APP_API_URL=https://your-backend.vercel.app/api" > .env.production
vercel --prod
```

**Alternative: Netlify** - `npm i -g netlify-cli && npm run build && netlify deploy --prod --dir=build`

### Post-Deployment

- [ ] Update backend FRONTEND_URL with actual frontend URL
- [ ] Test signup/login/admin features
- [ ] Verify CORS working

---

## 📁 Structure

```
Backend Developer/
├── Backend/
│   ├── config/database.js
│   ├── controllers/ (auth, user, admin)
│   ├── middleware/ (auth, errorHandler, validator)
│   ├── models/User.js
│   ├── routes/ (auth, user, admin)
│   └── server.js
├── frontend/src/
│   ├── admin/ (AdminDashboard, UserTable)
│   ├── component/ (Login, Registration, Toast, Modal)
│   ├── services/ (api, authService, userService, adminService)
│   └── App.js
└── README.md
```

---

## 🧪 Testing

```bash
cd Backend && npm test           # Run tests
npm run test:watch               # Watch mode
```

---

## 🆘 Troubleshooting

| Issue              | Fix                                  |
| ------------------ | ------------------------------------ |
| MongoDB connection | `mongosh` or check Atlas URI         |
| CORS errors        | Verify FRONTEND_URL matches frontend |
| JWT errors         | JWT_SECRET min 32 chars              |
| Module errors      | `rm -rf node_modules && npm install` |

---

## 📄 Info

**License:** ISC | **Author:** Your Name | **Contact:** your-email@example.com

**Acknowledgments:** [Express](https://expressjs.com/) • [React](https://react.dev/) • [MongoDB](https://mongodb.com/) • [Tailwind](https://tailwindcss.com/)

---

✅ **100% Complete & Production-Ready** | Made with ❤️ | ⭐ Star if helpful!
