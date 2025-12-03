
# Tracklet 🏦

**Smart Financial Tracking Made Simple**

A modern, JWT-authenticated financial management platform built with Next.js, React, and Prisma. Now featuring AI-powered insights! 🚀

## Features

- 🔐 **Secure JWT Authentication** - Custom implementation with access/refresh tokens
- 💰 **Account Management** - Track multiple bank accounts
- 📊 **Transaction Tracking** - Categorize and analyze your spending
- 📈 **Budget Management** - Set and monitor budget goals
- 🤖 **AI-Powered Insights** - Personalized financial advice using Google Gemini
- 🧾 **Receipt Scanning** - Auto-extract details from receipts using AI
- 📧 **Email Notifications** - Get alerts for budget milestones
- 🌙 **Dark Mode Support** - Eye-friendly interface

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS, Recharts
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Custom JWT (bcryptjs hashing, httpOnly cookies)
- **AI**: Google Gemini 1.5 Flash
- **Email**: Resend
- **Security**: Arcjet (Rate limiting, Bot protection)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Algoastronaut/Tracklet_.git
   cd Tracklet_
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your values:
   ```env
   DATABASE_URL="postgresql://..."
   JWT_SECRET="your-secret-key-min-32-chars"
   JWT_REFRESH_SECRET="your-refresh-secret-min-32-chars"
   GEMINI_API_KEY="your-google-gemini-key"
   RESEND_API_KEY="your-resend-api-key"
   ARCJET_KEY="your-arcjet-key"
   ```

4. **Run database migrations**
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Authentication System

We moved from Clerk to a custom JWT solution for full control and privacy.

- **Register**: `POST /api/auth/register` (Hashes password with bcrypt)
- **Login**: `POST /api/auth/login` (Returns httpOnly cookies)
- **Logout**: `POST /api/auth/logout` (Clears cookies)
- **Security**: 
  - Access Token (7 days)
  - Refresh Token (30 days)
  - Rate limiting (5 attempts/15 mins)

## AI Features

- **Dashboard Insights**: Click "Generate Insights" on the dashboard to get personalized advice based on your recent spending.
- **Receipt Scanner**: Upload a receipt image to automatically extract date, amount, and merchant.

## Project Structure

```
├── app/
│   ├── (auth)/           # Sign-in/Sign-up pages
│   ├── (main)/           # Protected dashboard routes
│   ├── api/              # API endpoints
│   └── layout.js         # Root layout
├── actions/              # Server actions (Dashboard, Transactions)
├── components/           # Reusable UI components
├── lib/
│   ├── jwt.js           # Token utilities
│   ├── password.js      # Hashing utilities
│   └── prisma.js        # DB client
├── prisma/
│   └── schema.prisma    # Database schema
└── middleware.js        # Route protection
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.
