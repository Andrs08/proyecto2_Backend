import { reservationModel } from "../reservation.model";
import { UserModel } from "../../users/user.model";
import { bookModel } from "../../books/book.model";
import { CreateReservationDto, ReturnReservationDto } from "../reservation.type";

async function createReservationAction(
  data: CreateReservationDto
): Promise<ReturnReservationDto> {
  const { userId, bookId, return_date } = data;

  const user = await UserModel.findById(userId);
  if (!user || user.isDeleted) {
    throw new Error("El usuario no existe.");
  }

  const book = await bookModel.findById(bookId);
  if (!book || book.isDeleted) {
    throw new Error("El libro no existe.");
  }

  if (!book.isAvaible) {
    throw new Error("El libro no está disponible.");
  }

  const reservation = await reservationModel.create({
    userId,                      
    bookId,
    reserve_date: new Date(),
    return_date: new Date(return_date),
  });

  book.isAvaible = false;
  await book.save();

  return {
    id: reservation._id.toString(),
    userId: reservation.userId.toString(),
    bookId: reservation.bookId.toString(),
    reserve_date: reservation.reserve_date,
    return_date: reservation.return_date,
  };
}

export default createReservationAction;
