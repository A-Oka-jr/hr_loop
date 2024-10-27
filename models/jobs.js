'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jobs extends Model {

    static associate(models) {
      Jobs.belongsTo(models.Companies, {
        foreignKey: 'company_id',
        as: 'company'  // Alias for easier querying
      });
      Jobs.hasMany(models.Applied, {
        foreignKey: 'job_id',
        as: 'applications'  // Alias for easier querying
      });
    }
  }
  Jobs.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Companies', // Name of the table being referenced
        key: 'id'                   // Key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    requirements: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('full-time', 'part-time', 'remote', 'internship','contract'),
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('opened', 'closed'),
      defaultValue: 'opened',
      allowNull: true
    },
    posted_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Jobs',
  });
  return Jobs;
};