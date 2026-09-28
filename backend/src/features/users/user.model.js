import bcrypt from "bcryptjs";
import { DataTypes } from "sequelize";

import { sequelize } from "#src/config/database.js";
import { USER_ROLES } from "#src/features/users/user.constants.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Full name is required" },
        len: { args: [2, 255], msg: "Full name must be at least 2 characters long" },
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Username already taken" },
      validate: {
        notEmpty: { msg: "Username is required" },
        len: { args: [3, 255], msg: "Username must be at least 3 characters long" },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email address already registered" },
      validate: {
        isEmail: { msg: "Please provide a valid email address" },
      },
      set(value) {
        this.setDataValue("email", value.toLowerCase().trim());
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    role: {
      // Using spread operator (...) to unpack the array into individual arguments: DataTypes.ENUM("super-admin", "user")
      type: DataTypes.ENUM(...USER_ROLES),
      allowNull: false,
      defaultValue: "user",
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "users",
    hooks: {
      beforeSave: async (user) => {
        if (user.changed("password")) {
          const salt = await bcrypt.genSalt(12);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  },
);

// Method to verify candidate password
User.prototype.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Exclude password when serializing to JSON
User.prototype.toJSON = function () {
  const values = { ...this.get() };
  delete values.password;
  return values;
};

export default User;
