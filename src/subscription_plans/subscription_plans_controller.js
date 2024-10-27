const subscriptionPlansService = require('./subscription_plans_service');
class subscriptionPlansController{

  async findAll(req, res) {
    try {
      const result = await subscriptionPlansService.findAll();
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async create(req, res) {
    const subscriptionPlansDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      duration: req.body.duration,
      description: req.body.description
    }
    try {
      const newSubscriptionPlan = await subscriptionPlansService.create(subscriptionPlansDto);
      res.status(201).json({success: true, message: 'Subscription plan created successfully', data: newSubscriptionPlan});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async update(req, res, next) {
    const subscriptionPlansDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
      duration: req.body.duration,
      description: req.body.description,
      id: req.params.id
    }
    try {
      const result = await subscriptionPlansService.update(subscriptionPlansDto);
      res.status(200).json({success: true, message: 'Subscription plan updated successfully'});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const result = await subscriptionPlansService.delete(id);
      res.status(200).json({success: true, message: 'Subscription plan deleted successfully'});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }
}

module.exports = new subscriptionPlansController()