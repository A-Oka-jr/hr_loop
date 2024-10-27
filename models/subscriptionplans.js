'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubscriptionPlans extends Model {
    static associate(models) {
      // define association here
    }
  }
  SubscriptionPlans.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('free', 'professional', 'premium'),
      allowNull: false,
      defaultValue: 'free'
    },
    duration: {
      type: DataTypes.ENUM('month', 'year'),
      allowNull: true,
      defaultValue: 'month'
    },
    description: {
      type: DataTypes.TEXT('long')
    }
  }, {
    sequelize,
    modelName: 'SubscriptionPlans',
    timestamps: true
  });
  return SubscriptionPlans;
};