const companyDto = require('./company_dto');
const CompanyUsersDto = require('../companey_users/company_users_dto');
const usersDto = require('../users/users_dto');
const errorHandler = require('../../utils/error');

class CompanyService {

  async createCompany(companyData, companyUsersData) {

    const companyUsers = await CompanyUsersDto.getUserDetailsByUserId(companyUsersData.user_id);
    if (companyUsers) {
      throw errorHandler(400, 'User already associated with a company');
    }
    const company = await companyDto.getCompanyByEmail(companyData.email);
    if (company) {
      throw errorHandler(400, 'company already exists');
    }

    const newCompany = await companyDto.createCompany(companyData);

    // update user role to company user
    const updatedUser = await usersDto.update(companyUsersData.user_id, {role: 'company_user'});

    companyUsersData.company_id = newCompany.id;

    const newCompanyUser = await CompanyUsersDto.associateUserToCompany(companyUsersData);
    return newCompany;
  }

  async getCompanyById(id) {
    const result = await companyDto.getCompanyById(id);
    return result;
  }

  async updateCompany(id, companyData) {
    const result = await companyDto.updateCompany(id, companyData);
    return result;
  }

  async uploadProfilePicture(id, file) {
    let fileName = file.filename
    const result = await companyDto.uploadProfilePicture(id, fileName);
    return result;
  }
}

module.exports = new CompanyService()