import { AdoptionServices } from "../services/adoption.services.js";
import { UserServices } from "../services/user.services.js";

const userServices = new UserServices()

export class AdoptionController {
    constructor() {
        this.AdoptionServices = new AdoptionServices()
    }

    getAllAdoptions = async(req,res)=>{
        const result = await this.AdoptionServices.getAll();
        res.send({status:"success",payload:result})
    }
    
    getAdoption = async(req,res)=>{
        const adoptionId = req.params.aid;
        const adoption = await this.AdoptionServices.getByID({_id:adoptionId})
        if(!adoption) return res.status(404).send({status:"error",error:"Datos de Adopción no encontrados"})
        res.send({status:"success",payload:adoption})
    }
    
    createAdoption = async(req,res)=>{
        const {uid,pid} = req.params;
        const user = await userServices.getByID(uid);
        if(!user) return res.status(404).send({status:"error", error:"Usuario no encontrado"});
        const pet = await petsService.getBy({_id:pid});
        if(!pet) return res.status(404).send({status:"error",error:"Mascota no encontrada"});
        if(pet.adopted) return res.status(400).send({status:"error",error:"Mascota ya adoptada"});
        user.pets.push(pet._id);
        await userServices.update(user._id,{pets:user.pets})
        await petsService.update(pet._id,{adopted:true,owner:user._id})
        await this.AdoptionServices.update({owner:user._id,pet:pet._id})
        res.send({status:"success",message:"Mascota adoptada!"})
    }
}


