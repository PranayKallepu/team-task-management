import { DataTypes } from "sequelize";

import { sequelize } from "#src/config/database.js";
import { PROJECT_STATUSES } from "#src/features/projects/project.constants.js";

export const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Project name is required" },
        len: { args: [2, 255], msg: "Project name must be at least 2 characters long" },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Project slug already exists" },
      validate: {
        len: { args: [2, 255], msg: "Project slug must be at least 2 characters long" },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: null,
    },
    status: {
      // Using spread operator (...) to unpack the array into individual arguments: DataTypes.ENUM("active", "archived", ...)
      type: DataTypes.ENUM(...PROJECT_STATUSES),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    tableName: "projects",
  },
);

export default Project;
