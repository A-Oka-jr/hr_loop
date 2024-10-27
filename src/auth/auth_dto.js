const { User } = require('../../models'); // Adjust the path as necessary

class authDto {
  async register(userDto) {
    const user = await User.create(userDto)
    return user;
  }
  async findByEmail(email) {
    return await User.findOne({ where: { email:email } });
  }
}

module.exports = new authDto()