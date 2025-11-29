import {bookModel} from "../book.model"
import {createBookDto, returnBookDto} from "../book.types"

async function createBookAction(book: createBookDto): Promise <returnBookDto> {
    const { name, code, genre, publication_date, publisher, author } = book
    if (!name || !code) {
        throw new Error("Los campos nombre y codigo son obligatorios")
    }
    
    const bookExist = await bookModel.findOne({ code , isDeleted: false});
    if (bookExist) {
        throw new Error("Ya existe un libro registrado con ese codigo")
    }

    const creado = await bookModel.create({
        name,
        code, 
        genre, 
        publication_date, 
        publisher, 
        author
    })
    return {
        id: creado._id.toString(),
        name: creado.name,
        code: creado.code, 
        genre: creado.genre, 
        publication_date: creado.publication_date, 
        publisher: creado.publisher, 
        author: creado.author,
        isAvaible: creado.isAvaible
    };
}

export default createBookAction;
