import express from 'express';
import cors from 'cors';
import { getAnalyticsData, getDailySalesData } from '../../backend/controllers/analytics.controller.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', getAnalyticsData);
app.get('/daily-sales', getDailySalesData);

// Export Vercel handler
export default async function handler(req, res) {
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
