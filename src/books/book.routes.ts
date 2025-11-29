import {Router, Request, Response} from "express"
import { createBookController, getBookController, deleteBookController, updateBookController } from "./book.controller"
import {authMiddleware} from "../middlewares/auth.middleware"

const bookRoutes = Router()

async function createBook (req: Request, res: Response) {
    const book_created = await createBookController(req.body);

    res.status(201).json({
        message: "Libro creado correctamente",
        libro_creado: book_created
    });
}

bookRoutes.post("/", authMiddleware, createBook);

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
    //const perm = req.authUser?.permissions
    const {code} = req.params;
    console.log(code);
    const result = await deleteBookController(code);
    res.status(204).json ({
        message: result
    });
}

bookRoutes.delete("/:code", authMiddleware, deleteBook);

async function updateBook(req: Request, res:Response) {
    const {id} = req.params;
    const fields = req.body;
    const book_updated = await updateBookController(id, fields);
    
    res.status(200).json({
        message: "Libro actualizado correctamente",
        libro_actualizado: book_updated
    });
}

bookRoutes.put("/:id", authMiddleware, updateBook);


export default bookRoutes;