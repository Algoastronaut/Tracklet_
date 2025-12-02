
# Tracklet 🏦

**Smart Financial Tracking Made Simple**

A modern, JWT-authenticated financial management platform built with Next.js, React, and Prisma.

## Features

- 🔐 **Secure JWT Authentication** - No third-party auth required
- 💰 **Account Management** - Track multiple bank accounts
- 📊 **Transaction Tracking** - Categorize and analyze your spending
- 📈 **Budget Management** - Set and monitor budget goals
- 🤖 **AI-Powered Receipt Scanning** - Auto-extract transaction details from receipts
- 📧 **Email Notifications** - Get alerts for budget milestones
- 🌙 **Dark Mode Support** - Eye-friendly interface

## Tech Stack

- **Frontend**: Next.js 15, React 19, TailwindCSS
- **Backend**: Next.js API Routes, Server Actions
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: JWT with bcryptjs password hashing
- **Email**: Resend for transactional emails
- **AI**: Google Generative AI for receipt scanning
- **Security**: Arcjet rate limiting and DDoS protection

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon, Supabase, or local)
- npm or yarn

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
   ```
   DATABASE_URL=your_neon_or_postgres_url
   DIRECT_URL=your_neon_or_postgres_url
   JWT_SECRET=your_random_secret_key
   JWT_REFRESH_SECRET=your_random_refresh_secret
   GEMINI_API_KEY=your_google_gemini_key
   RESEND_API_KEY=your_resend_api_key
   ARCJET_KEY=your_arcjet_key
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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout and clear tokens
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user

## Security Features

- ✅ HTTPOnly secure cookies for token storage
- ✅ Password hashing with bcryptjs (10 rounds)
- ✅ Rate limiting on login (5 attempts, 15-min lockout)
- ✅ JWT token expiration (7 days access, 30 days refresh)
- ✅ CSRF protection with SameSite cookies
- ✅ Dynamic route protection with middleware

## Project Structure

```
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (main)/           # Protected routes
│   ├── api/              # API endpoints
│   └── layout.js         # Root layout
├── actions/              # Server actions
├── components/           # Reusable components
├── lib/
│   ├── jwt.js           # JWT utilities
│   ├── password.js      # Password hashing
│   └── auth.js          # Auth helpers
├── prisma/
│   └── schema.prisma    # Database schema
└── middleware.js        # JWT verification middleware
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues, please open an issue on GitHub.
