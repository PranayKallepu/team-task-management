import jwt from "jsonwebtoken";
import User from "#src/features/users/user.model.js";
import AppError from "#src/utils/appError.js";

export const generateAuthToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "default-secret-key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

export const registerUser = async (fullName, userName, email, password) => {
  return await User.create({
    fullName,
    userName,
    email,
    password,
  });
};

export const authenticateUser = async (email, password) => {
  const user = await User.findOne({
    where: { email: email.toLowerCase().trim() },
  });

  if (!user || !(await user.comparePassword(password)))
    throw new AppError("Incorrect email or password", 401);

  return user;
};
