import { useState } from "react";
import Button from "../../ui/Button";
import AddGuest from "./AddGuest";

function AddBooking() {
  const [isOpenForm, setIsOpenForm] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpenForm((show) => !show)}>
        Add Booking
      </Button>
      {isOpenForm && <AddGuest />}
    </div>
  );
}

export default AddBooking;
