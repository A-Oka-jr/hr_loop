const usersDto = require('./users_dto');
const errorHandler = require('../../utils/error');

class usersService {

  async findAll() {
    const users = await usersDto.findAll();
    return users;
  }

  async findById(id) {
    const user = await usersDto.findById(id);
    return user;
  }


  async update(id, userDto) {
    const user = await usersDto.findById(id);
    if (!user) {
      throw errorHandler(404, 'User not found');
    }
    const updatedUser = await usersDto.update(id, userDto);
    return {updatedUser, message: 'User updated successfully'};
  }


  async delete(id) {
    const user = await usersDto.findById(id);
    if (!user) {
      throw errorHandler(404, 'User not found');
    }
    const result = await usersDto.delete(id);
    return {result, message: 'User deleted successfully'};
  }


  async updatePhoto(id, file) {
    let fileName = file.filename
    const user = await usersDto.updatePhoto(id, fileName);
    return user;
  }

}

module.exports = new usersService()