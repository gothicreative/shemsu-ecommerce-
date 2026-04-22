import express from 'express';
import cors from 'cors';
import { getProductById, getAllProducts, getFeaturedProducts, getRandomProducts, createProduct, updateProduct, deleteProduct, getProductsByCategory, searchProducts, toggleFeaturedProduct } from '../../backend/controllers/product.controller.js';
import { protectRoute, adminRoute } from '../../backend/middleware/auth.middleware.js';
import { connectDB } from '../../backend/lib/db.js';

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/', getAllProducts);
app.get('/featured', getFeaturedProducts);
app.get('/random', getRandomProducts);
app.get('/category/:category', getProductsByCategory);
app.get('/search', searchProducts);
app.get('/:id', getProductById);
app.post('/', protectRoute, adminRoute, createProduct);
app.put('/:id', protectRoute, adminRoute, updateProduct);
app.delete('/:id', protectRoute, adminRoute, deleteProduct);
app.patch('/toggle-featured/:id', protectRoute, adminRoute, toggleFeaturedProduct);

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
