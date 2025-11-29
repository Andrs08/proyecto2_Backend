import { Router, Request, Response } from "express";
import {createReservationController} from "./reservation.controller"
import { authMiddleware } from "../middlewares/auth.middleware";

const reservationRoutes = Router();

async function createReservation (req: Request, res: Response) {
    const user_id = req.authUser!.id;
    const {book_id, return_date} = req.body
    const reserva = await createReservationController(user_id, book_id, return_date);

    res.status(201).json({
        message: "Reserva creada exitosamente",
        reservacion: reserva
    });
}

reservationRoutes.post("/", authMiddleware, createReservation);