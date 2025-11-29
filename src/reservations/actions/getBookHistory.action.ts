import { reservationModel } from "../reservation.model";
import { UserModel } from "../../users/user.model";
import { ReturnReservationHistoryBookDto } from "../reservation.type";

async function getBookHistoryAction(
  bookId: string
): Promise<ReturnReservationHistoryBookDto[]> {
  const reservations = await reservationModel
    .find({ bookId })
    .populate("userId", "name email document_number")
    .lean();

  return reservations.map((r) => ({
    id: r._id.toString(),
    userName: (r as any).userId.name,
    userEmail: (r as any).userId.email,
    reserve_date: r.reserve_date,
    return_date: r.return_date,
  }));
}

export default getBookHistoryAction;
