const subscriptionPlansDto = require('./subscription_plans_dto');


class subscriptionPlansService {

  async findAll() {
    const result = await subscriptionPlansDto.findAll();
    return result;
  }

  async create(subscriptionPlansData) {

    if (!subscriptionPlansData.name || !subscriptionPlansData.price){
      throw new Error('Name and price are required');
    }

    const newSubscriptionPlan = await subscriptionPlansDto.create(subscriptionPlansData);
    return newSubscriptionPlan;
  }

  async update(subscriptionPlansData) {
    const result = await subscriptionPlansDto.update(subscriptionPlansData);
    return result;
  }

  async delete(id) {
    const result = await subscriptionPlansDto.delete(id);
    return result;
  }
}

module.exports = new subscriptionPlansService()