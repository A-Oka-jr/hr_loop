const SearchesService = require('./searches_service');
const errorHandler = require('../../utils/error');


class SearchesController {
  async getSearches(req, res, next) {
    if (!req.user) {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin can get searches'});
    }
    
    try {
      const searches = await SearchesService.getSearches();
      res.status(200).json(searches);
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }


  async getSearchById(req, res, next) {
    const id = req.params.id;
    try {
      const search = await SearchesService.getSearchById(id);
      res.status(200).json({success: true, data: search});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }


  async createSearch(req, res, next) {
    const search = req.body;

    search.results = []
    if (!req.user) {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin can create searches'});
    }

    try {
      const createdSearch = await SearchesService.createSearch(search);
      res.status(201).json({success: true, data: createdSearch});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }


  async updateSearch(req, res, next) {
    const id = req.params.id;
    const search = req.body;

    if (!req.user) {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin can update searches'});
    }

    try {
      const result = await SearchesService.getSearchById(id);
      if(!result) {
        return res.status(404).json({success: false, message: 'Search not found'});
      }
      if(req.user.company_id !== search.company_id) {
        return res.status(401).json({success: false, message: 'Unauthorized: this search not belong to your company'});
      }
      const updatedSearch = await SearchesService.updateSearch(id, search);
      res.status(200).json({success: true, data: updatedSearch});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }


  async deleteSearch(req, res, next) {
    const id = req.params.id;

    if (!req.user) {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin can delete searches'});
    }

    try {
      const search = await SearchesService.getSearchById(id);
      if(!search) {
        return res.status(404).json({success: false, message: 'Search not found'});
      }

      if(req.user.company_id !== search.company_id) {
        return res.status(401).json({success: false, message: 'Unauthorized: this search not belong to your company'});
      }
      const result = await SearchesService.deleteSearch(id);
      res.status(200).json({success: true, data: result});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }


  async getSearchByCompanyId(req, res, next) {
    const company_id = req.params.company_id;

    if (!req.user) {
      return res.status(401).json({success: false, message: 'Unauthorized'});
    }

    if (req.user.role !== 'admin' && req.user.role !== 'company_user') {
      return res.status(401).json({success: false, message: 'Unauthorized: only admin can get searches'});
    }
    try {
      const searches = await SearchesService.getSearchByCompanyId(company_id);
      res.status(200).json({success: true, data: searches});
    } catch (error) {
      res.status(400).json({success: false, message: error.message});
      next(error)
    }
  }

}

module.exports = new SearchesController()