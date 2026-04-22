import express from 'express';
import cors from 'cors';
import { getProductById, getAllProducts, getFeaturedProducts, createProduct, updateProduct, deleteProduct, getProductsByCategory, searchProducts } from '../../backend/controllers/product.controller.js';

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
app.get('/random', getFeaturedProducts);
app.get('/category/:category', getProductsByCategory);
app.get('/search', searchProducts);
app.get('/:id', getProductById);
app.post('/', createProduct);
app.put('/:id', updateProduct);
app.delete('/:id', deleteProduct);

// Export Vercel handler
export default async function handler(req, res) {
  return new Promise((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
}
