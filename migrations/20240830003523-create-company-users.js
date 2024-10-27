'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CompanyUsers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      // user_id: {
      //   type: Sequelize.UUID,
      //   allowNull: false
      // },
      // company_id: {
      //   type: Sequelize.UUID,
      //   allowNull: false
      // },
      role: {
        type: Sequelize.ENUM('owner', 'manager', 'recruiter'),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CompanyUsers');
  }
};