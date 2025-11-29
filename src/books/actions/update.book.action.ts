import { bookModel } from "../book.model";
import { returnBookDto, updateBookDto } from "../book.types";

async function updateBookAction (id: string, fields: updateBookDto): Promise <returnBookDto> {
    const book = await bookModel.findById(id);
    if (!book || book.isDeleted)
        throw new Error("El libro no existe");

    const updateFields: any = {};
    if (fields.name)
        updateFields.name = fields.name;
    if (fields.genre)
        updateFields.genre = fields.genre;
    if (fields.publication_date)
        updateFields.publication_date = fields.publication_date;
    if (fields.publisher)
        updateFields.publisher = fields.publisher;
    if (fields.author)
        updateFields.author = fields.author;
    if (fields.isAvaible)
        updateFields.isAvaible = fields.isAvaible;

    const updated = await bookModel.findByIdAndUpdate(id, {$set: updateFields}, {new: true})

    return {
        id: updated!._id.toString(),
        name: updated!.name,
        code: updated!.code, 
        genre: updated!.genre, 
        publication_date: updated!.publication_date, 
        publisher: updated!.publisher, 
        author: updated!.author,
        isAvaible: updated!.isAvaible
    }
}

export default updateBookAction;