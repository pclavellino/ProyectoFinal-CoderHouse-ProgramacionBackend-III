import PetDTO from "../dto/Pet.dto.js";
import { PetServices } from "../services/pet.services.js";
import __dirname from "../utils/index.js";

export class PetController {
    constructor() {
        this.PetServices = new PetServices()
    }

    getAllPets = async(req,res)=>{
        const pets = await this.PetServices.getAll();
        res.send({status:"success",payload:pets})
    }
    
    createPet = async(req,res)=> {
        const {name,specie,birthDate} = req.body;
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Datos incompletos. Ingrese los datos faltantes"})
        const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
        const result = await this.PetServices.create(pet);
        res.status(201).json({status:"success",payload:result})
    }
    
    updatePet = async(req,res) =>{
        const petUpdateBody = req.body;
        const petId = req.params.pid;
        const result = await this.PetServices.update(petId,petUpdateBody);
        res.status(200).json({status:"success",message:"Mascota actualizada correctamente", payload:result})
    }
    
    deletePet = async(req,res)=> {
        const petId = req.params.pid;
        const result = await this.PetServices.remove(petId);
        res.send({status:"success",message:"Mascota eliminada correctamente"});
    }
    
    createPetWithImage = async(req,res) =>{
        const file = req.file;
        const {name,specie,birthDate} = req.body;
        if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Datos incompletos. Ingrese los datos faltantes"})
        console.log(file);
        const pet = PetDTO.getPetInputFrom({
            name,
            specie,
            birthDate,
            image:`${__dirname}/../public/img/${file.filename}`
        });
        console.log(pet);
        const result = await this.PetServices.create(pet);
        res.send({status:"success",payload:result})
    }

    createPetsMock = async(req, res) => {
        const pets = await this.PetServices.createMocks(100);
        res.status(201).json({ status: "sucess", pets });
    }

}

