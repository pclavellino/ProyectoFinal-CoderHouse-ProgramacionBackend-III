import { expect } from "chai";
import supertest from "supertest";

const request = supertest("http://localhost:8080/api/pets");

describe("Prueba de Endpoints de Mascotas", () => {
    let testPet;

    it("[GET] /api/pets - Debe devolver un array con todas las mascotas", async () => {
        const { status, body } = await request.get("/");
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("array");
    });

    it("[POST] /api/pets - Debe crear una mascota nueva", async () => {
        const newPet = {
            name: "Mascota de Prueba",
            specie: "Perro",
            birthDate: "01/01/2020",
            image: "Imagen de Prueba",
        };

        const {status, body} = await request.post("/").send(newPet);
        testPet = body.payload;
        expect(status).to.be.equal(201);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Mascota de Prueba");
        expect(body.payload.specie).to.be.equal("Perro");
        expect(body.payload.adopted).to.be.equal(false);  
    });

    it("[PUT] /api/pets/:pid - Debe actualizar una mascota especifica", async () => {
        const petUpdate = {
            specie: "Gato",
        };

        const {status, body} = await request.put(`/${testPet._id}`).send(petUpdate);
        expect(status).to.be.equal(200);
        expect(body.payload).to.be.an("object");
        expect(body.payload.name).to.be.equal("Mascota de Prueba");
        expect(body.payload.specie).to.be.equal("Gato");
        expect(body.payload.adopted).to.be.equal(false);  
    });

    it("[DELETE] /api/pets/:pid - Debe eliminar una mascota especifica", async () => {

        const {status, body} = await request.delete(`/${testPet._id}`);
        expect(status).to.be.equal(200);
        expect(body.message).to.be.equal("Mascota eliminada correctamente"); 
    });

    
});