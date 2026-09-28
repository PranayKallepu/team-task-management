"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("projects", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.ENUM("active", "archived", "completed"),
        allowNull: false,
        defaultValue: "active",
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
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

    // DB-level CHECK constraints
    await queryInterface.sequelize.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "chk_projects_name_min_length" CHECK (char_length(name) >= 2);`,
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE "projects" ADD CONSTRAINT "chk_projects_slug_min_length" CHECK (char_length(slug) >= 2);`,
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("projects");
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_projects_status";`);
  },
};
