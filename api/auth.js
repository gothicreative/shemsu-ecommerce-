import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { signup, login, logout, refreshToken, getProfile } from '../backend/controllers/auth.controller.js';
import { protectRoute } from '../backend/middleware/auth.middleware.js';
import { connectDB } from '../backend/lib/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/logout', logout);
app.post('/refresh-token', refreshToken);
app.get('/profile', protectRoute, getProfile);

// Export Vercel handler
export default async function handler(req, res) {
  // Ensure database is connected
  await connectDB();
  
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
