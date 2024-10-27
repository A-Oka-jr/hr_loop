const appliedDto = require('./applied_dto');
class appliedService {

  async findAll() {
    const result = await appliedDto.findAll();
    return result;
  }

  async create(Dto) {
    // TODO : add vrefication for job if exist
    const result = await appliedDto.create(Dto);
    return result;
  }

  async delete(id) {
    const result = await appliedDto.delete(id);
    return result;
  }

  async findById(id) {
    const result = await appliedDto.findById(id);
    return result;
  }

  async getByJobId(id) {
    const result = await appliedDto.getByJobId(id);
    return result;
  }

  async getByJobSeekerId(id) {
    const result = await appliedDto.getByJobSeekerId(id);
    return result;
  }


  async update(id, Dto) {
    const result = await appliedDto.update(id, Dto);
    return result;
  }

}

module.exports = new appliedService()