"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("project_users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "projects",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      project_role: {
        type: Sequelize.ENUM("owner", "manager", "developer", "code_reviewer", "tester"),
        allowNull: false,
      },
      joined_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      created_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Unique constraint: a user can only appear once per project
    await queryInterface.addConstraint("project_users", {
      fields: ["project_id", "user_id"],
      type: "unique",
      name: "uq_project_users_project_id_user_id",
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("project_users");
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_project_users_project_role";`);
  },
};
