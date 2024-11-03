import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/sessions");
const userRequest = supertest("http://localhost:8080/api/users");

describe("Prueba de Endpoints de Sesiones", () => {
    let testUser;

    it("[POST] /api/sessions/register - Debe registrar un usuario nuevo", async () => {
        const newUser = {
            first_name: "Usuario",
            last_name: "Prueba",
            email: "user@test.com",
            password: "userTest",
        };

        const {status, body} = await request.post("/register").send(newUser);
        testUser = body.payload;
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal(testUser.first_name);
        expect(body.payload.last_name).to.be.equal(testUser.last_name);
        expect(body.payload.email).to.be.equal(testUser.email);  
    });

    it("[POST] /api/sessions/login - Debe loguear al usuario", async () => {
        const userData = {
            email: "user@test.com",
            password: "userTest",
        };

        const {status, body} = await request.post("/login").send(userData);
        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("Usuario logueado correctamente");
    });

    after(async () => {
        await userRequest.delete(`/${testUser._id}`)
    });
    
    
});