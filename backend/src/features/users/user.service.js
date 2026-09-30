import User from "#src/features/users/user.model.js";
import AppError from "#src/utils/appError.js";
import bcrypt from "bcryptjs";

export const fetchCurrentUser = async (currentUser) => {
  if (currentUser) return currentUser;
  return await User.findOne(); // Fallback from original code
};

export const updateUserProfile = async (currentUser, body) => {
  if (!currentUser)
    throw new AppError("You are not logged in. Please log in to update your profile.", 401);

  const allowedFields = ["fullName", "bio", "avatarUrl"];
  const updates = {};

  Object.keys(body).forEach((key) => {
    if (allowedFields.includes(key)) updates[key] = body[key];
  });

  return await currentUser.update(updates);
};

export const fetchAllUsers = async () => {
  return await User.findAll({
    attributes: { exclude: ["password"] },
  });
};

export const fetchUserById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (!user) throw new AppError("No user found with that ID", 404);

  return user;
};

export const updateOwnPassword = async (currentUser, body) => {
  const { currentPassword, newPassword } = body;
  const { password } = currentUser;
  console.log(body, password);
  const isPasswordMatch = await bcrypt.compare(currentPassword, password);
  if (!isPasswordMatch) throw new AppError("Does not match current Password", 400);
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  await User.update({ password: hashedPassword }, { where: { id: currentUser.id } });

  return currentUser;
};
