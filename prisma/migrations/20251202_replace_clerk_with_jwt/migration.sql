-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_clerkUserId_key",
DROP COLUMN "clerkUserId",
ADD COLUMN "passwordHash" TEXT NOT NULL DEFAULT 'placeholder';

-- Create index on email (important for JWT auth)
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
