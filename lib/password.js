import bcrypt from "bcryptjs";

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || "10", 10);

export const hashPassword = async (password) => {
  try {
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    const salt = await bcrypt.genSalt(BCRYPT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error.message);
    throw new Error("Failed to hash password");
  }
};

export const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("Error verifying password:", error.message);
    throw new Error("Failed to verify password");
  }
};
