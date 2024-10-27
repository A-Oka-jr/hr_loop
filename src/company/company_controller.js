const CompanyService = require('./company_service');


class CompanyController {

  async createCompany(req, res, next) {
    const companyData = {
      name: req.body.name,
      image: req.body.image ? req.body.image : null,
      email: req.body.email,
      subscription_status: req.body.subscription_status ? req.body.subscription_status : 'inactive',
      subscription_plan_id: req.body.subscription_plan_id ? req.body.subscription_plan_id : null,
      industry: req.body.industry,
      company_size: req.body.company_size ? req.body.company_size : null,
      address: req.body.address ? req.body.address : null,
      phone: req.body.phone ? req.body.phone : null,
      description: req.body.description ? req.body.description : null
    }

    const companyUsersDto = {
      user_id: req.body.user_id,
      role: req.body.role
    }

    try {
      const newCompany = await CompanyService.createCompany(companyData, companyUsersDto);
      res.status(201).json({success: true, message: 'Company created successfully', company: newCompany});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getCompanyById(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CompanyService.getCompanyById(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async updateCompany(req, res, next) {
    const id = req.params.id;
    const companyData = {
      name: req.body.name,
      email: req.body.email,
      industry: req.body.industry,
      company_size: req.body.company_size ? req.body.company_size : null,
      address: req.body.address ? req.body.address : null,
      phone: req.body.phone ? req.body.phone : null,
      description: req.body.description ? req.body.description : null
    }

    try {
      const result = await CompanyService.updateCompany(id, companyData);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async uploadProfilePicture(req, res, next) {
    const id = req.params.id;
    try {
      const result = await CompanyService.uploadProfilePicture(id, req.file);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }
}

module.exports = new CompanyController()