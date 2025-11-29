import {bookModel} from "../book.model"
import { returnBookDto } from "../book.types"

async function getBookAction(code: string): Promise <returnBookDto> {
    const user = await bookModel.findOne({code, isDeleted: false});
    if (!user)
        throw new Error ("El libro no existe")

    return {
        id: user._id.toString(),
        name: user.name,
        code: user.code, 
        genre: user.genre, 
        publication_date: user.publication_date, 
        publisher: user.publisher, 
        author: user.author,
        isAvaible: user.isAvaible
    }
}

export default getBookAction;