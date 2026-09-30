"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("tickets", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal("gen_random_uuid()"),
        primaryKey: true,
        allowNull: false,
      },

      project_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },

      type: {
        type: Sequelize.ENUM("bug", "feature", "task"), //feat to feature
        allowNull: false,
        defaultValue: "bug",
      },

      status: {
        type: Sequelize.ENUM("todo", "in_progress", "in_review", "done"),
        allowNull: false,
        defaultValue: "todo",
      },

      priority: {
        type: Sequelize.ENUM("low", "medium", "high", "critical"),
        allowNull: false,
        defaultValue: "low",
      },

      reporter_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      assignee_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },

      parent_ticket_id: {
        type: Sequelize.UUID,
        allowNull: true,
        defaultValue: null,
      },

      start_date: {
        type: "TIMESTAMP",
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      current_assignee_due_date: {
        type: "TIMESTAMP",
        allowNull: true,
        defaultValue: null,
      },

      final_due_date: {
        type: "TIMESTAMP",
        allowNull: false,
      },

      labels: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true,
        defaultValue: null,
      },

      sprint: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
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
      `ALTER TABLE "tickets" ADD CONSTRAINT "chk_tickets_title_min_length" CHECK (char_length(title) >= 3);`,
    );
  },

  async down(queryInterface) {
    await queryInterface.dropTable("tickets");

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tickets_type";');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tickets_status";');

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_Tickets_priority";');
  },
};
