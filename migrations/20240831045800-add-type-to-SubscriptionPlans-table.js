'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('SubscriptionPlans', 'type', {
      type: Sequelize.ENUM('free', 'professional', 'premium'),
      allowNull: false,
      defaultValue: 'free'
    })
    await queryInterface.addColumn('SubscriptionPlans', 'duration', {
      type: Sequelize.ENUM('month', 'year'),
      allowNull: true,
      defaultValue: 'month'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('SubscriptionPlans', 'type')
    await queryInterface.removeColumn('SubscriptionPlans', 'duration')
  }
};
