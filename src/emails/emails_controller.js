const EmailService = require('./emails_service');
const CompanyService = require('../company/company_service');
const errorHandler = require('../../utils/error');
const JobsService = require('../jobs/jobs_service');

class EmailController {

  async sendInvitation(req, res, next) {
    const {subject, address, seekers} = req.body;
    const jobId = req.params.id
    const invitationData = {subject, address, seekers};
    const companyId = req.user.company_id

    try {
      const company = await CompanyService.getCompanyById(companyId);
      if (!company) {
        throw errorHandler(404, 'Company not found');
      }
      const job = await JobsService.getJobById(jobId);
      if (!job) {
        throw errorHandler(404, 'Job not found');
      }
      invitationData.company_name = company.name;
      invitationData.job_title = job.title;
      invitationData.company_phone = company.phone;
      invitationData.company_email = company.email;
      const result = await EmailService.sendInvitationEmail(invitationData);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async sendEvaluation(req, res, next) {
    const {emails, seekers} = req.body;
    const jobId = req.params.id;
    const companyId = req.user.company_id
    const EvaluationData = {emails, seekers};

    console.log(req.body)
    try {
      const company = await CompanyService.getCompanyById(companyId);
      if (!company) {
        throw errorHandler(404, 'Company not found');
      }
      const job = await JobsService.getJobById(jobId);
      if (!job) {
        throw errorHandler(404, 'Job not found');
      }
      EvaluationData.company_name = company.name;
      EvaluationData.job_title = job.title;
      EvaluationData.company_phone = company.phone;
      EvaluationData.company_email = company.email;
      EvaluationData.job_id = jobId

      const result = await EmailService.sendEvaluationEmail(EvaluationData);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      console.error('Error sending evaluations:', error);
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }
}

module.exports = new EmailController