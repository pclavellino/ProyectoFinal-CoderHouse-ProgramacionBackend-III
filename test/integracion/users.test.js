import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/users");
const sessionRequest = supertest("http://localhost:8080/api/sessions");

describe("Prueba de Endpoints de Usuarios", () => {
    let testUser;

    before(async () => {
        const newUser = {
            first_name: "Usuario",
            last_name: "Prueba",
            email: "user@test.com",
            password: "userTest",
        };
        
        const { body } = await sessionRequest.post("/register").send(newUser);
        testUser = body.payload;
    })

    it("[GET] /api/users - Debe devolver un array con todos los usuarios", async () => {
        const { status, body } = await request.get("/");
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[GET] /api/users/:uid - Debe devolver un usuario especifico", async () => {
        const { status, body } = await request.get(`/${testUser._id}`);
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
    });

    it("[PUT] /api/users/:uid - Debe actualizar un usuario especifico", async () => {
        const userUpdate = {
            role: "Admin",
        };

        const {status, body} = await request.put(`/${testUser._id}`).send(userUpdate);
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.first_name).to.be.equal(testUser.first_name);
        expect(body.payload.last_name).to.be.equal(testUser.last_name);
        expect(body.payload.role).to.be.equal("Admin");  
    });

    it("[DELETE] /api/users/:uid - Debe eliminar un usuario especifico", async () => {

        const {status, body} = await request.delete(`/${testUser._id}`);
        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("Usuario eliminado correctamente"); 
    });

    
});