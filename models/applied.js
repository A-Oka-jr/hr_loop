'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Applied extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Applied.belongsTo(models.JobSeekers, {
        foreignKey: 'job_seeker_id',
        as: 'seeker'
      });

      Applied.belongsTo(models.Jobs, {
        foreignKey: 'job_id',
        as: 'job'
      });

    }
  }

  Applied.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    job_seeker_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'JobSeekers',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    job_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Jobs',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    application_status: {
      type: DataTypes.ENUM('submitted', 'interviewed', 'accepted', 'rejected'),
      defaultValue: 'submitted'
    },
    hr_evaluation: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    department_evaluations: {
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    send_for_evaluation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    send_invitation: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    applied_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    auto_applied: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Applied',
  });
  return Applied;
};