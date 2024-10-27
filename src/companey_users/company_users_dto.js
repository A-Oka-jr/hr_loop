const {CompanyUsers} = require('../../models');
const {User} = require('../../models');

class CompanyUsersDto {

  async addUserToCompany(companyUserDto) {
    const companyUser = await CompanyUsers.create(companyUserDto)
    return companyUser;
  }

  async getUserDetailsByUserId(user_id) {
    return await CompanyUsers.findOne({ where: { user_id:user_id } });
  }

  async getCompanyUserByUserId(userId) {
    return await CompanyUsers.findOne({ where: { user_id:userId } });
  }

  async associateUserToCompany(companyUserDto) {
      const companyUser = await CompanyUsers.create(companyUserDto);

  }

  async getCompanyByUserId(userId) {
    return await CompanyUsers.findOne({ where: { user_id:userId } });
  }
}

module.exports = new CompanyUsersDto()