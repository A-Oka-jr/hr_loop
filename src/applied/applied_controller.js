const appliedService = require('./applied_service');

class appliedController {

  async findAll(req, res, next) {
    try {
      const result = await appliedService.findAll();
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async create(req, res, next) {
    const appliedDto = req.body;

    try {
      const applied = await appliedService.getByJobId(appliedDto.job_id)

      if (applied && applied.some(a => a.job_seeker_id == appliedDto.job_seeker_id)) {
        return res.status(401).json({success: false ,message: "You Already applied for this job"})
      }
      const result = await appliedService.create(appliedDto);
      res.status(201).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async delete(req, res, next) {
    const id = req.params.id;
    try {
      const result = await appliedService.delete(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async findById(req, res, next) {
    const id = req.params.id;
    try {
      const result = await appliedService.findById(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getByJobId(req, res, next) {
    const id = req.params.job_id;
    try {
      const result = await appliedService.getByJobId(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

  async getByJobSeekerId(req, res, next) {
    const id = req.params.job_seeker_id;
    try {
      const result = await appliedService.getByJobSeekerId(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error);
    }
  }

 async update(req, res, next) {
  const appliedDto = req.body;

  try {
    const updatePromises = appliedDto.map(async (applied) => {
      const { appliedId, hr_evaluation, department_evaluations, sendForEvaluation, sendInvitation } = applied;

      return await appliedService.update(appliedId, {
        hr_evaluation,
        department_evaluations,
        send_for_evaluation: sendForEvaluation,
        send_invitation: sendInvitation,
      });
    });

    // Await all the update promises
    const result = await Promise.all(updatePromises);

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
    next(error);
  }
}


}

module.exports = new appliedController();