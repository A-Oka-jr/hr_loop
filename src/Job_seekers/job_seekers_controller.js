const jobSeekersService = require('./job_seekers_service');
const upload = require('../../middleware/multerConfig'); // Adjust path as needed
class jobSeekersController {
  async create(req, res, next) {
    const jobSeekerDto = req.body;
    try {
      const newJobSeeker = await jobSeekersService.create(jobSeekerDto);
      res.status(201).json({success: true, message: 'Job seeker created successfully', data: newJobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const jobSeekers = await jobSeekersService.findAll();
      res.status(200).json({success: true, data: jobSeekers});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getById(req, res, next) {
    const id = req.params.id;
    try {
      const jobSeeker = await jobSeekersService.findById(id);
      res.status(200).json({success: true, data: jobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async update(req, res, next) {
    const id = req.params.id;
    const jobSeekerDto = req.body;
    // console.log('Request Body:', jobSeekerDto);
    console.log('id:', id)
    // console.log('Uploaded File:', req.file); // File information
    try {
      // Update job seeker
      const result = await jobSeekersService.update(id, jobSeekerDto);
      console.log(result)
      if (result) {
        const updatedJobSeeker = await jobSeekersService.findById(id);
        return res.status(200).json({success: true, data: updatedJobSeeker});
      } else {
        return res.status(404).json({success: false, message: 'Job seeker not found'});
      }
    } catch (error) {
      console.error('Error:', error);
      return res.status(400).json({success: false, message: error.message});
    }
  }


  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const result = await jobSeekersService.delete(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getJobSeekerById(req, res, next) {
    const id = req.params.id;
    try {
      const jobSeeker = await jobSeekersService.findById(id);
      res.status(200).json({success: true, data: jobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getByUserId(req, res, next) {
    const userId = req.params.user_id;
    try {
      const jobSeeker = await jobSeekersService.getByUserId(userId);
      res.status(200).json({success: true, data: jobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async updateExperience(req, res, next) {
    const userId = req.params.user_id;
    const {index, experience} = req.body; // Destructure the index and experience object from the request body
    console.log(req.body)
    try {
      const jobSeeker = await jobSeekersService.updateExperience(userId, index, experience);
      res.status(200).json({success: true, data: jobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async addExperience(req, res, next) {
    const userId = req.params.user_id;
    const newExperience = req.body; // New experience object to add

    try {
      // Fetch the current job seeker data
      const jobSeeker = await jobSeekersService.getByUserId(userId);

      if (!jobSeeker) {
        return res.status(404).json({success: false, message: 'Job seeker not found'});
      }

      // Check if experience field exists
      if (!jobSeeker.experience) {
        jobSeeker.experience = {jobs: []}; // Initialize if not present
      }

      // Add the new experience to the jobs array
      jobSeeker.experience.jobs.push(newExperience);

      // Update the job seeker record in the database
      await jobSeekersService.addExperience(userId, jobSeeker.experience);

      res.status(200).json({success: true, message: 'Experience added successfully', data: jobSeeker});
    } catch (error) {
      console.error('Error adding experience:', error);
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async addEducation(req, res, next) {
    const userId = req.params.user_id;
    const newEducation = req.body; // New education object to add

    try {
      const jobSeeker = await jobSeekersService.getByUserId(userId);

      if (!jobSeeker) {
        return res.status(404).json({success: false, message: 'Job seeker not found'});
      }

      // Check if education field exists
      if (!jobSeeker.education) {
        jobSeeker.education = {}; // Initialize if not present
      }

      jobSeeker.education.push(newEducation);

      await jobSeekersService.addEducation(userId, jobSeeker.education);

      res.status(200).json({success: true, message: 'Education added successfully', data: jobSeeker});
    } catch (error) {
      console.error('Error adding education:', error);
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async updateEducation(req, res, next) {
    const userId = req.params.user_id;
    const {index, education} = req.body; // Destructure the index and education object from the request body
    try {
      const jobSeeker = await jobSeekersService.updateEducation(userId, index, education);
      res.status(200).json({success: true, data: jobSeeker});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }
}

module.exports = new jobSeekersController();
