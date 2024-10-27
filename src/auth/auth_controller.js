const AuthService = require('./auth_service');

class AuthController {
  async register(req, res, next) {
    const usersDto = {
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      mobile: req.body.mobile,
      role: req.body.role ? req.body.role : null,
      photo: req.body.photo ? req.body.photo : null
    }
    try {
      const newUser = await AuthService.register(usersDto);
      res.status(201).json({success: true, message: 'User registered successfully', user: newUser});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);

    }
  }

  async login(req, res, next) {
    const {emailOrMobile	, password} = req.body;
    try {
      const result = await AuthService.login(emailOrMobile	, password);
      res
        .cookie("access_token", result.token, {httpOnly: true})
        .status(200)
        .json({success: true, message: 'Login successful', user: result.user});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("access_token");
      res.status(200).json({success: true, message: "user has been loged out"});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      console.log(error.message);
      next(error);
    }
  }
}

module.exports = new AuthController();
