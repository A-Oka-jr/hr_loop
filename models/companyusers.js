'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CompanyUsers extends Model {
    static associate(models) {
      // define association here
    }
  }
  CompanyUsers.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    company_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('owner', 'manager', 'recruiter'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'CompanyUsers',
    timestamps: true
  });
  return CompanyUsers;
};