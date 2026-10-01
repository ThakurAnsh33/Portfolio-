import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverEnvPath = path.resolve(__dirname, '../.env');
const rootEnvPath = path.resolve(__dirname, '../../.env');

// Load environment variables reliably regardless of working directory
if (fs.existsSync(serverEnvPath)) {
  dotenv.config({ path: serverEnvPath });
}
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}
dotenv.config();

const clientDistPath = path.resolve(__dirname, '../../client/dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware: CORS Configuration - dynamic origin reflection to support same-origin, Render, preview URLs & local dev
app.use(
  cors({
    origin: (origin, callback) => {
      // Always allow all origins dynamically so static assets and API calls are never blocked
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Serve built frontend static files if present
if (fs.existsSync(clientDistPath)) {
  app.use(
    express.static(clientDistPath, {
      maxAge: '1d',
      setHeaders: (res, filePath) => {
        // Ensure static assets are freely accessible
        res.setHeader('Access-Control-Allow-Origin', '*');
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
      },
    })
  );
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  const dbStatusMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  res.status(200).json({
    status: 'online',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
    database: {
      status: dbStatusMap[mongoose.connection.readyState] || 'unknown',
      connected: mongoose.connection.readyState === 1,
    },
    environment: process.env.NODE_ENV || 'development',
  });
});

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api', statsRoutes);

// API Directory route
app.get('/api', (req, res) => {
  res.json({
    name: 'Ansh Singh Portfolio Backend API',
    status: 'running',
    endpoints: {
      frontend: '/',
      health: '/api/health',
      contact: 'POST /api/contact',
      messages: 'GET /api/contact/messages',
      githubStats: 'GET /api/github-stats',
      visitRecord: 'POST /api/visit',
      visitCount: 'GET /api/visit',
      resumeDownload: 'GET /api/resume-download',
    },
  });
});

// SPA fallback: Serve index.html for all frontend routes
app.get('*', (req, res) => {
  // If the request was for a static asset or file with an extension that does not exist, return 404
  if (req.path.startsWith('/assets/') || path.extname(req.path)) {
    return res.status(404).type('text/plain').send('Asset not found');
  }

  const indexPath = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    return res.sendFile(indexPath);
  }
  res.status(404).json({
    success: false,
    message: `Endpoint '${req.originalUrl}' not found. Run 'npm run build' in /client to generate frontend assets.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]:', err.stack || err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Unified MERN Portfolio running on: http://localhost:${PORT}`);
  console.log(`💻 Frontend UI:       http://localhost:${PORT}/`);
  console.log(`❤️ Health Check:     http://localhost:${PORT}/api/health`);
  console.log(`🔌 Backend API:       http://localhost:${PORT}/api/contact`);
  console.log(`======================================================\n`);
});
