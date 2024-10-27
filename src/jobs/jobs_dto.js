const {Jobs, Companies} = require('../../models')
const {Sequelize, Op} = require('sequelize'); // Ensure you have Sequelize operators imported

class JobsDto {
  async getAllJobs() {
    const jobs = await Jobs.findAll()
    return jobs
  }

  async getJobsByCompanyId(id) {
    const jobs = await Jobs.findAll({where: {company_id: id}})
    return jobs
  }

  async getJobById(id) {
    const job = await Jobs.findOne({where: {id: id}})
    return job
  }

  async delete(id) {
    const result = await Jobs.destroy({where: {id: id}})
    return result
  }

  async update(id, jobDto) {
    const result = await Jobs.update(jobDto, {where: {id}})
    return result
  }

  async create(jobDto) {
    const result = await Jobs.create(jobDto)
    return result
  }

  // Assuming JobsDto and CompaniesDto are available and correctly configured
  async searchJobs(query) {
    const whereClause = {
      status: 'opened',
    };

    if (query.title) {
      whereClause.title = {
        [Op.iLike]: `%${query.title}%`,
      };
    }

    if (query.type) {
      whereClause.type = {
        [Op.eq]: query.type,
      };
    }

    if (query.country) {
      whereClause.country = {
        [Op.iLike]: `%${query.country}%`,
      };
    }

    if (query.skills) {
      whereClause['requirements.qualifications.skills'] = {
        [Op.iLike]: `%${query.skills}%`,
      };
    }
    console.log('Where Clause:', whereClause);

    try {
      const jobs = await Jobs.findAll({
        where: whereClause,
        include: [{
          model: Companies,
          as: 'company',
          attributes: ['id', 'name', 'email', 'industry', 'company_size', 'phone', 'address', 'image'],
        }],
      });

      const companyIds = [...new Set(jobs.map(job => job.company_id))];

      const companies = await Companies.findAll({
        where: {
          id: {
            [Op.in]: companyIds,
          },
        },
      });

      return {
        jobs,
        companies,
      };    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw new Error('Failed to fetch jobs');
    }
  }

}

module.exports = new JobsDto()