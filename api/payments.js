import express from 'express';
import cors from 'cors';
import { createPaymentIntent } from '../../backend/controllers/payment.controller.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.post('/create-intent', createPaymentIntent);

// Export Vercel handler
export default async function handler(req, res) {
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
