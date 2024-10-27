const SearchesDto = require('./searches_dto');

class SearchesService {
  async getSearches() {
    const searches = await SearchesDto.getSearches();
    return searches
  }


  async getSearchById(id) {
    const search = await SearchesDto.getSearchById(id);
    return search
  }


  async createSearch(search) {
    const matchingSeekers = await SearchesDto.findMatchingJobSeekers(search.skills, search.country);
    search.results = matchingSeekers.map(seeker => seeker.id);
    const newSearch = await SearchesDto.createSearch(search);
    console.log("matchingSeekers",matchingSeekers)
    await newSearch.save();
    return newSearch
  }


  async updateSearch(id, search) {
    const updatedSearch = await SearchesDto.updateSearch(id, search);
    return updatedSearch
  }


  async deleteSearch(id) {
    const result = await SearchesDto.deleteSearch(id);
    return result
  }


  async getSearchByCompanyId(company_id) {
    const result = await SearchesDto.getSearchByCompanyId(company_id);
    return result
  }


}

module.exports = new SearchesService