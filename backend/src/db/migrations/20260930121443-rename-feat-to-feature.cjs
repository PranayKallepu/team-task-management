"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_tickets_type"
      RENAME VALUE 'feat' TO 'feature';
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_tickets_type"
      RENAME VALUE 'feature' TO 'feat';
    `);
  },
};
