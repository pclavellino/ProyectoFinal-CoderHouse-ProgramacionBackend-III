import { fakerES_MX as faker } from "@faker-js/faker";

export const generateUser = (amount) => {

    const users = [];
    for (let i = 0; i < amount; i++) {
        const user = {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: "coder123",
            role: "user",
            pets: [],
        };
        users.push(user);      
    }
    return users;
}