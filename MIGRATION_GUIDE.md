# JWT Authentication Migration Guide

This document outlines the complete migration from Clerk to JWT-based authentication.

## What Changed

### **Removed Components**
- ❌ All Clerk dependencies (`@clerk/nextjs`)
- ❌ `ClerkProvider` from root layout
- ❌ Clerk React components (`SignedIn`, `SignedOut`, `SignInButton`, `UserButton`)
- ❌ Clerk server functions (`auth()`, `currentUser()`, `clerkMiddleware`)

### **Added Components**
- ✅ JWT token generation and verification (`lib/jwt.js`)
- ✅ Password hashing utilities (`lib/password.js`)
- ✅ Auth helper (`lib/auth.js`) for extracting user from JWT
- ✅ Auth API routes (`app/api/auth/`)
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login
  - `POST /api/auth/logout` - User logout
  - `POST /api/auth/refresh` - Refresh access token
  - `GET /api/auth/me` - Get current user
- ✅ Custom JWT middleware in `middleware.js`
- ✅ Custom sign-in/sign-up pages with forms
- ✅ Custom header component with logout functionality

### **Database Schema Changes**
**Before:**
```prisma
clerkUserId   String    @unique // clerk user id
```

**After:**
```prisma
passwordHash  String    // bcrypt hashed password
```

## Setup Instructions

### 1. **Environment Variables**

Update your `.env` file with JWT secrets:

```env
# JWT Configuration (REQUIRED)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-min-32-chars
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production-min-32-chars
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d
BCRYPT_ROUNDS=10
```

**For Production:**
Generate strong random secrets:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. **Database Migration**

Run the migration to update the schema:

```bash
npx prisma migrate dev
```

Or if you have an existing Prisma client:
```bash
npx prisma db push
```

### 3. **Dependencies**

Already installed:
- `jsonwebtoken` - JWT token generation/verification
- `bcryptjs` - Password hashing

Removed:
- `@clerk/nextjs` - No longer needed

### 4. **How It Works**

#### **Registration Flow**
1. User fills out sign-up form
2. Form submits to `POST /api/auth/register`
3. Password is hashed using `bcryptjs`
4. User record created in database with hashed password
5. JWT tokens are generated (access + refresh)
6. Tokens set in httpOnly cookies
7. User redirected to `/dashboard`

#### **Login Flow**
1. User enters email and password
2. Form submits to `POST /api/auth/login`
3. Password verified against stored hash
4. On success, JWT tokens generated and set in cookies
5. On failure, error message displayed
6. Rate limiting applied (5 attempts, 15 min lockout)

#### **Authentication Check**
1. User makes request to protected route
2. Middleware reads `token` cookie
3. JWT verified using secret
4. If valid, request proceeds
5. If invalid/expired, redirect to sign-in

#### **Server Actions**
1. Server action calls `getUserIdFromToken()`
2. Helper extracts JWT from cookies
3. Verifies signature
4. Returns user ID
5. Used to fetch user data from database

### 5. **Protected Routes**

The following routes are automatically protected by middleware:
- `/dashboard/*`
- `/account/*`
- `/transaction/*`

Unauthenticated users are redirected to `/sign-in`

### 6. **Token Details**

**Access Token:**
- Expires in 7 days
- Stored in httpOnly cookie
- Used for API requests

**Refresh Token:**
- Expires in 30 days
- Stored in httpOnly cookie
- Can be used to get new access token

**Token Payload:**
```javascript
{
  sub: userId,           // Subject (user ID)
  email: userEmail,      // User email
  iat: issuedAt,        // Issued at
  exp: expirationTime   // Expiration time
}
```

### 7. **Security Features**

✅ **Password Security**
- Minimum 8 characters
- Bcrypt hashing with 10 rounds
- Never stored in plain text

✅ **Token Security**
- httpOnly cookies (not accessible via JavaScript)
- Secure flag set in production
- SameSite=Lax for CSRF protection
- Strong expiration times

✅ **Rate Limiting**
- Max 5 login attempts
- 15-minute lockout after failure
- Per-email tracking

✅ **Input Validation**
- Email format validation
- Password length validation
- User data sanitization

