import express from 'express';
import rateLimit from 'express-rate-limit';
import { submitContactMessage, getAllMessages } from '../controllers/contactController.js';

const router = express.Router();

// Rate limiter: maximum 10 requests per 15 minutes from the same IP
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    success: false,
    message: 'Too many messages sent from this IP address. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Route: POST /api/contact
router.post('/', contactLimiter, submitContactMessage);

// Route: GET /api/contact/messages (for inspection)
router.get('/messages', getAllMessages);

export default router;

