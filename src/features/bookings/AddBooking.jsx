import { useState } from "react";
import Button from "../../ui/Button";
import BookingForm from "./BookingForm";
import AddGuest from "./AddGuest";

function AddBooking() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenForm((show) => !show)}>
        Add Booking
      </Button>
      <AddGuest />
      {isOpenForm && <BookingForm />}
    </div>
  );
}

export default AddBooking;
