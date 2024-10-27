'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobSeekers extends Model {

    static associate(models) {
      JobSeekers.hasMany(models.Applied, {
        foreignKey: 'job_seeker_id',
        as: 'applications'  // Alias for easier querying
      });
    }
  }

  JobSeekers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resume_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resume_file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    education: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      allowNull: true
    },
    experience: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    profile_details: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'JobSeekers',
  });
  return JobSeekers;
};