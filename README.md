# 📦 Secure E-Commerce Frontend (React)

## 🚀 Project Overview

This is the **frontend application** for the Secure E-Commerce system.
It is built using **React** and communicates with a **Spring Boot backend** to provide a complete online shopping experience with enhanced security features.

The application allows users to browse products, manage cart items, and perform secure checkout with **risk-based authentication (OTP / Biometric)**.

---

## 🛠️ Tech Stack

* **React (Vite)**
* **React Router**
* **Axios**
* **Context API (Global State)**
* **Tailwind CSS**
* **JWT Authentication**
* **React Toastify (Notifications)**

---

## ✨ Features

### 🟢 User Features

* View products with **pagination**
* **Search & sort** products
* Add/remove items from **cart**
* Quantity management in cart
* Checkout flow with **risk-based security**
* OTP verification (Medium risk)
* Biometric verification (High risk)
* Payment simulation page
* Order history

---

### 🔐 Authentication & Security

* **Login & Register**
* JWT token stored in **localStorage**
* Protected routes using **React Router**
* Role-based UI (Admin access)

---

### 🧠 Smart Checkout Flow

```text
LOW Risk    → Direct Order → Payment Page
MEDIUM Risk → OTP Verification → Payment Page
HIGH Risk   → Biometric Verification → Payment Page
```

---

## 📁 Folder Structure

```text
src/
│
├── api/              # Axios configuration & API calls
├── components/       # Navbar, ProtectedRoute
├── context/          # CartContext (Global state)
├── pages/            # All pages (Products, Cart, Checkout, etc.)
├── utils/            # JWT helper functions
└── App.jsx           # Main routing setup
```

---

## 🔗 Backend Integration

The frontend connects to the backend using **Axios**.

### 🔹 Base URL (example)

```js
http://localhost:8080
```

---

### 🔹 API Communication

| Feature    | Endpoint                        |
| ---------- | ------------------------------- |
| Products   | `/api/products`                 |
| Login      | `/api/users/login`              |
| Register   | `/api/users/register`           |
| Checkout   | `/api/orders/checkout/{userId}` |
| OTP Verify | `/api/otp/verify`               |

---

### 🔹 Axios Setup

* Centralized API instance
* **Request Interceptor** → attaches JWT token
* **Response Interceptor** → handles 401 errors

---

### 🔹 Authentication Flow

```text
Login → Receive JWT → Store in localStorage
→ Attach token in Authorization header
→ Backend validates → Access granted
```

---

## 🔐 Security Handling

* Token stored in **localStorage**
* Sent in:

```text
Authorization: Bearer <token>
```

* Protected routes using **ProtectedRoute component**
* UI changes based on **user role**

---

## 🛒 Cart Management

* Managed using **Context API**
* Features:

  * Add to cart
  * Remove item
  * Increase / decrease quantity
  * Auto update cart badge in navbar

---

## ⚙️ Installation & Setup

```bash
# Clone repo
git clone <your-frontend-repo-url>

# Navigate
cd ecommerce-frontend

# Install dependencies
npm install

# Run project
npm run dev
```

---

## 🌐 Deployment

You can deploy this frontend on:

* Vercel
* Netlify
* Render (Static)

---

## 📌 Important Notes

* Backend must be running for full functionality
* Ensure correct API base URL in `api/axios.js`
* JWT token is required for protected routes

---

## 🎯 Future Improvements

* Payment gateway integration (Stripe/Razorpay)
* Product filters & categories
* User profile page
* Order tracking system

---

## 👨‍💻 Author

**Abhishek M T**

---

## ⭐ Final Note

This project demonstrates:

* Full-stack integration
* Secure authentication (JWT)
* Risk-based transaction handling
* Clean UI with React
