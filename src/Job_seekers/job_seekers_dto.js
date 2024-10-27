const {JobSeekers} = require('../../models');
class jobSeekersDto {

  async create(jobSeekerDto) {
    const result = await JobSeekers.create(jobSeekerDto);
    return result;
  }

  async findAll() {
    const result = await JobSeekers.findAll();
    return result;
  }

  async findById(id) {
    const result = await JobSeekers.findByPk(id);
    return result;
  }

  async update(id, jobSeekerDto) {
    
    const result = await JobSeekers.update(jobSeekerDto, {where: {id}});
    return result;
  }

  async delete(id) {
    const result = await JobSeekers.destroy({where: {id}});
    return result
  }

  async findByUserId(userId) {
    const result = await JobSeekers.findOne({where: {user_id: userId}});
    return result
  }

  async updateExperience(userId, updatedExperience) {
  const result = await JobSeekers.update(
    { experience: updatedExperience }, // Update the entire experience object
    { where: { user_id: userId } }
  );
  return result;
}

async updateEducation(userId, updatedEducation) {
  const result = await JobSeekers.update(
    { education: updatedEducation }, // Update the entire experience object
    { where: { user_id: userId } }
  );
  return result;
}

}

module.exports = new jobSeekersDto()