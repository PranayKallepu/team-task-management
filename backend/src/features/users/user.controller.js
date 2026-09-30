import {
  fetchAllUsers,
  fetchCurrentUser,
  fetchUserById,
  updateOwnPassword,
  updateUserProfile,
} from "#src/features/users/user.service.js";

// Get currently logged-in user profile
export const getMe = async (req, res, next) => {
  const user = await fetchCurrentUser(req.user);

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

// Update currently logged-in user details
export const updateMe = async (req, res, next) => {
  const updatedUser = await updateUserProfile(req.user, req.body);

  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
};

// Get all users (team members)
export const getAllUsers = async (req, res, next) => {
  const users = await fetchAllUsers();

  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
};

// Get single user by ID
export const getUser = async (req, res, next) => {
  const user = await fetchUserById(req.params.id);

  res.status(200).json({
    status: "success",
    data: { user },
  });
};

// Update own Password
export const updatePassword = async (req, res) => {
  const updateUser = await updateOwnPassword(req.user, req.body);
  res.status(200).json({
    status: "success",
    data: { user: updateUser, message: "Password Updated Successfully" },
  });
};
