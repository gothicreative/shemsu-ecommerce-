import express from 'express';
import cors from 'cors';
import { getCartProducts, addToCart, removeAllFromCart, updateQuantity } from '../backend/controllers/cart.controller.js';
import { protectRoute } from '../backend/middleware/auth.middleware.js';
import { connectDB } from '../backend/lib/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', protectRoute, getCartProducts);
app.post('/:productId', protectRoute, addToCart);
app.put('/:productId', protectRoute, updateQuantity);
app.delete('/:productId', protectRoute, removeAllFromCart);
app.delete('/', protectRoute, removeAllFromCart);

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
