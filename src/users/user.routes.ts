import { Router, Request, Response } from "express";
import {readUsers} from "./user.controller"

const userRoutes = Router();

async function getUsers(req: Request, res:Response) {
    const users = await readUsers();

    res.status(200).json({
        message: "Personas consultada",
        personas: users,
    });

}

userRoutes.get("users", getUsers)


export {userRoutes}; 