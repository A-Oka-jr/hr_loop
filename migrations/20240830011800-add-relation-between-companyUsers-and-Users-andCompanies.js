'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('CompanyUsers', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Users', // name of the table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addColumn('CompanyUsers', 'company_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'Companies', // name of the table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('CompanyUsers', 'user_id');
    await queryInterface.removeColumn('CompanyUsers', 'company_id');
  }
};
