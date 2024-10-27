const {Applied, JobSeekers, Jobs} = require('../../models');


class appliedDto {
  async findAll() {
    const result = await Applied.findAll();
    return result;
  }

  async create(Dto) {
    const result = await Applied.create(Dto);
    return result;
  }

  async delete(id) {
    const result = await Applied.destroy({where: {id: id}});
    return result
  }

  async findById(id) {
    const result = await Applied.findByPk(id);
    return result;
  }

  async getByJobId(id) {
    const result = await Applied.findAll({
      where: {job_id: id},
      include: [
        {
          model: JobSeekers,  // Reference the JobSeekers model class
          as: 'seeker'        // Use the alias defined in the association
        },
        {
          model: Jobs,        // Reference the Jobs model class
          as: 'job'           // Use the alias defined in the association
        }
      ]
    });
    return result;
  }


  async getByJobSeekerId(id) {
    const result = await Applied.findAll({where: {job_seeker_id: id}});
    return result;
  }

  async update(id, Dto) {
    const result = await Applied.update(Dto, {where: {id: id}});
    return result;
  }

  async updateByJobSeekerId(id, Dto) {
    const result = await Applied.update(Dto, {where: {job_seeker_id: id}});
    return result;
  }
}

module.exports = new appliedDto()