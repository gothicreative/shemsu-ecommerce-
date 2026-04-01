import express from 'express';
import cors from 'cors';
import { Server } from 'http';
import { getProductById, getAllProducts, getFeaturedProducts, createProduct, updateProduct, deleteProduct, getProductsByCategory, searchProducts } from '../../backend/controllers/product.controller.js';

// Create Express app for this route
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.get('/', async (req, res) => {
  try {
    await getAllProducts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/featured', async (req, res) => {
  try {
    await getFeaturedProducts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/random', async (req, res) => {
  try {
    await getFeaturedProducts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/category/:category', async (req, res) => {
  try {
    await getProductsByCategory(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/search', async (req, res) => {
  try {
    await searchProducts(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/:id', async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/', async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put('/:id', async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export Vercel handler
export default async function handler(req, res) {
  return new Promise((resolve) => {
    // Handle the request with Express
    app(req, res, () => {
      resolve();
    });
  });
}
