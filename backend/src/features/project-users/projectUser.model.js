import { DataTypes } from "sequelize";

import { sequelize } from "#src/config/database.js";
import { PROJECT_ROLES } from "#src/features/project-users/projectUser.constants.js";
import Project from "#src/features/projects/project.model.js";
import User from "#src/features/users/user.model.js";

export const ProjectUser = sequelize.define(
  "ProjectUser",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    projectId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    projectRole: {
      // Using spread operator (...) to unpack the array into individual arguments: DataTypes.ENUM("owner", "manager", ...)
      type: DataTypes.ENUM(...PROJECT_ROLES),
      allowNull: false,
    },
    joinedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "project_users",
  },
);

// Associations
ProjectUser.belongsTo(User, { foreignKey: "userId", as: "user" });
ProjectUser.belongsTo(Project, { foreignKey: "projectId", as: "project" });

User.hasMany(ProjectUser, { foreignKey: "userId", as: "projectMemberships" });
Project.hasMany(ProjectUser, { foreignKey: "projectId", as: "projectMembers" });

User.belongsToMany(Project, {
  through: ProjectUser,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "projects",
});

Project.belongsToMany(User, {
  through: ProjectUser,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "members",
});

export default ProjectUser;
