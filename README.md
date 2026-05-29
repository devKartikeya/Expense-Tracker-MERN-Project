# 📊 Xpense Tracker

A modern expense tracking application built with React (frontend) and Express + MongoDB (backend).
It includes authentication, expense analytics, secure password reset with email integration, and a powerful Admin Panel with strict verification flow for maximum security and control.

Xpense Tracker is not just a product but a project designed to solve real-world financial tracking problems while providing users the peace, reliability, and security they deserve.

The application is built to be secure, scalable, responsive, and production-ready.

---

🚀 Features

🔗 Single Page Application

- Smooth app-like experience with seamless navigation
- Protected routes using authentication middleware
- Fast rendering with dynamic frontend updates

---

🔐 Authentication & Security

- JWT-based Signup & Login system
- Secure password hashing using bcrypt
- Token-based authorization
- Protected backend routes
- Secure Logout system
- Password Reset with expiring tokens
- Double-layer Admin Verification system

---

💸 Expense Management

- Add, edit, and delete expenses
- Dynamic categories fetched directly from MongoDB
- Smart autocomplete suggestions with icons
- Expense categorization and filtering
- Daily, weekly, and monthly breakdowns
- Top spending category tracking

---

📈 Analytics Dashboard

- Interactive Pie, Bar, and Line charts
- Real-time expense insights
- Monthly trends and spending analysis
- Animated dashboard statistics
- Responsive data visualization

---

👤 Profile Management

- User profile with account details
- Join date and activity overview
- Total expenses and category insights
- Change Password functionality
- Secure Delete Account option

---

🛡️ Advanced Admin Panel

A dedicated Admin Panel built with strict security and full application control.

🔒 Admin Security Flow

Before accessing the Admin Panel:

- User must verify their own credentials
- Admin credentials are verified separately
- Double-layer authentication ensures maximum protection

⚡ Admin Features

- 👥 View all registered users
- ❌ Delete users from database
- 🗂️ Manage expense categories dynamically
- ➕ Add new categories directly from Admin Panel
- ✏️ Update category names and icons
- 🗑️ Remove unnecessary categories
- 📊 Monitor application statistics
- 📈 View user growth and activity insights
- 💬 Manage contact messages submitted by users
- 🔄 Dynamic frontend updates through backend/database integration

🎨 Admin UI

- Brutalist-inspired dashboard design
- Glassmorphism effects and glowing accents
- Responsive layouts for all devices
- Blurred modal verification popups
- Smooth transitions and interactive controls

---

✉️ Password Reset System

- Forgot Password email flow
- Secure reset links with token expiry
- Nodemailer integration using Gmail App Passwords
- Safe password update process

---

📬 Contact & About

- Contact Us form integrated with MongoDB + Gmail
- Messages stored securely in database
- Interactive About Us page with modern UI

---

🎨 Modern UI/UX

- Fully responsive design with Tailwind CSS
- Gradient themes and glowing visual effects
- Smooth hover animations and transitions
- Clean component-based architecture
- Modern dashboard layouts

---

🛠️ Tech Stack

Layer| Technology
Frontend| React.js, Tailwind CSS
Backend| Node.js, Express.js
Database| MongoDB
Authentication| JWT, bcrypt
Email Service| Nodemailer
Charts & Analytics| Recharts
Styling| Tailwind CSS, Custom UI
State Management| React Hooks

---

🎯 Project Goal

Xpense Tracker aims to provide users with a modern, secure, and intelligent platform for managing expenses efficiently while maintaining simplicity, speed, and strong security practices.

The project focuses on combining:

- Real-world functionality
- Modern frontend experiences
- Scalable backend architecture
- Advanced authentication flows
- Secure admin-level management systems

into one complete full-stack application.swords) |

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
