import { UserServices } from "../services/user.services.js";

export class UserControllers {
    constructor() {
        this.UserServices = new UserServices();
    }

    getAllUsers = async(req,res)=>{
        const users = await this.UserServices.getAll();
        res.send({status:"success",payload:users})
    }
    
    getUser = async(req,res)=> {
        const userId = req.params.uid;
        const user = await this.UserServices.getByID(userId);
        if(!user) return res.status(404).send({status:"error",error:"Usuario no encontrado"})
        res.status(200).json({status:"success",payload:user})
    }
    
    updateUser =async(req,res)=>{
        const updateBody = req.body;
        const userId = req.params.uid;
        const user = await this.UserServices.getByID(userId);
        if(!user) return res.status(404).send({status:"error", error:"Usuario no encontrado"})
        const result = await this.UserServices.update(userId,updateBody);
        res.send({status:"success",message:"Usuario actualizado correctamente", payload:result})
    }
    
    deleteUser = async(req,res) =>{
        const userId = req.params.uid;
        const result = await this.UserServices.remove(userId);
        res.send({status:"success",message:"Usuario eliminado correctamente"})
    }

    createUsersMock = async(req, res) => {
        const users = await this.UserServices.createMocks(50);
        res.status(201).json({ status: "sucess", users });
    }
}