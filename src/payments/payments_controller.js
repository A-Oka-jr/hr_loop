const paymentsService = require('./payments_service');

class paymentsController {
  async findAll(req, res) {
    if (req.user.role !== 'admin') {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }
    try {
      const result = await paymentsService.findAll();
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async findById(req, res) {
    const id = req.params.id;
    try {
      const result = await paymentsService.findById(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const paymentDto = req.body;
    try {
      const result = await paymentsService.update(id, paymentDto);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async delete(req, res) {
    if (req.user.role !== 'admin') {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }
    const id = req.params.id;
    try {
      const result = await paymentsService.delete(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async create(req, res) {
    const paymentDto = req.body;
    // TODO: add more validation 1- if already have valid subscription 2- if already have valid payment
    try {
      const result = await paymentsService.create(paymentDto);
      res.status(201).json({success: true, message: 'Payment created successfully', payment: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async getPaymentBySubscriptionId(req, res) {
    if (req.user.role !== 'admin') {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }
    const id = req.params.id;
    try {
      const result = await paymentsService.getPaymentBySubscriptionId(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }

  async getPaymentByCompanyId(req, res) {
    if (req.user.role !== 'admin' || req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }
    const id = req.params.id;
    try {
      const result = await paymentsService.getPaymentByCompanyId(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
    }
  }
}

module.exports = new paymentsController()