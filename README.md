📊 Xpense Tracker
A modern expense tracking application built with React (frontend) and Express + MongoDB (backend).
It includes authentication, expense analytics, and a secure password reset flow with email integration using Nodemailer.

🚀 Features
🔐 Authentication

Signup & Login with JWT-based sessions

Protected routes with middleware

💸 Expense Management

Add, view, and categorize expenses

Monthly totals, daily breakdowns, and top categories

📈 Analytics Dashboard

Interactive charts (Pie, Bar, Line) for expense insights

✉️ Password Reset Flow

Forgot Password → Email reset link

Secure token-based reset with expiry

Nodemailer integration with Gmail App Passwords

🎨 Modern UI

Responsive layouts with Tailwind CSS

Gradient themes, glowing accents, smooth transitions

React Hook Form for validation & error handling

🛠️ Tech Stack
Layer	Technology
Frontend	React, React Router, React Hook Form, Tailwind CSS
Backend	Node.js, Express.js
Database	MongoDB Atlas
Auth	JWT, bcrypt
Email	Nodemailer (Gmail App Passwords)


⚙️ Setup Instructions
1. Clone the repo
bash
git clone https://github.com/your-username/xpense-tracker.git
cd xpense-tracker
2. Backend Setup
bash
cd backend
npm install
Create a .env file:

env
PORT=3000
MONGO_URI="your_mongo_connection_string"
JWT_SECRET_KEY="your_secret_key"
EMAIL_USER="your_gmail@gmail.com"
EMAIL_PASSWORD="your_app_password"   # 16-char app password (no spaces)
Run backend:

bash
npm start
3. Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on http://localhost:5173.

🔑 Password Reset Flow
User clicks Forgot Password → enters username + email.

Backend generates a token and sends reset link via Nodemailer.

User clicks link → React ResetPassword page opens (/reset-password/:token).

User enters new password → backend validates token & updates password.

📬 Nodemailer Setup
Enable 2-Step Verification in Gmail.

Generate an App Password (16 characters, no spaces).

Use that in .env as EMAIL_PASSWORD.

📊 Screenshots (Frontend UI)
Login / Signup → Gradient forms with validation

Forgot Password → Modern form with icons & feedback

Reset Password → Secure token-based reset page

Dashboard → Charts for expense analytics

🧩 Project Structure
Code
xpense-tracker/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── mail.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   │   └── auth.routes.js
│   └── app.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ForgotPassword.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── pages/
│   │   └── App.jsx
│   └── tailwind.config.js
│
└── README.md
📌 Future Improvements
✅ Email verification on signup

✅ Password strength meter

✅ Deploy backend on Render/Heroku & frontend on Vercel/Netlify

✅ Switch to SendGrid/Mailgun for production email delivery

👨‍💻 Author
Developed by Kartikeya ✨
Built with ❤️ using React, Express, and MongoDB.