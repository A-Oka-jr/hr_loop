'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
  ALTER TABLE "SubscriptionPlans"
  ALTER COLUMN "description" TYPE TEXT;
`);


  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('SubscriptionPlans', 'description', {
      type: Sequelize.STRING
    })
  }
};
