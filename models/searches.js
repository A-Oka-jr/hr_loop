'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Searches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Searches.init({
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
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('search', 'loop'), // Corrected ENUM values
      allowNull: false,
      defaultValue: 'search'
    },
    query_params: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    description: DataTypes.STRING,
    job_type: DataTypes.STRING,
    country: DataTypes.STRING,
    results: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      references: {
        model: 'JobSeekers',
        key: 'id'
      }
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Searches',
  });
  return Searches;
};
