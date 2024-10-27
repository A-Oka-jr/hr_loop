'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Payments.init({
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
        key: 'id'            // Key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    subscription_plan_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'SubscriptionPlans', // Name of the table being referenced
        key: 'id'                   // Key in the referenced table
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'success', 'failed'),
      allowNull: false
    }
  }, {
    sequelize,
    timestamps: true,
    modelName: 'Payments',
  });
  return Payments;
};