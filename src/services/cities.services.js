import CitiesRepository from "../repositories/cities.repository.js";

export default class CitiesServices {
    async handleCitiesRepository(name) {
        const citiesRepository = new CitiesRepository();
        const responseDB = await citiesRepository.postCityDB(name)
        return responseDB
    }    
}
