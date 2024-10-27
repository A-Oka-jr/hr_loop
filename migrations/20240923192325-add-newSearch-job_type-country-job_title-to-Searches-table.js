'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Searches', 'job_type', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('Searches', 'country', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('Searches', 'job_title', {
      type: Sequelize.STRING,
      allowNull: true
    })

    await queryInterface.addColumn('Searches', 'description', {
      type: Sequelize.STRING,
      allowNull: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Searches', 'job_type')
    await queryInterface.removeColumn('Searches', 'country')
    await queryInterface.removeColumn('Searches', 'job_title')
    await queryInterface.removeColumn('Searches', 'description')
  }
};
