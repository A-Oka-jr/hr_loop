'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Companies', 'subscription_plan_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: {
        model: 'SubscriptionPlans', // name of the table
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Companies', 'subscription_plan_id');
  }
};
