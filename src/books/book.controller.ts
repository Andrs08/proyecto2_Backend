import createBookAction from "./actions/create.book.action"
import { createBookDto, returnBookDto, updateBookDto } from "./book.types"
import getBookAction from "./actions/get.book.action";
import deleteBookAction from "./actions/delete.book.action";
import updateBookAction from "./actions/update.book.action";

async function createBookController (book: createBookDto): Promise <returnBookDto> {
    const result = await createBookAction(book);
    return result;
}

async function getBookController (code: string): Promise <returnBookDto> {
    const book = await getBookAction(code);
    return book;
}

async function deleteBookController (code: string): Promise <string> {
    const result = await deleteBookAction(code);
    return result;
}

async function updateBookController (id: string, fields: updateBookDto): Promise <returnBookDto> {
    const user_updated = await updateBookAction(id, fields);

    return user_updated;
}


export {createBookController, getBookController, deleteBookController, updateBookController};