import { Router, Request, Response } from "express";
import {readUser, createUser, loginController,  deleteUserController, updateUserController} from "./user.controller"
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

userRoutes.get("/me/:", authMiddleware, getUser)

async function postUser(req: Request, res: Response) {
    const result = await createUser(req.body)

    res.status(201).json({
        message: "Usuario creado correctamente",
        persona_creada: result
    })
}

userRoutes.post("/", postUser);

async function login(req: Request, res: Response) {
    const result = await loginController(req.body);

    res.status(202).json({
        message: "token generado correctamente",
        token: result
    });
}

userRoutes.post("/login", login)

async function deleteUser(req: Request, res: Response) {
    const id = req.authUser!.id
    const user_deleted = await deleteUserController(id)

    res.status(204).json({
        message: "Usuario eliminado correctamente",
        usuario_eliminado: user_deleted
    });
}

userRoutes.delete("/", authMiddleware, deleteUser);

async function updateUser(req: Request, res: Response) {
    const id = req.authUser!.id
    const fields = req.body
    const update_user = await updateUserController(id, fields)

    res.status(200).json({
        message: "Usuario actualizado correctamente",
        usuario_actualizado: update_user
    });
}

userRoutes.put("/", authMiddleware, updateUser);

export default userRoutes; 