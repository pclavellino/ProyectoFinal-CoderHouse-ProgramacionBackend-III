import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/adoptions");
const userRequest = supertest("http://localhost:8080/api/users");
const petRequest = supertest("http://localhost:8080/api/pets");
const sessionRequest = supertest("http://localhost:8080/api/sessions");

describe("Prueba de Endpoints de Adopciones", () => {
    let testAdoption;
    let testUser;
    let testPet;

    before( async () => {
        const newUser = {
            first_name: "Adopcion",
            last_name: "Prueba",
            email: "adoption@test.com",
            password: "adoptionUser",
        };

        const newPet = {
            name: "Mascota de Adopcion",
            specie: "Gato",
            birthDate: "01/01/2020",
            image: "Imagen de Prueba",
        };

        const { body : userBody} =  await sessionRequest.post("/register").send(newUser);
        const { body : petBody} =  await petRequest.post("/").send(newPet)

        testUser = userBody.payload;
        testPet = petBody.payload;
    })
    
    it("[POST] /api/adoptions/:uid/:pid - Debe generar una adopcion", async () => {

        const { status, body } = await request.post(`/${testUser._id}/${testPet._id}`)
        console.log(body.payload)
        testAdoption = body.payload;
        expect(status).to.be.equal(201);
        expect(body.message).to.be.equal("Mascota adoptada!"); 
    })

    it("[GET] /api/adoptions - Debe devolver todas las adopciones", async () => {
        const { status, body } = await request.get("/");
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[GET] /api/adoptions/:aid - Debe devolver un adopcion especifica", async () => {
        const { status, body } = await request.get(`/${testAdoption._id}`);
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload).to.have.property("owner");
        expect(body.payload).to.have.property("pet");
    });

    after( async () => {
        await userRequest.delete(`/${testUser._id}`)
        await petRequest.delete(`/${testPet._id}`)
    });

    
});