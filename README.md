# Ansh Singh — Full Stack MERN Developer Portfolio 🚀

A modern, production-grade personal portfolio built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js), **Tailwind CSS**, and **Framer Motion**. Designed for campus placements, technical interviews, and recruiter reviews with a sleek Vercel/Linear-inspired dark UI, electric-blue/violet accents, and smooth animations.

---

## 🌟 Live Demo & Highlights

- **Developer**: Ansh Singh
- **Role**: Full Stack MERN Developer
- **University**: Lovely Professional University (B.Tech CSE | CGPA: 8.3)
- **LinkedIn**: [linkedin.com/in/thakuransh](https://www.linkedin.com/in/thakuransh/)
- **GitHub**: [github.com/ThakurAnsh33](https://github.com/ThakurAnsh33)
- **Email**: [anshmvm@gmail.com](mailto:anshmvm@gmail.com)
- **Phone**: +91 9559035733

---

## 🛠️ Tech Stack

### Frontend (`/client`)
- **React 18** (bootstrapped with **Vite** for sub-second HMR)
- **Tailwind CSS** (dark mode support, custom electric-blue & violet palette, glassmorphism)
- **Framer Motion** (entrance animations, timeline motion, active tab transitions)
- **Lucide React & React Icons** (official developer icons for languages, frameworks, databases, tools)
- **React Hot Toast & Canvas Confetti** (interactive notifications and celebratory feedback)

### Backend (`/server`)
- **Node.js** with **Express.js** (ES Modules, RESTful API architecture)
- **MongoDB & Mongoose ODM** (messages schema, resilient fallback connection handling)
- **Nodemailer** (optional SMTP email dispatch on new contact submissions)
- **Express Rate Limit** (spam protection on contact endpoints)
- **CORS & Dotenv** (secure cross-origin requests and environment isolation)

---

## 📂 Project Architecture

```
Portfolio/
├── client/                     # Frontend React (Vite) Application
│   ├── public/
│   │   ├── favicon.svg         # Gradient AS monogram favicon
│   │   ├── resume.pdf          # Downloadable PDF resume
│   │   └── resume.html         # High-resolution printable HTML resume
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky glass navbar with active section indicator
│   │   │   ├── Hero.jsx            # Animated typewriter, CTAs, code mockup
│   │   │   ├── About.jsx           # Education (CGPA 8.3), key highlights
│   │   │   ├── Skills.jsx          # Category filter tabs, devicons, progress meters
│   │   │   ├── Experience.jsx      # Info Bharat Interns timeline
│   │   │   ├── Projects.jsx        # PrimeBid, CivicPulse, Home Services, LPU Clothings
│   │   │   ├── ProjectCard.jsx     # Card with tech chips & GitHub links
│   │   │   ├── Certifications.jsx  # NASSCOM, iamneo, Tech Veda badges
│   │   │   ├── Education.jsx       # LPU, MVM Orai, MPVM Prayagraj
│   │   │   ├── Contact.jsx         # Live contact form with MongoDB backend
│   │   │   ├── Footer.jsx          # Social links, MERN credit, scroll-to-top
│   │   │   ├── BackgroundGlow.jsx  # Ambient blur lighting
│   │   │   └── SectionHeading.jsx  # Consistent section header design
│   │   ├── context/
│   │   │   └── ThemeContext.jsx    # Dark/Light theme state & local storage
│   │   ├── data/
│   │   │   └── portfolioData.js    # Single source of truth for all portfolio data
│   │   ├── utils/
│   │   │   └── api.js              # REST client wrapper for /api/contact
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                     # Backend Express & MongoDB Application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # Resilient MongoDB Mongoose connection
│   │   ├── controllers/
│   │   │   └── contactController.js# Form validation, DB save, email alert
│   │   ├── models/
│   │   │   └── Message.js          # Mongoose schema for `messages` collection
│   │   ├── routes/
│   │   │   └── contactRoutes.js    # POST /api/contact, GET /api/contact/messages
│   │   └── index.js                # Server entry point, CORS, rate limits
│   ├── .env.example
│   ├── .env
│   └── package.json
│
├── scripts/
│   └── generate_pdf.js         # Generator for client/public/resume.pdf
├── package.json                # Root package with concurrently scripts
├── .env.example                # Root environment template
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (`node -v`)
- **npm**: v9.0.0 or higher (`npm -v`)
- **MongoDB**: Local MongoDB server or free [MongoDB Atlas](https://www.mongodb.com/atlas) connection URI.

### 2. Install Dependencies
Run from the root directory to install packages across the root, client, and server:

```bash
# Automated install for root, client, and server
npm run install:all
```

Or install manually:
```bash
npm install
cd client && npm install
cd ../server && npm install
cd ..
```

### 3. Configure Environment Variables

**Server Environment (`server/.env`):**
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_ansh

# Optional: To receive real-time email notifications whenever someone submits the contact form
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_SECURE=false
# SMTP_USER=anshmvm@gmail.com
# SMTP_PASS=your-google-app-password
# NOTIFICATION_RECEIVER=anshmvm@gmail.com
```

> **Note**: If MongoDB is not running locally, the backend will automatically enter **Resilient Mode** — it will keep running without crashing, log submissions directly to the console, and connect as soon as MongoDB becomes available.

### 4. Run Both Client & Server Concurrently
From the root directory:

```bash
npm run dev
```

- **Client App**: [http://localhost:5173](http://localhost:5173)
- **Server API**: [http://localhost:5000](http://localhost:5000)
- **Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 📡 Backend API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service uptime and MongoDB connection state |
| `POST` | `/api/contact` | Validates and saves contact form submissions to MongoDB |
| `GET` | `/api/contact/messages` | Returns recent contact submissions (for inspection/admin) |

### Sample Contact Request
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "HR Manager",
    "email": "hr@innovatetech.com",
    "message": "Hi Ansh, we would love to invite you for an interview for our Full Stack Developer role!"
  }'
```

### Sample Response
```json
{
  "success": true,
  "message": "Thank you! Your message has been received. Ansh will get back to you soon.",
  "data": {
    "name": "HR Manager",
    "createdAt": "2026-09-12T12:00:00.000Z"
  }
}
```

---

## 🚀 Deployment Guide

### Deploying Frontend (`/client`) to Vercel / Netlify
1. Connect your repository to **Vercel** or **Netlify**.
2. Set **Root Directory** to `client`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Set Environment Variable `VITE_API_BASE_URL` to your live backend URL (e.g., `https://ansh-portfolio-api.onrender.com/api`).

### Deploying Backend (`/server`) to Render / Railway
1. Create a new Web Service pointing to the `server/` directory.
2. Set **Build Command** to `npm install`.
3. Set **Start Command** to `npm start`.
4. Add Environment Variables:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `CLIENT_URL=https://your-frontend-domain.vercel.app`
   - `MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio`

---

## 📄 License

This portfolio is open-source under the [MIT License](LICENSE). Feel free to customize and use it for your own personal portfolio.

