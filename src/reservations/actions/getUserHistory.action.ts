import { reservationModel } from "../reservation.model";
import { bookModel } from "../../books/book.model";
import { ReturnReservationHistoryUserDto } from "../reservation.type";

async function getUserHistoryAction(
  userId: string
): Promise<ReturnReservationHistoryUserDto[]> {
  const reservations = await reservationModel
    .find({ userId })
    .populate("bookId", "name code author") // Información del libro
    .lean();

  return reservations.map((r) => ({
    id: r._id.toString(),
    bookName: (r as any).bookId.name,
    bookAuthor: (r as any).bookId.author,
    reserve_date: r.reserve_date,
    return_date: r.return_date,
  }));
}

export default getUserHistoryAction;
