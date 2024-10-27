'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('JobSeekers', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resume_link: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resume_file: {
        type: Sequelize.STRING,
        allowNull: true
      },
      skills: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: true
      },
      education: {
        type: Sequelize.ARRAY(Sequelize.JSONB),
        allowNull: true
      },
      experience: {
        type: Sequelize.JSONB,
        allowNull: true
      },
      profile_details: {
        type: Sequelize.JSONB,
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
    await queryInterface.dropTable('JobSeekers');
  }
};