const {SubscriptionPlans} = require('../../models');

class subscriptionPlansDto{

  async findAll(){
    const result = await SubscriptionPlans.findAll();
    return result;
  }

  async create(subscriptionPlansData){
    const result = await SubscriptionPlans.create(subscriptionPlansData);
    return result;
  }

  async update(subscriptionPlansData){
    const result = await SubscriptionPlans.update(subscriptionPlansData, {where: {id: subscriptionPlansData.id}});
    return result;
  }

  async delete(id){
    const result = await SubscriptionPlans.destroy({where: {id: id}});
    return result;
  }
}

module.exports = new subscriptionPlansDto()