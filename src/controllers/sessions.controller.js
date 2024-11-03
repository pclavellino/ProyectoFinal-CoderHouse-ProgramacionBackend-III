import { UserServices } from "../services/user.services.js";
import { createHash, passwordValidation } from "../utils/index.js";
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

export class SessionsController {
    constructor() {
        this.userServices = new UserServices();
    }
    
    register = async (req, res, next) => {
        try {
            const { first_name, last_name, email, password } = req.body;
            if (!first_name || !last_name || !email || !password) return res.status(400).send({ status: "error", error: "Datos incompletos" });
            const exists = await this.userServices.getUsersByEmail(email);
            if (exists) return res.status(400).send({ status: "error", error: "El usuario ya existe" });
            const hashedPassword = createHash(password);
            const user = {
                first_name,
                last_name,
                email,
                password: hashedPassword
            }
            let result = await this.userServices.create(user);
            res.status(201).json({ status: "success", message: "Usuario Registrado correctamente", payload: result });
        } catch (error) {
            next(error)
        }
    }
    
    login = async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Datos incompletos" });
        const user = await this.userServices.getUsersByEmail(email);
        if(!user) return res.status(404).send({status:"error",error:"El usuario no existe"});
        const isValidPassword = await passwordValidation(user,password);
        if(!isValidPassword) return res.status(400).send({status:"error",error:"La contraseña es incorrecta"});
        const userDto = UserDTO.getUserTokenFrom(user);
        const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
        res.cookie('coderCookie',token,{maxAge:3600000});
        res.status(200).json({status:"success",message:"Usuario logueado correctamente"})
    }
    
    current = async(req,res) =>{
        const cookie = req.cookies['coderCookie']
        const user = jwt.verify(cookie,'tokenSecretJWT');
        if(user)
            return res.status(200).json({status:"success",payload:user})
    }
    
    unprotectedLogin  = async(req,res) =>{
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ status: "error", error: "Datos incompletos" });
        const user = await this.userServices.getUsersByEmail(email);
        if(!user) return res.status(404).send({status:"error",error:"El usuario no existe"});
        const isValidPassword = await passwordValidation(user,password);
        if(!isValidPassword) return res.status(400).send({status:"error",error:"La contraseña es incorrecta"});
        const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
        res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
    }
    unprotectedCurrent = async(req,res)=>{
        const cookie = req.cookies['unprotectedCookie']
        const user = jwt.verify(cookie,'tokenSecretJWT');
        if(user)
            return res.send({status:"success",payload:user})
    }

}


