import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { signup, login, logout, refreshToken } from '../../backend/controllers/auth.controller.js';

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

// Export Vercel handler
export default async function handler(req, res) {
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
