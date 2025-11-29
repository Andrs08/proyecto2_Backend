import {Router, Request, Response} from "express"
import { createBookController, getBookController, deleteBookController, updateBookController, readBooksController } from "./book.controller"
import {authMiddleware} from "../middlewares/auth.middleware"
import { PERMISSIONS } from "../permissions/permissions";
import { requirePermission } from "../middlewares/permissions.middleware";

const bookRoutes = Router()

async function createBook (req: Request, res: Response) {
    const book_created = await createBookController(req.body);

    res.status(201).json({
        message: "Libro creado correctamente",
        libro_creado: book_created
    });
}

bookRoutes.post("/", authMiddleware,requirePermission(PERMISSIONS.CREATE_BOOK), createBook);

async function getBook (req: Request, res: Response) {
    const {code} = req.params;
    const book = await getBookController(code);

    res.status(200).json ({
        message: "Informacion del libro consultada exitosamente",
        libro_consultado: book
    })
}

bookRoutes.get("/:code", getBook);

async function deleteBook (req: Request, res: Response) {
    const {code} = req.params;
    console.log(code);
    const result = await deleteBookController(code);
    res.status(204).json ({
        message: result
    });
}

bookRoutes.delete("/:code", authMiddleware,requirePermission(PERMISSIONS.DELETE_BOOK), deleteBook);

async function updateBook(req: Request, res:Response) {
    const {id} = req.params;
    const fields = req.body;
    const book_updated = await updateBookController(id, fields);
    
    res.status(200).json({
        message: "Libro actualizado correctamente",
        libro_actualizado: book_updated
    });
}

bookRoutes.put("/:id", authMiddleware, requirePermission(PERMISSIONS.UPDATE_BOOK),updateBook);

async function readBooks(req: Request, res: Response) {
    const filtros = req.query;
    const result = await readBooksController(filtros);

    res.status(200).json ({
        message: "Libros que cumpeln con los filtros",
        libros: result
    });
}

bookRoutes.get("/filter", readBooks);

export default bookRoutes;