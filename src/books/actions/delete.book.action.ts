import {bookModel} from "../book.model"

async function deleteBookAction (code: string): Promise <string> {
    const book = await bookModel.findOne({code});
    if (!book)
        throw new Error("El libro no existe")
    const deleted = await bookModel.updateOne({code: book.code}, {isDeleted: true})
    return "Libro eliminado correctamente"
}

export default deleteBookAction;