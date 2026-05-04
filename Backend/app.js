const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { checkSignUp, checkLogin } = require('./middlewares/auth.middleware');
const { authRegister, authLogin, authCheckUser, authCheckLogin } = require('./controllers/auth.controller');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/auth/check", checkLogin, authCheckLogin);
app.post('/signup', checkSignUp, authRegister);
app.post('/login', authLogin);
app.post('/check-email', authCheckUser);

// XIpjPCfVNzudfLmO
// mongodb+srv://kartikeya2122008_db_user:XIpjPCfVNzudfLmO@cluster0.tipdh27.mongodb.net/?appName=Cluster0

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});