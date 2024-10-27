'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.addColumn('Searches', 'skills', {
     type: Sequelize.ARRAY(Sequelize.STRING),
     allowNull: true
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Searches', 'skills')
  }
};