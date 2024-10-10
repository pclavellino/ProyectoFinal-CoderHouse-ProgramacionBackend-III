import { Router } from 'express';
import { UserControllers } from '../controllers/users.controller.js';
import { PetController } from '../controllers/pets.controller.js';
import { generateUser } from '../mocks/user.mock.js';
import { generatePet } from '../mocks/pet.mock.js';
import { UserServices } from '../services/user.services.js';
import { PetServices } from '../services/pet.services.js';

const usersController = new UserControllers();
const petsController = new PetController();
const userServices = new UserServices();
const petServices = new PetServices();

const router = Router();

router.get('/mockingusers', usersController.createUsersMock);
router.get('/mockingpets', petsController.createPetsMock);

router.post('/generateData/:cu/:cp', async (req, res) => {
    const { cu, cp } = req.params;
    const users = generateUser(Number(cu));
    const pets = generatePet(Number(cp));
    const usersResponse = await userServices.createMany(users);
    const petsResponse = await petServices.createMany(pets);

    res.status(201).json({ status: "ok", payload: { usersResponse, petsResponse } })
})


export default router;