## API Endpoints Reference

### **Register**
```bash
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}

Response: 201
{
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### **Login**
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}

Response: 200
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### **Logout**
```bash
POST /api/auth/logout

Response: 200
{
  "message": "Logged out successfully"
}
```

### **Refresh Token**
```bash
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGc..."
}

Response: 200
{
  "message": "Token refreshed successfully",
  "token": "new-access-token"
}
```

### **Get Current User**
```bash
GET /api/auth/me

Response: 200
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "imageUrl": null
  }
}
```

## Component Changes

### **Header Component** (`components/header.jsx`)
- Now a client component (uses hooks)
- Checks authentication state via `checkUser()`
- Shows different UI for logged-in vs. logged-out users
- Includes logout button with confirmation

### **Sign-In Page** (`app/(auth)/sign-in/[[...sign-in]]/page.jsx`)
- Custom form with email and password fields
- Form submission to `/api/auth/login`
- Error handling and toast notifications
- Link to sign-up page

### **Sign-Up Page** (`app/(auth)/sign-up/[[...sign-up]]/page.jsx`)
- Custom form with name, email, and password fields
- Password validation (minimum 8 characters)
- Form submission to `/api/auth/register`
- Error handling and toast notifications
- Link to sign-in page

## Server Actions Updated

All server actions now use JWT authentication:

**Before:**
```javascript
const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");
```

**After:**
```javascript
const userId = await getUserIdFromToken();
// userId is guaranteed or error is thrown
```

Updated files:
- `actions/dashboard.js`
- `actions/account.js`
- `actions/transaction.js`
- `actions/budget.js`

## Middleware Changes

**Before:**
- Used `clerkMiddleware` from `@clerk/nextjs/server`
- Redirected to Clerk's hosted login

**After:**
- Custom JWT verification
- Checks token validity
- Redirects to `/sign-in` for invalid/missing tokens
- Prevents authenticated users from accessing auth pages

## Testing the Implementation

### **Test Registration**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123",
    "name": "Test User"
  }'
```

### **Test Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPassword123"
  }'
```

### **Test Protected Route**
```bash
# Without token - should redirect to /sign-in
curl http://localhost:3000/dashboard

# With token - should work (cookie set from login)
curl -b "token=your-jwt-token" http://localhost:3000/dashboard
```

## Troubleshooting

### **"Unauthorized: No token found"**
- User is not logged in
- Token cookie not being sent
- Middleware configuration issue

### **"Invalid token"**
- Token was tampered with
- Token was signed with different secret
- Token format is incorrect

### **"Token has expired"**
- Access token needs refresh
- Use refresh token endpoint
- User should log in again

### **"Account locked"**
- Too many failed login attempts
- Wait 15 minutes before retrying
- Check email for suspicious activity

### **Password validation errors**
- Password must be at least 8 characters
- Special characters are allowed
- Check for typos

## Migration from Clerk

If you had existing Clerk users:

1. **Option A: Password Reset**
   - Force all users to reset password
   - They'll create new password hash
   - More secure but requires user action

2. **Option B: Import Tool**
   - Contact Clerk to export user data
   - Hash passwords using same algorithm
   - Import into new system
   - More seamless but requires tool

3. **Option C: Gradual Migration**
   - Run both systems in parallel
   - New signups use JWT
   - Old users update passwords gradually
   - Phase out Clerk over time

## Performance Considerations

- JWT verification is fast (~0.5ms)
- Password hashing is intentionally slow (~100ms)
- In-memory rate limiting for development (use Redis in production)
- httpOnly cookies minimize XSS attack surface

## Next Steps

1. ✅ Update environment variables with strong secrets
2. ✅ Run Prisma migrations
3. ✅ Test registration and login flows
4. ✅ Update deployment configuration
5. ✅ Set up monitoring for auth endpoints
6. ✅ Consider implementing password reset
7. ✅ Add email verification (optional)
8. ✅ Set up CI/CD for auth tests

## Additional Resources

- [JWT.io](https://jwt.io) - JWT specification
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)
- [Next.js Middleware Guide](https://nextjs.org/docs/advanced-features/middleware)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
