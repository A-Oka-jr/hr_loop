const usersService = require('./users_service');


class userController {
  async findAll(req, res) {
    try {
      const users = await usersService.findAll();
      return res.json({success: true, data: users});
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
  }

  async findById(req, res) {
    const id = req.params.id;
    try {
      const user = await usersService.findById(id);
      return res.json({success: true, data: user});
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const userDto = req.body;

    if (id !== req.user.userId) {
      return res.status(401).json({success: false, message: 'Unauthorized: you only can update your own profile'});
    }

    try {
      const user = await usersService.update(id, userDto);
      return res.json({success: true, data: user});
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
  }

  async delete(req, res) {
    const id = req.params.id;

    if (id !== req.user.userId) {
      return res.status(401).json({success: false, message: 'Unauthorized: you only can delete your own account'});
    }

    try {
      const user = await usersService.delete(id);
      return res.json({success: true, data: user});
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
  }

  async updatePhoto(req, res) {
    const id = req.params.user_id;
    console.log(req.user)
    const userId = req.user.id;
    if (id !== userId) {
      return res.status(401).json({success: false, message: 'Unauthorized: you only can update your own profile'});
    }
    try {
      const user = await usersService.updatePhoto(id, req.file);
      return res.json({success: true, data: user});
    } catch (error) {
      return res.status(400).json({success: false, message: error.message});
    }
  }
}

module.exports = new userController()