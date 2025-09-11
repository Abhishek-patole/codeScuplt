import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './db.js';
import { clerkMiddleware } from '@clerk/express';

import userRoutes from './routes/users.routes.js';
import fileRoutes from './routes/files.routes.js';

const app = express();

// CORS setup
const origins = (process.env.CLIENT_URL || '').split(',').filter(Boolean);
app.use(
  cors({
    origin:  "http://localhost:5173", 
    credentials: true, // ✅ allow cookies / auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

// ✅ Register Clerk middleware ONCE
app.use(clerkMiddleware());

// Public route
app.get('/health', (req, res) => res.json({ ok: true }));

// Protected routes
app.use('/api/users', userRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 3000;

(async () => {
  await connectDB(process.env.MONGODB_URI);
  app.listen(PORT, () =>
    console.log(`✅ API running at http://localhost:${PORT}`)
  );
})();
