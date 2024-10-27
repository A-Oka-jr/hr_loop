const {User} = require('../../models'); // Adjust the path as necessary

class UsersDto {

  async findAll() {
    const users = await User.findAll();
    return users;
  }

  async findById(id) {
    const user = await User.findByPk(id);
    return user;
  }


  async update(id, userDto) {
    const updatedUser = await User.update(userDto, {where: {id: id}});
    return updatedUser;
  }

  async delete(id) {
    const result = await User.destroy({where: {id: id}});
    return result;
  }


  async updatePhoto(id, fileName) {
    const user = await User.update({photo: fileName}, {where: {id: id}});
    return user;
  }

  async findByMobile(mobile) {
    console.log("///////////////////////////////////////")
    const user = await User.findOne({where: {mobile: mobile}});
    return user;
  }
}

module.exports = new UsersDto()