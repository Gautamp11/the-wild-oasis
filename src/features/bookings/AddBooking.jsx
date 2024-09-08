import { useState } from "react";
import Button from "../../ui/Button";
import BookingForm from "./BookingForm";

function AddBooking() {
  const [isOpenForm, setIsOpenForm] = useState(true);

  return (
    <div>
      <Button onClick={() => setIsOpenForm((show) => !show)}>
        Add Booking
      </Button>
      {isOpenForm && <BookingForm />}
    </div>
  );
}

export default AddBooking;
