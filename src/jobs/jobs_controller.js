const jobsService = require('./jobs_service');
const errorHandler = require('../../utils/error');
const {log} = require("debug");

class JobsController {

  async getAllJobs(req, res, next) {
    try {
      const jobs = await jobsService.getAllJobs()
      return res.status(200).json({success: true, data: jobs})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getJobsByCompanyId(req, res, next) {
    const id = req.params.company_id;
    try {
      const jobs = await jobsService.getJobsByCompanyId(id)
      return res.status(200).json({success: true, data: jobs})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getJobById(req, res, next) {
    const id = req.params.id;
    try {
      const job = await jobsService.getJobById(id)
      return res.status(200).json({success: true, data: job})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const existingJob = await jobsService.getJobById(id)
      if (!existingJob) {
        return res.status(404).json({success: false, message: 'Job not found'});
      }

      if (existingJob.company_id !== req.user.company_id) {
        return res.status(401).json({success: false, message: 'Unauthorized: this job not belong to your company'});
      }

      const result = await jobsService.delete(id)
      return res.status(200).json({success: true, data: result})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async update(req, res, next) {
    const id = req.params.id;
    const jobDto = req.body;

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    try {
      const existingJob = await jobsService.getJobById(id)
      if (!existingJob) {
        return res.status(404).json({success: false, message: 'Job not found'});
      }

      if (existingJob.company_id !== req.user.company_id) {
        return res.status(401).json({success: false, message: 'Unauthorized: this job not belong to your company'});
      }

      const result = await jobsService.update(id, jobDto)
      return res.status(200).json({success: true, data: result})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async create(req, res, next) {
    const jobDto = req.body;

    if (!req.user.role) {
      return res.status(401).json({success: false, message: 'Unauthorized: please login first'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin and company users can create jobs'});
    }

    try {
      const result = await jobsService.create(jobDto)
      return res.status(201).json({success: true, data: result})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async searchJobs(req, res, next) {
    const query = req.query;
    console.log(query)
    try {
      const jobs = await jobsService.searchJobs(query)
      return res.status(200).json({success: true, data: jobs})
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }
}

module.exports = new JobsController()