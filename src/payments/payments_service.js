const paymentsDto = require('./payment_dto');

class paymentsService {
  async findAll() {
    const result = await paymentsDto.findAll();
    return result;
  }

  async findById(id) {
    const result = await paymentsDto.findById(id);
    return result;
  }

  async update(id, paymentDto) {
    const result = await paymentsDto.update(id, paymentDto);
    return result;
  }

  async delete(id) {
    const result = await paymentsDto.delete(id);
    return result;
  }

  async create(paymentDto) {
    const result = await paymentsDto.create(paymentDto);
    return result;
  }

  async getPaymentBySubscriptionId(id) {
    const result = await paymentsDto.getPaymentBySubscriptionId(id);
    return result;
  }

  async getPaymentByCompanyId(id) {
    const result = await paymentsDto.getPaymentByCompanyId(id);
    return result;
  }
}

module.exports = new paymentsService()