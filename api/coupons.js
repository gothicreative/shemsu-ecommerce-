import express from 'express';
import cors from 'cors';
import { getCoupon, validateCoupon } from '../../backend/controllers/coupon.controller.js';

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
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
