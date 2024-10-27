const JobsDto = require('./jobs_dto');
class JobsService {
  async getAllJobs() {
    const jobs = await JobsDto.getAllJobs()
    return jobs
  }

  async getJobsByCompanyId(id) {
    const jobs = await JobsDto.getJobsByCompanyId(id)
    return jobs
  }

  async getJobById(id) {
    const job = await JobsDto.getJobById(id)
    return job
  }

  async delete(id) {
    const result = await JobsDto.delete(id)
    return result
  }

  async update(id, jobDto) {
    const result = await JobsDto.update(id, jobDto)
    const updatedJob = await JobsDto.getJobById(id)
    return updatedJob
  }

  async create(jobDto) {
    const result = await JobsDto.create(jobDto)
    return result
  }

  async searchJobs(query) {
    const jobs = await JobsDto.searchJobs(query)
    return jobs
  }
}

module.exports = new JobsService()