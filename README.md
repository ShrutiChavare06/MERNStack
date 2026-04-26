# 🎂 Sweet Bakes - Cake Shop Authentication System

A full-stack MERN (MongoDB, Express, React, Node.js) authentication system for a cake shop with a beautiful, animated UI.

---

## 📋 Project Overview

Sweet Bakes is a complete authentication system featuring Sign Up, Sign In, and role-based Dashboards (User & Admin) with a stunning pink/pastel cake shop aesthetic, smooth Framer Motion animations, and JWT-based security.

---

## ✨ Features

- **Sign Up** – Register with First Name, Last Name, Email, Password, and Role (User/Admin)
- **Sign In** – Authenticate with email & password, get JWT token
- **Role-Based Dashboard** – Separate UI for Users (Customers) and Admins (Bakers)
- **Protected Routes** – Only authenticated users can access the dashboard
- **JWT Authentication** – Secure token stored in localStorage
- **Password Hashing** – bcryptjs with salt rounds of 12
- **Form Validation** – Client-side + server-side validation
- **Toast Notifications** – react-hot-toast for success/error messages
- **Loading Spinners** – Visual feedback during API calls
- **Responsive Design** – Works on mobile and desktop
- **Animated UI** – Framer Motion page transitions, floating cake emojis, hover effects

---

## 🛠 Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Frontend    | React.js, Framer Motion, Bootstrap 5, React Icons |
| Backend     | Node.js, Express.js                 |
| Database    | MongoDB, Mongoose                   |
| Auth        | JWT (jsonwebtoken), bcryptjs        |
| HTTP Client | Axios                               |
| Notifications | react-hot-toast                   |

---

## 📁 Folder Structure

```
CakeShopSystems/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT protect middleware
│   ├── models/
│   │   └── User.js            # Mongoose User schema
│   ├── routes/
│   │   └── auth.js            # Auth API routes
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example env file
│   ├── package.json
│   └── server.js              # Express app entry point
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js          # Top navigation bar
│   │   │   └── ProtectedRoute.js  # Route guard
│   │   ├── context/
│   │   │   └── AuthContext.js     # Global auth state
│   │   ├── pages/
│   │   │   ├── SignUp.js          # Registration page
│   │   │   ├── SignIn.js          # Login page
│   │   │   └── Dashboard.js       # User/Admin dashboard
│   │   ├── App.js                 # Router + layout
│   │   ├── App.css                # Global styles
│   │   └── index.js               # React entry point
│   └── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js v16+ installed
- MongoDB running locally OR a MongoDB Atlas connection string
- npm or yarn

---

### Step 1: Clone / Extract the Project

```bash
cd CakeShopSystems
```

### Step 2: Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file (copy from `.env.example`):

```bash
cp .env.example .env
```

Edit `.env`:

```
MONGO_URI=mongodb://localhost:27017/cakeshop
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### Step 3: Setup Frontend

```bash
cd ../frontend
npm install
```

### Step 4: Run the Application

**Terminal 1 – Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 – Start Frontend:**
```bash
cd frontend
npm start
```
Frontend opens at: http://localhost:3000

---

## 🌐 API Endpoints

| Method | Endpoint              | Description              | Auth Required |
|--------|-----------------------|--------------------------|---------------|
| POST   | /api/auth/register    | Register new user        | No            |
| POST   | /api/auth/login       | Login & get JWT token    | No            |
| GET    | /api/auth/me          | Get current user info    | Yes (JWT)     |

---

## 🔐 Database Schema

```js
User {
  firstName: String (required, min 2)
  lastName:  String (required, min 2)
  email:     String (required, unique)
  password:  String (hashed with bcrypt)
  role:      String (enum: 'user' | 'admin', default: 'user')
  createdAt: Date
  updatedAt: Date
}
```

---

## 🖥 Frontend Routes

| Route        | Description                     | Protected |
|--------------|---------------------------------|-----------|
| /signup      | Registration page               | No        |
| /login       | Login page                      | No        |
| /dashboard   | User or Admin dashboard         | Yes       |

---

## 🧪 Demo Credentials

After creating accounts manually or using the register form:

| Role  | Email             | Password |
|-------|-------------------|----------|
| User  | user@cake.com     | 123456   |
| Admin | admin@cake.com    | 123456   |

> Create these via the Sign Up page or using a tool like Postman/curl.

---

## 🎨 Design Highlights

- **Color Palette:** Soft pinks, purples, rose tones
- **Typography:** Playfair Display (headings) + Nunito (body)
- **Animations:** Framer Motion page transitions, floating cake emojis, pulsing icon
- **Cards:** Glassmorphism effect with backdrop blur
- **Responsive:** Mobile-first, adapts to all screen sizes

---

## 📦 Dependencies

### Backend
- express, mongoose, bcryptjs, jsonwebtoken, cors, dotenv, nodemon

### Frontend
- react, react-router-dom, axios, framer-motion, react-hot-toast, react-icons, bootstrap

---

## 🚀 Production Notes

- Change `JWT_SECRET` to a strong random string in production
- Use MongoDB Atlas for cloud database
- Set `REACT_APP_API_URL` env var for the frontend pointing to your deployed backend
- Enable HTTPS in production

---

Made with 🎂 by Sweet Bakes Dev Team
