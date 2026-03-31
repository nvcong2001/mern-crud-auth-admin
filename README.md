# 🚀 Fullstack JWT Authentication & CRUD App

A fullstack web application that implements **user authentication (JWT)** and **basic CRUD operations** using modern technologies.

---

## 📌 Tech Stack

### 🔙 Backend

* Node.js
* Express.js
* MongoDB
* JWT (Authentication & Authorization)
* Bcrypt (Password hashing)
* Cookie Parser

### 🔜 Frontend

* React + Vite + TypeScript
* Tailwind CSS
* Zustand (State Management)
* Axios (API calls)
* Ant Design (UI Components)
* Sonner (Toast Notifications)

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected routes
* Password hashing with bcrypt

### 📦 CRUD System

* Create, Read, Update, Delete data
* RESTful API structure
* Error handling & validation

### 🎨 Frontend

* Responsive UI with TailwindCSS
* Clean UI with Ant Design
* Global state management using Zustand
* API integration with Axios
* Toast notifications using Sonner

---

## 📂 Project Structure

```
.
├── be-mongodb/        # Backend (Node.js + Express + MongoDB)
│   ├── src/
│   ├── package.json
│
├── fe/                # Frontend (React + Vite + TS)
│   ├── src/
│   ├── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔧 Backend

```bash
cd be-mongodb
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run server:

```bash
npm run dev
```

---

### 💻 Frontend

```bash
cd fe
npm install
```

Run app:

```bash
npm run dev
```

---
## 🔒 Authentication Flow

1. User logs in → Server returns JWT
2. JWT stored (cookie/localStorage)
3. Axios sends token in request
4. Backend verifies token via middleware
5. Access granted to protected routes

---

## 📸 Screenshots (Optional)

> Add your UI screenshots here

---

## 🚀 Future Improvements

* Refresh Token
* Role-based authorization (Admin/User)
* Docker deployment
* CI/CD integration
* Unit & Integration testing

---

## 👨‍💻 Author

* Name: Nguyen Van Cong
* GitHub: https://github.com/nvcong2001

---

## ⭐ Notes

This project is built for learning and practicing:

* Fullstack development
* Authentication (JWT)
* RESTful API design
* Modern React ecosystem

---

👉 If you find this project useful, give it a ⭐!
