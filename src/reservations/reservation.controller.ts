import createReservationAction from "./actions/create.reservation.action"
import { CreateReservationDto, ReturnReservationDto, ReturnReservationHistoryBookDto, ReturnReservationHistoryUserDto } from "./reservation.type";
import getBookHistoryAction from "./actions/getBookHistory.action";
import getUserHistoryAction from "./actions/getUserHistory.action";


async function createReservationController (user_id: string, book_id: string, returnDate: Date): Promise <ReturnReservationDto> {
    const reserva = {
        userId: user_id,
        bookId: book_id,
        return_date: returnDate
    }
    const result = await createReservationAction(reserva);
    return result;
}

async function getBookHistoryController (book_id: string): Promise <ReturnReservationHistoryBookDto[]> {
    const history = await getBookHistoryAction(book_id);
    return history;
}

async function getUserHistoryController (book_id: string): Promise <ReturnReservationHistoryUserDto[]> {
    const history = await getUserHistoryAction(book_id);
    return history;
}


export {createReservationController, getBookHistoryController, getUserHistoryController};