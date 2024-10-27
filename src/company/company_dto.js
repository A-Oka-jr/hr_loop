const {Companies} = require('../../models');

class CompanyDto {

  async createCompany(companyDto) {
    const newCompany = await Companies.create(companyDto);
    return newCompany;
  }

  async getCompanyById(id) {
    const result = await Companies.findOne({where: {id: id}});
    return result;
  }

  async getCompanyByEmail(email) {
    const result = await Companies.findOne({where: {email: email}});
    return result;
  }

  async updateCompany(id, companyData) {
    const result = await Companies.update(companyData, {where: {id: id}});
    return result;
  }

  async uploadProfilePicture(id, image) {
    const result = await Companies.update({image: image}, {where: {id: id}});
    return result;
  }
}

module.exports = new CompanyDto()