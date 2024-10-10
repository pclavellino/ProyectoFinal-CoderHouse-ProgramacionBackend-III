import Pet from "../dao/Pets.dao.js";
import { generatePet } from "../mocks/pet.mock.js";

export class PetServices {
    constructor() {
        this.petDao = new Pet()
    }

    async getAll() {
        const pets = await this.petDao.get();
        return pets;
    }

    async getByID(id) {
        const pet = await this.petDao.getBy(id);
        return pet;
    }

    async create(data) {
        const pet = await this.petDao.save(data);
        return pet;
    }

    async createMany(data) {
        const pets = await this.petDao.saveMany(data);
        return pets;
    }

    async update(id, data) {
        const pet = await this.petDao.update(id, data);
        return pet;
    }

    async remove(id) {
        await this.petDao.delete(id);
        return "Mascota eliminada correctamente";
    }

    async createMocks(amount) {
        const pets = generatePet(amount);
        const petsDb = await this.petDao.saveMany(pets);
        return petsDb;
    }

}