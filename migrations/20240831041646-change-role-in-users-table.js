'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'job_seeker', 'company_user, null'),
      allowNull: true,
      defaultValue: null
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'role', {
      type: Sequelize.ENUM('admin', 'job_seeker', 'company_user'),
      allowNull: true,
    })
  }
};
