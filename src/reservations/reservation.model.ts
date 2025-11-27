import { Schema, model, Types } from "mongoose";

type reservationType = {
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  reserve_date: Date;
  return_date: Date;
};

const ReservationSchema = new Schema<reservationType>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    reserve_date: {
      type: Date,
      required: true,
      default: () => new Date(),
    },

    return_date: {
      type: Date,
      required: true,
    },
  },
);

const reservationModel = model<reservationType>(
  "Reservation",
  ReservationSchema
);

export {reservationType, reservationModel}
