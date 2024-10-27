const {Searches, JobSeekers} = require('../../models');
const { Op } = require('sequelize');

class SearchesDto {

  async getSearches() {
    const searches = await Searches.findAll();
    return searches
  }


  async getSearchById(id) {
    const search = await Searches.findOne({where: {id: id}});

    if (search && search.results && search.results.length > 0) {
      const seekers = await JobSeekers.findAll({
        where: {
          id: search.results // Assuming results is an array of seeker IDs
        }
      });
      return { ...search.toJSON(), seekers }; // Return search data along with seekers
    }
    return search
  }


  async createSearch(search) {
    const newSearch = await Searches.create(search);
    return newSearch
  }

  async findMatchingJobSeekers(skills, country) {
    return await JobSeekers.findAll({
      where: {
        [Op.or]: [
          {skills: {[Op.overlap]: skills}},
          {country}
        ]
      }
    });
  }

  async updateSearch(id, search) {
    const updatedSearch = await Searches.update(search, {where: {id: id}});
    return updatedSearch
  }


  async deleteSearch(id) {
    const result = await Searches.destroy({where: {id: id}});
    return result
  }

  async getSearchByCompanyId(company_id) {
    const result = await Searches.findAll({where: {company_id: company_id}});
    return result
  }

}

module.exports = new SearchesDto