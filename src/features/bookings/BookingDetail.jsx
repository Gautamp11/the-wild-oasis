import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";

import Spinner from "../../ui/Spinner";
import { useBooking } from "./useBooking";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "./useDeleteBooking";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  // const booking = {};
  const { booking, isLoading } = useBooking();

  const { status, id: bookingId, guestName } = booking || {};
  const { checkout, isLoading: isCheckingOut } = useCheckout();

  const { mutate: deleteBookingItem, isDeleting } = useDeleteBooking(() =>
    setShowDelete(false)
  );
  const [showDelete, setShowDelete] = useState(false);

  // const status = "checked-in";

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  function handleCheckin() {
    navigate(`/checkin/${bookingId}`);
  }
  function handleCheckout() {
    checkout(bookingId);
  }
  function handleDelete() {
    setShowDelete(true);
  }
  if (isLoading) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      <ButtonGroup>
        <Button color="secondary" onClick={moveBack}>
          Back
        </Button>{" "}
        {status === "unconfirmed" && (
          <Button color="primary" onClick={handleCheckin}>
            Check In
          </Button>
        )}{" "}
        {status === "checked-in" && (
          <Button color="primary" onClick={handleCheckout}>
            Check Out
          </Button>
        )}
        <Button color="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
      </ButtonGroup>

      {showDelete && (
        <Modal onCloseModal={() => setShowDelete(false)}>
          <ConfirmDelete
            resourceName={"booking"}
            onConfirm={() => deleteBookingItem(bookingId)}
            onCloseModal={() => setShowDelete(false)}
            disabled={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}

export default BookingDetail;
