import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import { TableRow } from "../../ui/Table";
import Menus from "../../ui/Menus";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import { useDeleteBooking } from "../bookings/useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteBooking } from "../../services/apiBookings";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  columns,
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  const navigate = useNavigate();
  const { checkout, isLoading: isCheckingOut } = useCheckout();
  const { mutate: deleteBookingItem, isDeleting } = useDeleteBooking(() =>
    setShowDelete(false)
  );
  const [showDelete, setShowDelete] = useState(false);

  const [openMenuId, setOpenMenuId] = useState(null);
  function handleToggleMenu() {
    setOpenMenuId(openMenuId === bookingId ? null : bookingId);
  }
  function handleCloseMenu() {
    setOpenMenuId(null);
  }
  function handleViewDetails() {
    navigate(`/bookings/${bookingId}`);
  }
  function handleCheckin() {
    navigate(`/checkin/${bookingId}`);
  }
  function handleCheckout() {
    // navigate(`/checkin/${bookingId}`);
    checkout(bookingId);
  }
  function handleDelete() {
    setShowDelete(true);
  }

  const menuOptions = [
    { label: "View Details", onClick: handleViewDetails },
    ...(status === "checked-in"
      ? [{ label: "Check Out", onClick: handleCheckout }]
      : []),
    ...(status === "unconfirmed"
      ? [{ label: "Check In", onClick: handleCheckin }]
      : []),
    { label: "Delete", onClick: handleDelete },
  ];

  return (
    <TableRow columns={columns}>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Menus
        isOpen={openMenuId === bookingId}
        onToggle={handleToggleMenu}
        onClose={handleCloseMenu}
        options={menuOptions}
      />

      {showDelete && (
        <Modal onCloseModal={() => setShowDelete(false)}>
          <ConfirmDelete
            resourceName={`${guestName} booking`}
            onConfirm={() => deleteBookingItem(bookingId)}
            onCloseModal={() => setShowDelete(false)}
            disabled={isDeleting}
          />
        </Modal>
      )}
    </TableRow>
  );
}

export default BookingRow;
