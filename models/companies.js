'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    static associate(models) {
      // Define the association here
      Companies.belongsTo(models.SubscriptionPlans, {
        foreignKey: 'subscription_plan_id',
        as: 'subscriptionPlan'
      });
      Companies.hasMany(models.Jobs, {
        foreignKey: 'company_id',
        as: 'jobs'  // Alias for easier querying
      });
    }
  }
  Companies.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subscription_status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'inactive',
      allowNull: true
    },
    subscription_plan_id: {
      type: DataTypes.UUID, // Make sure the type matches the type of the `id` in SubscriptionPlans
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    industry: {
      type: DataTypes.STRING,
      allowNull: true
    },
    company_size: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    sequelize,
    modelName: 'Companies',
    timestamps: true,
  });
  return Companies;
};
