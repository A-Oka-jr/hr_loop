const jobSeekersDto = require('./job_seekers_dto');
const usersDto = require("../users/users_dto");

class jobSeekersService {
  async create(jobSeekerDto) {
    const result = await jobSeekersDto.create(jobSeekerDto);
    const updatedUser = await usersDto.update(jobSeekerDto.user_id, {role: 'job_seeker'});
    return result;
  }

  async findAll() {
    const result = await jobSeekersDto.findAll();
    return result;
  }

  async findById(id) {
    const result = await jobSeekersDto.findById(id);
    return result;
  }

  async update(id, jobSeekerDto) {
    const result = await jobSeekersDto.update(id, jobSeekerDto);
    return result;
  }

  async delete(id) {
    const result = await jobSeekersDto.delete(id);
    return result
  }

  async getByUserId(userId) {
    const result = await jobSeekersDto.findByUserId(userId);
    return result
  }

  async updateExperience(userId, index, newExperience) {
  // Fetch current experience data for the user
  const jobSeeker = await jobSeekersDto.findByUserId(userId);

  if (!jobSeeker || !jobSeeker.experience || !jobSeeker.experience.jobs) {
    throw new Error("User experience not found");
  }

  // Update the specific job entry at the given index
  jobSeeker.experience.jobs[index] = newExperience;

  // Save the updated experience back to the database
  const result = await jobSeekersDto.updateExperience(userId, jobSeeker.experience);
  return result;
}

async addExperience(userId, updatedExperience) {
  const result =await jobSeekersDto.updateExperience(userId, updatedExperience);
  return result;
}

async addEducation(userId, updatedEducation) {
  const result = await jobSeekersDto.updateEducation(userId, updatedEducation);
  return result;
}

async updateEducation(userId,index, updatedEducation) {
  const jobSeeker = await jobSeekersDto.findByUserId(userId);

  if (!jobSeeker || !jobSeeker.education ) {
    throw new Error("User education not found");
  }

  // Update the specific job entry at the given index
  jobSeeker.education[index] = updatedEducation;

  // Save the updated experience back to the database
  const result = await jobSeekersDto.updateEducation(userId, jobSeeker.education);
  return result;
}


}

module.exports = new jobSeekersService()