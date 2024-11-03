import Users from "../dao/Users.dao.js";
import { generateUser } from "../mocks/user.mock.js";

export class UserServices {
    constructor() {
        this.userDao = new Users()
    }

    async getAll() {
        const users = await this.userDao.get();
        return users;
    }

    async getByID(id) {
        const user = await this.userDao.getBy(id);
        return user;
    }

    async getUsersByEmail(email) {
        return await this.userDao.getByEmail(email);
    }

    async create(data) {
        const user = await this.userDao.save(data);
        return user;
    }

    async createMany(data) {
        const users = await this.userDao.saveMany(data);
        return users;
    }

    async update(id, data) {
        const user = await this.userDao.update(id, data);
        return user;
    }
    
    async remove(id) {
        await this.userDao.delete(id);
        return "Usuario eliminado correctamente";
    }

    async createMocks(amount) {
        const users = generateUser(amount);
        const usersDb = await this.userDao.saveMany(users);
        return usersDb;
    }

}