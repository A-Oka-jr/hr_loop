const CompanyUsersService = require('./company_users_service');

class CompanyUsersController {

  async addUserToCompany(req, res, next) {
    const userDto = {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    };
    const companyUserDto = {
      role: req.body.company_role,
      name: req.body.name,
      company_id: req.params.id,
    }

    try {
      const result = await CompanyUsersService.addUserToCompany(userDto, companyUserDto);
      res.status(200).json({success: true, message: 'User added to company successfully', data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      console.log(error.message);
      next(error);
    }
  }

  async getUserByUserId(req, res, next) {
    const userId = req.params.user_id;
    try {
      const result = await CompanyUsersService.getCompanyUserByUserId(userId);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new CompanyUsersController()