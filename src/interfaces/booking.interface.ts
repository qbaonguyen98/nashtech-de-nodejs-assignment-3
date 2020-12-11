interface Booking {
  userId: string;
  bookingDetailId: string;
  reservationDate: number;
  totalPrice: number;
  createdBy: string;
  createdDate: number;
  isDeleted: boolean;
}

export default Booking;
