# ✅ Vercel Deployment - Ready!

## 📁 Files Created

All API serverless functions have been created in the `api/` folder:

- ✅ `api/products.js` - Products API
- ✅ `api/auth.js` - Authentication API
- ✅ `api/cart.js` - Shopping Cart API
- ✅ `api/coupons.js` - Coupon API
- ✅ `api/payments.js` - Payment API
- ✅ `api/analytics.js` - Analytics API

## 🚀 Deploy to Vercel

### Step 1: Commit and Push

```bash
git add .
git commit -m "Add API serverless functions for Vercel deployment"
git push origin main
```

### Step 2: Add Environment Variables in Vercel Dashboard

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these (Production):

```env
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_REST_URL=https://eminent-grizzly-53050.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
ACCESS_TOKEN_SECRET=access_token_secret
REFRESH_TOKEN_SECRET=refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=https://shemsu-collection.vercel.app
NODE_ENV=production
```

### Step 3: Wait for Deployment

Vercel will automatically deploy (~2-3 minutes)

---

## 📊 How It Works

### Local Development:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- Axios connects to: `http://localhost:5000/api`

### Vercel Production:
- Frontend: https://shemsu-collection.vercel.app
- Backend API: https://shemsu-collection.vercel.app/api/*
- Axios connects to: `/api` (relative URL)

---

## ✨ API Endpoints Available

After deployment, these endpoints will work:

- ✅ `GET /api/products` - All products
- ✅ `GET /api/products/featured` - Featured products
- ✅ `GET /api/products/category/:category` - Products by category
- ✅ `POST /api/auth/login` - Login
- ✅ `POST /api/auth/signup` - Signup
- ✅ `GET /api/cart` - Get cart
- ✅ `POST /api/cart/:productId` - Add to cart
- ✅ `POST /api/payments/create-intent` - Create payment
- ✅ `GET /api/analytics` - Analytics data
- ✅ `GET /api/coupons/:code` - Get coupon

---

## 🔧 Configuration Files

### vercel.json
```json
{
  "version": 2,
  "builds": [
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    },
    {
      "src": "api/**/*.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1.js"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### frontend/src/lib/axios.js
```javascript
const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" 
    ? "http://localhost:5000/api" 
    : "/api",
  withCredentials: true,
});
```

---

## 🆘 Troubleshooting

### Products not loading?
- Check MongoDB connection string in Vercel env vars
- Check function logs: Dashboard → Functions → Click function → Logs

### CORS errors?
- Verify `CLIENT_URL` matches your Vercel URL
- All API files have CORS configured

### 500 errors?
- Check Vercel function logs for detailed error messages
- Verify all environment variables are set correctly

---

## ✅ Deployment Checklist

Before deploying, verify:

- [x] `api/` folder with all serverless functions
- [x] `vercel.json` configured
- [x] `axios.js` updated for production
- [ ] Environment variables added to Vercel
- [ ] Committed and pushed to GitHub
- [ ] Tested locally (working)

---

## 🎯 Ready to Deploy!

Just run:
```bash
git add .
git commit -m "Add API serverless functions for Vercel deployment"
git push origin main
```

Then add environment variables in Vercel dashboard and wait for deployment! 🚀
