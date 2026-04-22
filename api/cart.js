import express from 'express';
import cors from 'cors';
import { getCart, addToCart, removeFromCart, updateCartItem, clearCart } from '../../backend/controllers/cart.controller.js';
import { connectDB } from '../../backend/lib/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json());

// Routes
app.get('/', getCart);
app.post('/:productId', addToCart);
app.put('/:productId', updateCartItem);
app.delete('/:productId', removeFromCart);
app.delete('/', clearCart);

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
