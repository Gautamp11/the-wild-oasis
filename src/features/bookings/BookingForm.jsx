import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import Checkbox from "../../ui/Checkbox";
import styled from "styled-components";
import { useCreateBooking } from "./useCreateBooking";
import { useNavigate } from "react-router-dom";

// const fakeData = {
//   startDate: "2024-09-11T00:00:00",
//   endDate: "2024-09-19T00:00:00",
//   numNights: 8,
//   numGuests: 5,
//   status: "unconfirmed",
//   hasBreakfast: false,
//   isPaid: false,
//   observations: "Test",
// };

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function BookingForm({ guestDetails, cabins, breakfastPrice }) {
  let guestId = guestDetails?.id;
  const navigate = useNavigate();

  const { mutate } = useCreateBooking();
  const [selectedCabinId, setSelectedCabinId] = useState("");
  const [cabinPrice, setCabinPrice] = useState(0);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
    reset,
  } = useForm({});

  const hasBreakfast = watch("hasBreakfast");
  const numGuests = watch("numGuests");
  const isPaid = watch("isPaid");

  useEffect(() => {
    let newExtrasPrice = 0;

    if (hasBreakfast) {
      newExtrasPrice = breakfastPrice * (numGuests || 1); // Calculate extras price based on breakfast price and number of guests
    }

    setValue("extrasPrice", newExtrasPrice); // Update the form value
    setValue("totalPrice", newExtrasPrice + cabinPrice); // Update the form value
    setValue("guestId", guestId);
  }, [
    isPaid,
    hasBreakfast,
    numGuests,
    breakfastPrice,
    setValue,
    cabinPrice,
    guestId,
  ]);

  function onSubmit(data) {
    mutate(data, { onSuccess: reset });

    navigate("/");
  }

  function handleCabinSelection(id) {
    setSelectedCabinId(id);

    // Find the selected cabin's price
    const selectedCabin = cabins.find((cabin) => cabin.id === id);

    if (selectedCabin) {
      setCabinPrice(selectedCabin.regularPrice); // Assuming price is a property of cabin
      setValue("cabinId", id);
      setValue("cabinPrice", selectedCabin.regularPrice);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Start Date */}
      <FormRow label="Start Date" error={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "Start date is required",
          })}
        />
      </FormRow>
      {/* End Date */}

      <FormRow label="End Date" error={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "End date is required",
          })}
        />
      </FormRow>
      {/* Guest ID */}
      <FormRow label="Guest ID" error={errors?.guestId?.message}>
        <Input
          type="text"
          id="guestId"
          value={guestId}
          disabled
          {...register("guestId")}
        />
      </FormRow>
      {/* Number of Nights */}
      <FormRow label="Number of Nights" error={errors?.numNights?.message}>
        <Input
          type="number"
          id="numNights"
          min="1"
          {...register("numNights", {
            required: "Number of nights is required",
            min: { value: 1, message: "Must be at least 1 night" },
          })}
        />
      </FormRow>

      {/* Number of Guests */}
      <FormRow label="Number of Guests" error={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          min="1"
          {...register("numGuests", {
            required: "Number of guests is required",
            min: { value: 1, message: "Must be at least 1 guest" },
          })}
        />
      </FormRow>
      {/* Cabin Selection */}
      <FormRow label="Select Cabin">
        <div style={{ display: "flex", gap: "1rem" }}>
          {cabins.map((cabin) => (
            <span key={cabin.id} onClick={() => handleCabinSelection(cabin.id)}>
              <img src={cabin.image} alt={cabin.id} />
              <p>{cabin.id}</p>
            </span>
          ))}
        </div>
      </FormRow>
      {/* Cabin ID */}
      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          type="text"
          id="cabinId"
          disabled
          value={selectedCabinId}
          {...register("cabinId")}
        />
      </FormRow>
      {/* Cabin Price */}
      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          step="0.01"
          value={cabinPrice}
          disabled
          {...register("cabinPrice")}
        />
      </FormRow>
      {/* Has Breakfast */}
      <FormRow label="Has Breakfast" error={errors?.hasBreakfast?.message}>
        <Checkbox
          type="checkbox"
          id="hasBreakfast"
          {...register("hasBreakfast")}
        />
      </FormRow>
      {/* Is Paid */}
      <FormRow label="Is Paid" error={errors?.isPaid?.message}>
        <Checkbox type="checkbox" id="isPaid" {...register("isPaid")} />
      </FormRow>
      {/* Extras Price */}
      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          step="0.01"
          {...register("extrasPrice")}
          readOnly
        />
      </FormRow>
      {/* Total Price */}
      <FormRow label="Total Price" error={errors?.totalPrice?.message}>
        <Input
          type="number"
          id="totalPrice"
          step="0.01"
          {...register("totalPrice", {
            required: "Total price is required",
          })}
        />
      </FormRow>
      {/* Status */}
      <FormRow label="Status" error={errors?.status?.message}>
        <StyledSelect
          id="status"
          {...register("status", {
            required: "Status is required",
          })}
        >
          <option value="unconfirmed">Unconfirmed</option>
          <option value="checked-in">Checked In</option>
        </StyledSelect>
      </FormRow>
      {/* Observations */}
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea type="text" id="observations" {...register("observations")} />
      </FormRow>
      <Button>Create Booking</Button>
    </Form>
  );
}

export default BookingForm;
