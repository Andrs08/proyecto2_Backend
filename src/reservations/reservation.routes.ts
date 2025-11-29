import { Router, Request, Response } from "express";
import {createReservationController, getBookHistoryController, getUserHistoryController} from "./reservation.controller"
import { authMiddleware } from "../middlewares/auth.middleware";
import { PERMISSIONS } from "../permissions/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";

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

async function getBookHistory(req: Request, res: Response) {
    const {book_id} = req.params;
    const bookHistory = await getBookHistoryController(book_id);

    res.status(200).json({
        message: "Historia de reserva de libro retornada correctamente",
        historia: bookHistory
    })
}

reservationRoutes.get("/book_history/:book_id", authMiddleware, requirePermission(PERMISSIONS.VIEW_BOOK_HISTORY),getBookHistory)

async function getUserHistory(req: Request, res: Response) {
    const user_id = req.authUser!.id;
    const userHistory = await getUserHistoryController(user_id);

    res.status(200).json({
        message: "Historia de reserva del usuario retornada correctamente",
        historia: userHistory
    })
}

reservationRoutes.get("/user_history", authMiddleware, requirePermission(PERMISSIONS.VIEW_USER_HISTORY),getUserHistory)

export default reservationRoutes;

