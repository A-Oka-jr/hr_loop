const CompanyUsersDto = require('./company_users_dto');
const CompanyService = require('../company/company_service');
const authService = require('../auth/auth_service');
const errorHandler = require('../../utils/error');
class CompanyUsersService {

  async addUserToCompany(userDto, companyUserDto) {
    const {email, password, role} = userDto;
    const userData = await authService.register(email, password, role);
    companyUserDto.user_id = userData.id;

    const companyUser = await CompanyUsersDto.addUserToCompany(companyUserDto);
    return companyUser;
  }

  async getCompanyUserByUserId(userId) {
    const companyUser = await CompanyUsersDto.getCompanyUserByUserId(userId);
    if (!companyUser) {
      throw errorHandler(404,'Company user not found');
    }
    const company = await CompanyService.getCompanyById(companyUser.company_id);
    return {...companyUser.dataValues, company: company.dataValues};
  }
}

module.exports = new CompanyUsersService()