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
    
    async delete(id) {
        await this.adoptionDao.delete(id);
        return "Datos eliminados correctamente";
    }

}