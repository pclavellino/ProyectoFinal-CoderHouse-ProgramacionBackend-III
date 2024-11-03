import { AdoptionServices } from "../services/adoption.services.js";
import { PetServices } from "../services/pet.services.js";
import { UserServices } from "../services/user.services.js";

export class AdoptionController {
    constructor() {
        this.adoptionServices = new AdoptionServices();
        this.userServices = new UserServices();
        this.petServices = new PetServices();
    }

    getAllAdoptions = async( req, res, next) => {
        try {
            const result = await this.adoptionServices.getAll();
            res.send({status:"success",payload:result})
        } catch(error) {
            next(error)
        }
    }
    
    getAdoption = async( req, res, next) => {
        try {
            const adoptionId = req.params.aid;
            const adoption = await this.adoptionServices.getByID({_id:adoptionId})
            if(!adoption) return res.status(404).send({status:"error",error:"Datos de Adopción no encontrados"})
            res.send({status:"success",payload:adoption})
        } catch(error) {
            next(error)
        }
    }
    
    createAdoption = async(req, res, next) => {
        try {
            const {uid,pid} = req.params;
            const user = await this.userServices.getByID(uid);
            if(!user) return res.status(404).send({status:"error", error:"Usuario no encontrado"});
            const pet = await this.petServices.getByID(pid);
            if(!pet) return res.status(404).send({status:"error",error:"Mascota no encontrada"});
            if(pet.adopted) return res.status(400).send({status:"error",error:"Mascota ya adoptada"});
            user.pets.push(pet._id);
            await this.userServices.update(user._id,{pets:user.pets})
            await this.petServices.update(pet._id,{adopted:true,owner:user._id})
            const adoption = await this.adoptionServices.create({owner:user._id,pet:pet._id})
            res.status(201).json({status:"success",message:"Mascota adoptada!", payload: adoption })
        } catch(error) {
            next(error)
        }
    }
}


