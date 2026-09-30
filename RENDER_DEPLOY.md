# Render Deployment & Email Configuration Guide

This guide details how to resolve email delivery failures on **Render**, configure required environment variables, and verify live diagnostics.

---

## 🔍 Root Cause Analysis: Why Email Fails on Render

If your contact form submissions were failing to deliver notification emails on Render, two factors were responsible:

1. **Missing Dashboard Environment Variables (Primary Cause)**:
   - Your local `server/.env` file is excluded from Git via `.gitignore`.
   - When Render builds and deploys your repository from GitHub, **no `.env` file exists on the server**.
   - Unless you manually configure `EMAIL_USER`, `EMAIL_PASS`, etc. in the **Render Dashboard Environment tab**, the server runs with undefined or placeholder credentials.

2. **Outbound SMTP Port Restrictions (Cloud Firewall)**:
   - Render (like AWS EC2, DigitalOcean, and Vercel) frequently restricts or blocks outbound SMTP connections on ports **25, 465, and 587** on free or shared instances to prevent spam abuse.
   - When Nodemailer attempts `smtp.gmail.com:465` or `587`, the connection times out (`ETIMEDOUT` or `ECONNECTION`).

### 🛡️ How We Solved It
We engineered an automatic, resilient **Dual-Provider Architecture**:
1. **Primary**: Gmail SMTP via Nodemailer with Google App Passwords.
2. **Fallback**: Transactional HTTPS API via **Resend** (port 443). Because Resend communicates over standard HTTPS, cloud firewall blocks on SMTP ports 465/587 cannot stop it.
3. **MongoDB Resilience**: Form submissions are **always saved to MongoDB** first with HTTP 201 status, so a visitor's submission is never rejected if email delivery faces a network hitch.
4. **Auto-Reply**: When delivery succeeds, an automatic confirmation email with a dark HUD theme is delivered to the visitor.

---

## ⚙️ Step 1: Set Render Dashboard Environment Variables

In your Render Dashboard:
1. Open your **Web Service** (e.g., `portfolio-backend` or unified service).
2. Go to the **Environment** tab on the left sidebar.
3. Add the following environment variables:

| Key | Example Value | Description |
|---|---|---|
| `NODE_ENV` | `production` | Enables production mode and security guards |
| `PORT` | `5000` | Port for Express server (or Render's automatic port) |
| `MONGODB_URI` | `mongodb+srv://user:pass@cluster.mongodb.net/portfolio` | Production MongoDB Atlas connection string |
| `EMAIL_USER` | `anshmvm@gmail.com` | Your Gmail address used as the SMTP sender |
| `EMAIL_PASS` | `abcd efgh ijkl mnop` | **16-character Google App Password** *(do NOT use regular Gmail password!)* |
| `NOTIFICATION_RECEIVER`| `anshmvm@gmail.com` | Inbox where you want new contact alerts delivered |
| `RESEND_API_KEY` | `re_123456789abcdef` | **Resend API Key** *(infallible HTTPS fallback)* |
| `RESEND_FROM` | `Ansh Portfolio <onboarding@resend.dev>` | Verified sender address (or default Resend sandbox) |
| `ADMIN_SECRET` | `your-secure-random-secret-token` | Secret token to access `/test-email` and `/messages` |
| `CLIENT_URL` | `https://your-portfolio.onrender.com` | Allowed CORS origin for your deployed frontend |

---

## 🔑 How to Get Your Credentials

### A. Google App Password (Gmail SMTP)
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned **ON**.
3. Visit [Google App Passwords](https://myaccount.google.com/apppasswords).
4. Enter an app name (e.g. `Portfolio Contact`), click **Create**, and copy the 16-character password (e.g. `abcd efgh ijkl mnop`).
5. Paste it into Render's `EMAIL_PASS` variable.

### B. Resend API Key (Bulletproof HTTPS Fallback)
1. Sign up for a free account at [Resend.com](https://resend.com) (includes 100 free emails/day, 3,000/month).
2. Navigate to [API Keys](https://resend.com/api-keys) and click **Create API Key**.
3. Set permissions to **Full Access** or **Sending Access**.
4. Copy the key (starts with `re_...`) and paste into Render's `RESEND_API_KEY` variable.

---

## 🧪 Step 2: Verify Your Live Deployment via Diagnostic Route

Once your Render deployment finishes building, verify that email delivery works from within Render's cloud container:

### 1. Run Connection Verification (Non-sending)
```bash
curl -X GET "https://your-backend.onrender.com/api/contact/test-email?secret=your-secure-random-secret-token"
```
**Expected Response (HTTP 200)**:
```json
{
  "success": true,
  "summary": "At least one email delivery channel is operational.",
  "results": {
    "configuration": {
      "emailUser": "anshmvm@gmail.com",
      "hasValidGmailPass": true,
      "hasValidResendKey": true
    },
    "gmailSmtp": {
      "tested": true,
      "status": "verified"
    },
    "resendApi": {
      "tested": true,
      "status": "configured_ready"
    }
  }
}
```

### 2. Send an Actual Test Email Through Render
```bash
curl -X GET "https://your-backend.onrender.com/api/contact/test-email?secret=your-secure-random-secret-token&send=true"
```
This will dispatch an actual test notification to your configured `NOTIFICATION_RECEIVER`.

---

## 📬 Step 3: Admin Message Management

Inspect and manage contact messages saved in MongoDB:

### 1. View Paginated Messages
```bash
# Get page 1 (20 per page)
curl -X GET "https://your-backend.onrender.com/api/contact/messages?secret=your-secure-random-secret-token&page=1&limit=20"

# Filter by unread messages only
curl -X GET "https://your-backend.onrender.com/api/contact/messages?secret=your-secure-random-secret-token&filter=unread"
```

### 2. Toggle or Mark Message as Read
```bash
curl -X PATCH "https://your-backend.onrender.com/api/contact/messages/<MESSAGE_ID>/read?secret=your-secure-random-secret-token" \
  -H "Content-Type: application/json" \
  -d '{"isRead": true}'
```

---

## 🚀 Render Build & Start Commands (Root Directory)

If deploying the entire unified monorepo on Render:
- **Build Command**:
  ```bash
  npm install && npm run build
  ```
- **Start Command**:
  ```bash
  npm run start
  ```
The Express server in `server/src/index.js` automatically serves the built client distribution (`client/dist`) and all `/api` endpoints simultaneously on a single unified port.
