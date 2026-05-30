📊 Xpense Tracker

A modern full-stack personal finance management platform built with React, Express.js, and MongoDB.

Xpense Tracker helps users efficiently manage their finances by tracking expenses, monitoring income, analyzing financial trends, and generating actionable insights through interactive dashboards and detailed transaction reports.

The platform combines powerful analytics, secure authentication, dynamic category management, and an advanced Admin Panel to deliver a reliable, scalable, and production-ready financial tracking solution.

---

🚀 Features

🔗 Single Page Application

- Smooth app-like experience
- Fast rendering with React
- Protected routes using authentication middleware
- Dynamic frontend updates from backend data
- Responsive design across devices

---

🔐 Authentication & Security

- JWT-based authentication
- Secure Signup & Login system
- Password hashing with bcrypt
- Protected backend routes
- Token-based authorization
- Secure Logout functionality
- Password Reset via email
- Expiring reset tokens
- Double-layer Admin Verification

---

💸 Expense & Income Management

Expense Tracking

- Add expenses
- Edit expenses
- Delete expenses
- Categorize expenses
- Dynamic category suggestions

Income Tracking

- Add income transactions
- Track multiple income sources
- Categorize income records
- Monitor overall earnings

Category Management

- Dynamic categories fetched from MongoDB
- Smart autocomplete suggestions
- Category icons support
- Create custom categories
- Store custom categories directly in database
- Real-time category updates

---

📊 Transaction Analytics & Ledger

A dedicated financial analytics system designed to provide complete visibility into spending and earnings.

📈 Financial Overview

- Income vs Expense comparison
- Interactive charts and reports
- Real-time financial calculations
- Net balance tracking
- Profit/Loss analysis
- Savings insights

💹 Financial Metrics

- Total Income
- Total Expenses
- Current Balance
- Net Profit
- Net Loss
- Monthly Performance Overview

📒 Transaction Ledger

- Unified transaction history
- Day-wise financial records
- Income and Expense entries together
- Daily Profit/Loss calculations
- Running balance calculations
- Complete transaction tracking

🔍 Ledger Filters

Filter analytics and records by:

- Current Month
- Last 2 Months
- Last 6 Months
- Current Year
- All Time

---

📈 Analytics Dashboard

- Interactive Pie Charts
- Bar Charts
- Line Charts
- Expense Category Analysis
- Income vs Expense Visualization
- Monthly Spending Trends
- Financial Growth Tracking
- Animated Statistics Cards
- Responsive Data Visualizations

---

👤 Profile Management

- User Profile Overview
- Account Information
- Join Date Tracking
- Financial Statistics
- Expense Summary
- Income Summary
- Change Password
- Secure Account Deletion

---

🛡️ Advanced Admin Panel

A dedicated administrative dashboard with strict security and full platform control.

🔒 Admin Security Flow

Before accessing the Admin Panel:

1. User verifies personal credentials
2. Admin credentials are verified separately
3. Access granted only after successful dual verification

This provides a double-layer authentication mechanism for enhanced security.

---

⚡ Admin Features

👥 User Management

- View all registered users
- Delete users
- Monitor user activity

🗂️ Category Management

- Add categories
- Update categories
- Delete categories
- Manage category icons
- Dynamic MongoDB integration

📊 Platform Statistics

- Monitor platform growth
- Analyze application usage
- View user statistics
- Track financial activity metrics

💬 Contact Management

- View user messages
- Manage contact requests
- Monitor support interactions

🔄 Dynamic Content Management

- Real-time updates from database
- Dynamic frontend synchronization
- Centralized application control

---

✉️ Password Reset System

- Forgot Password workflow
- Email-based reset links
- Secure token generation
- Token expiration handling
- Password update validation
- Gmail integration via Nodemailer

---

📬 Contact & About

Contact System

- Contact Us form
- Message storage in MongoDB
- Email forwarding using Nodemailer
- Secure message handling

About Page

- Interactive company/project overview
- Modern UI design
- Responsive layout

---

🎨 Modern UI / UX

Design Features

- Tailwind CSS powered UI
- Glassmorphism effects
- Gradient themes
- Glowing accents
- Smooth animations
- Hover interactions
- Responsive layouts

User Experience

- Fast navigation
- Clean interface
- Mobile-first responsiveness
- Interactive dashboards
- Blurred modal dialogs
- Premium financial application feel

---

🛠️ Tech Stack

Layer| Technology
Frontend| React.js
Styling| Tailwind CSS
Backend| Node.js
Server| Express.js
Database| MongoDB
Authentication| JWT
Security| bcrypt
Email Service| Nodemailer
Charts & Analytics| Recharts
State Management| React Hooks

---

⚙️ Setup Instructions

1️⃣ Clone Repository

git clone https://github.com/your-username/xpense-tracker.git

cd xpense-tracker

---

2️⃣ Backend Setup

cd backend

npm install

Create a ".env" file:

PORT=3000

MONGO_URI=your_mongo_connection_string

JWT_SECRET_KEY=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASSWORD=your_gmail_app_password

Run backend:

npm start

---

3️⃣ Frontend Setup

cd frontend

npm install

npm run dev

Frontend runs on:

http://localhost:5173

---

🔑 Password Reset Flow

1. User clicks Forgot Password
2. User enters Username and Email
3. Backend generates secure token
4. Nodemailer sends reset link
5. User opens Reset Password page
6. New password is submitted
7. Backend validates token and updates password

---

📬 Nodemailer Setup

1. Enable Gmail 2-Step Verification
2. Generate App Password
3. Copy 16-character password
4. Add it to:

EMAIL_PASSWORD=your_app_password

---

📊 Frontend Pages

Authentication

- Login
- Signup
- Forgot Password
- Reset Password

Core Application

- Dashboard
- Expenses
- Income
- Transactions
- Analytics
- Profile

Admin

- Admin Verification
- Admin Dashboard
- User Management
- Category Management

Additional Pages

- About
- Contact

---

🎯 Project Goal

Xpense Tracker aims to provide users with a secure and intelligent finance management platform capable of tracking both income and expenses while delivering meaningful financial insights.

The platform combines:

- Expense Tracking
- Income Tracking
- Transaction Management
- Financial Analytics
- Profit/Loss Reporting
- Interactive Dashboards
- Category Management
- Secure Authentication
- Email Integrations
- Admin Controls

into one complete modern full-stack financial management solution.

---

📌 Future Improvements

- Email Verification on Signup
- Recurring Transactions
- Budget Planning Tools
- Financial Goals Tracking
- Export Reports (PDF / Excel)
- Dark Mode
- Push Notifications
- Multi-Currency Support
- AI-Based Expense Insights
- Mobile Application Version

---

👨‍💻 Author

Kartikeya Mishra

Built with ❤️ using React, Express.js, MongoDB, and modern web technologies.

---

📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and contribute.
