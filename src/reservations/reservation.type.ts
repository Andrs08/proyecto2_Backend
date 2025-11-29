type CreateReservationDto = {
  userId: string;
  bookId: string;
  return_date: Date;
};

type ReturnReservationDto = {
    id: string;
    userId: string;
    bookId: string;
    reserve_date: Date
    return_date: Date;
}

type ReturnReservationHistoryBookDto = {
    id: string;
    userName: string;
    userEmail: string;
    reserve_date: Date;
    return_date: Date;
};

type ReturnReservationHistoryUserDto = {
    id: string;
    bookName: string;
    bookAuthor: string;
    reserve_date: Date;
    return_date: Date;
};


export {CreateReservationDto, ReturnReservationDto, ReturnReservationHistoryBookDto, ReturnReservationHistoryUserDto};