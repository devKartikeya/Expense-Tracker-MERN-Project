# 📊 Xpense Tracker

A modern expense tracking application built with **React (frontend)** and **Express + MongoDB (backend)**.  
It includes authentication, expense analytics, secure password reset with email integration, and a **strict Admin Panel verification flow** for maximum security.

Xpense Tracker is not just a product but a project with an aim to solve a problem and provide its users the peace and security they deserve.  

The product is **reliable, scalable, and secure**.

---

## 🚀 Features

### 🔗 Single Page Application
- App-like feel with smooth transitions
- Protected routes with middleware

### 🔐 Authentication
- Signup & Login with JWT-based sessions
- Secure password hashing with bcrypt
- Protected routes with middleware

### 💸 Expense Management
- Add, view, and categorize expenses
- Dynamic categories fetched from MongoDB
- Autocomplete with icons for category selection
- Daily breakdowns, monthly totals, and top categories

### 📈 Analytics Dashboard
- Interactive charts (Pie, Bar, Line) for expense insights
- Animated metrics and brutalist typography

### ✉️ Password Reset Flow
- Forgot Password → Email reset link
- Secure token-based reset with expiry
- Nodemailer integration with Gmail App Passwords

### 👤 Profile Page
- User details (username, email, join date)
- Expense stats (total, monthly trend, top category)
- Change Password & Delete Account
- Strict Admin Panel verification popup:
  - User must re-enter their own credentials before accessing Admin Panel
  - Double-layer security: valid user + admin credentials

### 📬 Contact & About
- Contact Us form saves messages to Gmail + MongoDB
- Interactive About Us page

### 🎨 Modern UI
- Responsive layouts with Tailwind CSS
- Gradient themes, glowing accents, glassmorphism
- Brutalist design for Admin Panel
- Smooth transitions and hover animations
- Blurred background modals for logout & admin verification

---

## 🛠️ Tech Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React, React Router, React Hook Form, Tailwind CSS |
| Backend    | Node.js, Express.js |
| Database   | MongoDB Atlas |
| Auth       | JWT, bcrypt |
| Email      | Nodemailer (Gmail App Passwords) |

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/your-username/xpense-tracker.git
cd xpense-tracker
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file:
```env
PORT=3000
MONGO_URI="your_mongo_connection_string"
JWT_SECRET_KEY="your_secret_key"
EMAIL_USER="your_gmail@gmail.com"
EMAIL_PASSWORD="your_app_password"   # 16-char app password (no spaces)
```

Run backend:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## 🔑 Password Reset Flow
- User clicks **Forgot Password** → enters username + email.
- Backend generates a token and sends reset link via Nodemailer.
- User clicks link → React ResetPassword page opens (`/reset-password/:token`).
- User enters new password → backend validates token & updates password.

---

## 📬 Nodemailer Setup
- Enable 2-Step Verification in Gmail.
- Generate an App Password (16 characters, no spaces).
- Use that in `.env` as `EMAIL_PASSWORD`.

---

## 📊 (Frontend UI)
- Login / Signup → Gradient forms with validation
- Forgot Password → Modern form with icons & feedback
- Reset Password → Secure token-based reset page
- Dashboard → Charts for expense analytics
- Profile → Brutal Admin Panel verification popup
- Category Management → Dynamic MongoDB categories with icons

---

## 📌 Future Improvements
- ✅ Email verification on signup  
- ✅ Password strength meter  
- ✅ Deploy backend on Render/Heroku & frontend on Vercel/Netlify  
- ✅ Switch to SendGrid/Mailgun for production email delivery  
- ✅ Role-based access control for Admin Panel  

---

## 👨‍💻 Author
Developed by **Kartikeya ✨**  
Built with ❤️ using React, Express, and MongoDB.  

---
