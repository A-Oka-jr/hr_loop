'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Applieds', 'hr_evaluation', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }),
      await queryInterface.addColumn('Applieds', 'department_evaluations', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      await queryInterface.addColumn('Applieds', 'send_for_evaluation', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      }),
      await queryInterface.addColumn('Applieds', 'send_invitation', {
        type: Sequelize.BOOLEAN,
        allowNull: true
      })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Applieds', 'hr_evaluation'),
      await queryInterface.removeColumn('Applieds', 'department_evaluations'),
      await queryInterface.removeColumn('Applieds', 'send_for_evaluation'),
      await queryInterface.removeColumn('Applieds', 'send_invitation')
  }
};
