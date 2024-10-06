import Adoption from "../dao/Adoption.js";

export class AdoptionServices {
    constructor() {
        this.adoptionDao = new Adoption()
    }

    async getAll() {
        const adoption = await this.adoptionDao.get();
        return adoption;
    }

    async getByID(id) {
        const adoption = await this.adoptionDao.getBy(id);
        return adoption;
    }

    async create(data) {
        const adoption = await this.adoptionDao.save(data);
        return adoption;
    }

    async update(id, data) {
        const adoption = await this.adoptionDao.update(id, data);
        return adoption;
    }
    
    async remove(id) {
        await this.adoptionDao.remove(id);
        return "Datos eliminados correctamente";
    }

}