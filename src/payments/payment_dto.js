const {Payments} = require('../../models');

class paymentsDto {

  async findAll() {
    const result = await Payments.findAll();
    return result;
  }

  async findById(id) {
    const result = await Payments.findByPk(id);
    return result;
  }

  async update(id, paymentDto) {
    const result = await Payments.update(paymentDto, {where: {id}});
    return result;
  }

  async delete(id) {
    const result = await Payments.destroy({where: {id}});
    return result;
  }

  async create(paymentDto) {
    const result = await Payments.create(paymentDto);
    return result;
  }

  async getPaymentBySubscriptionId(id) {
    const result = await Payments.findAll({where: {subscriptionId: id}});
    return result;
  }

  async getPaymentByCompanyId(id) {
    const result = await Payments.findAll({where: {companyId: id}});
    return result;
  }
}

module.exports = new paymentsDto()