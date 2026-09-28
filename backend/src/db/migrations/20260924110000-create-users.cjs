"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.ENUM("super-admin", "user"),
        allowNull: false,
        defaultValue: "user",
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      avatar_url: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      `ALTER TABLE "users" ADD CONSTRAINT "chk_users_full_name_min_length" CHECK (char_length(full_name) >= 2);`,
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE "users" ADD CONSTRAINT "chk_users_user_name_min_length" CHECK (char_length(user_name) >= 3);`,
    );
    await queryInterface.sequelize.query(
      `ALTER TABLE "users" ADD CONSTRAINT "chk_users_email_format" CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');`,
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("users");
    await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "enum_users_role";`);
  },
};
