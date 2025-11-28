import { Router, Request, Response } from "express";
import {readUser, createUser} from "./user.controller"
import {authMiddleware} from "../middlewares/auth.middleware"

const userRoutes = Router();

async function getUser(req: Request, res:Response) {
    const id = req.authUser!.id;
    const user = await readUser(id);

    res.status(200).json({
        message: "Personas consultada",
        persona: user,
    });

}

userRoutes.get("/me", authMiddleware, getUser)

async function postUser(req: Request, res: Response) {
    const {name, email, document_number, password} = req.body;
    const result = await createUser(req.body)

    res.status(201).json({
        message: "Usuario creado correctamente",
        persona_creada: result
    })
} 

userRoutes.post("/", postUser)


export default userRoutes; 