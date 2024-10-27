const authDto = require('./auth_dto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const errorHandler = require('../../utils/error');
const CompanyUsersDto = require("../companey_users/company_users_dto");
const jobSeekersDto = require("../Job_seekers/job_seekers_dto");
const usersDto = require("../users/users_dto");
class AuthService {
  async register(usersData) {

    if (!usersData.email || !usersData.password || !usersData.mobile || !usersData.first_name || !usersData.last_name) {
      throw errorHandler(400, 'Email, password,first_name and are required');
    }


    // Check if user already exists
    const existingUser = await authDto.findByEmail(usersData.email);
    if (existingUser) {
      throw errorHandler(409, 'User already exists');
    }
    // Check if mobile number already exists
    const existingMobile = await usersDto.findByMobile(usersData.mobile);
    if (existingMobile) {
      throw errorHandler(409, 'Mobile number already exists');
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(usersData.password, 12);

    // Create a new user
    const newUser = await authDto.register({
      email: usersData.email,
      password: hashedPassword,
      first_name: usersData.first_name,
      last_name: usersData.last_name,
      role: usersData.role
    })

    return {
      id: newUser.id,
      first_name: newUser.first_name,
      last_name: newUser.last_name,
      email: newUser.email,
      role: newUser.role,
    };
  }

  async login(emailOrMobile	, password) {
    if (!emailOrMobile	 || !password) {
      throw errorHandler(400, 'Email and password are required');
    }

    let user = await authDto.findByEmail(emailOrMobile	);
    if (!user) {
      user = await usersDto.findByMobile(emailOrMobile	);
      if (!user) {
        throw errorHandler(404, 'User not found');
      }
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw errorHandler(401, 'Invalid password');
    }

    // get company_id from company users if exists
    const companyUsers = await CompanyUsersDto.getCompanyByUserId(user.id);

    // if user_id exists in job_seekers table
    const jobSeeker = await jobSeekersDto.findByUserId(user.id);

    user.company_id = null;
    user.job_seeker_id = null;

    if (jobSeeker) {
      user.job_seeker_id = jobSeeker.id
    }

    if (companyUsers) {
      user.company_id = companyUsers.company_id
    }

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
      company_id: user.company_id,
      job_seeker_id: user.job_seeker_id
    }
    // Generate a JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

    return {
      token, user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role,
        company_id: user.company_id,
        job_seeker_id: user.job_seeker_id
      }
    };
  }
}

module.exports = new AuthService();
