'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: true
      },
      subscription_status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'inactive',
        allowNull: true
      },
      // subscription_plan_id: {
      //   type: Sequelize.UUID,
      //   allowNull: true
      // },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      company_size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
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
    await queryInterface.dropTable('Companies');
  }
};