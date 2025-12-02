# Quick Reference - JWT Authentication

## 🚀 Getting Started

### 1. Local Development
```bash
# Install dependencies (already done)
npm install

# Set environment variables in .env
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret

# Run migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

### 2. Test Registration
Visit `http://localhost:3000/sign-up`
- Email: `test@example.com`
- Password: `TestPassword123` (8+ chars)
- Name: `Test User`

### 3. Test Login
Visit `http://localhost:3000/sign-in`
- Email: `test@example.com`
- Password: `TestPassword123`

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/jwt.js` | JWT sign/verify functions |
| `lib/password.js` | Password hashing utilities |
| `lib/auth.js` | Extract user from JWT |
| `app/api/auth/*` | Auth endpoints |
| `middleware.js` | Route protection |
| `app/(auth)/sign-in/page.jsx` | Login form |
| `app/(auth)/sign-up/page.jsx` | Signup form |
| `components/header.jsx` | User menu & logout |

---

## 🔐 Security

| Feature | Status |
|---------|--------|
| Bcrypt hashing | ✅ 10 rounds |
| httpOnly cookies | ✅ XSS safe |
| CSRF protection | ✅ SameSite=Lax |
| Rate limiting | ✅ 5 attempts, 15 min lockout |
| Token expiry | ✅ 7 days access, 30 days refresh |
| HTTPS in production | ✅ Secure flag auto-set |

---

## 🔌 API Endpoints

```
POST   /api/auth/register    Register new user
POST   /api/auth/login       Login user
POST   /api/auth/logout      Logout user
POST   /api/auth/refresh     Refresh access token
GET    /api/auth/me          Get current user
```

---

## 🛡️ Protected Routes

These routes require authentication:
- `/dashboard/*`
- `/account/*`
- `/transaction/*`

Unauthenticated users → Redirect to `/sign-in`

---

## ⚙️ Environment Variables

```env
# Required
DATABASE_URL=postgresql://...
JWT_SECRET=min-32-char-secret
JWT_REFRESH_SECRET=min-32-char-secret

# Optional (defaults shown)
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d
BCRYPT_ROUNDS=10
```

---

## 📊 How It Works

```
User → Sign-up form → POST /api/auth/register
         ↓
       Hash password with bcrypt
         ↓
       Create JWT tokens (access + refresh)
         ↓
       Set httpOnly cookies
         ↓
       Redirect to /dashboard
       
User → /dashboard → Middleware checks JWT
         ↓
       Valid? → Continue
       Invalid? → Redirect to /sign-in
```

---

## 🧪 Quick Tests

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123456","name":"Test"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123456"}'
```

### Get User
```bash
curl http://localhost:3000/api/auth/me
```

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Token has expired" | Refresh token or log in again |
| "Account locked" | Wait 15 minutes, try again |
| "Unauthorized" | Check if logged in |
| CORS error | Check origin in requests |
| Build fails | Run `npm install` and `npx prisma generate` |

---

## 🚀 Deployment

### Production Secrets
```bash
# Generate strong secrets (DO NOT use dev secrets!)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Deploy Steps
1. Generate JWT_SECRET and JWT_REFRESH_SECRET
2. Set environment variables in hosting platform
3. Run `npx prisma migrate deploy`
4. Deploy with `npm run build && npm start`

---

## 📚 Full Documentation

- **MIGRATION_GUIDE.md** - Complete setup & troubleshooting
- **JWT_IMPLEMENTATION.md** - Feature overview
- **IMPLEMENTATION_COMPLETE.md** - What was built

---

## ✅ Verification Checklist

- [x] Clerk completely removed
- [x] JWT implementation complete
- [x] All API routes working
- [x] Middleware protecting routes
- [x] Password hashing secure
- [x] Cookies httpOnly and Secure
- [x] Rate limiting implemented
- [x] Build passes successfully
- [x] Documentation complete
- [x] Ready for production

---

**Status:** ✅ Production Ready  
**Last Updated:** December 2, 2025
