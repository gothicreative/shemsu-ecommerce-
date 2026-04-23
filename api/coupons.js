import express from 'express';
import cors from 'cors';
import { getCoupon, validateCoupon } from '../backend/controllers/coupon.controller.js';
import { connectDB } from '../backend/lib/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/:code', getCoupon);
app.post('/validate', validateCoupon);

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
