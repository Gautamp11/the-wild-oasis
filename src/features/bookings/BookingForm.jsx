import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";

import Checkbox from "../../ui/Checkbox";
import styled from "styled-components";
import { useCreateBooking } from "./useCreateBooking";

const fakeData = {
  startDate: "2024-09-11T00:00:00",
  endDate: "2024-09-19T00:00:00",
  numNights: 8,
  numGuests: 5,
  cabinPrice: 2000,
  extrasPrice: 130,
  totalPrice: 2130,
  status: "unconfirmed",
  hasBreakfast: true,
  isPaid: false,
  observations: "Test",
  cabinId: 8,
  guestId: 12,
};

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid;
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function BookingForm() {
  // const [cabinPrice]
  const { mutate, isLoading } = useCreateBooking();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: fakeData });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      {/* Booking ID */}
      {/* <FormRow label="Booking ID" error={errors?.id?.message}>
        <Input
          type="text"
          id="id"
          {...register("id", {
            required: "This field is required",
          })}
        />
      </FormRow> */}

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
          {...register("guestId", {
            required: "Guest ID is required",
          })}
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
      {/* Cabin ID */}
      <FormRow label="Cabin ID" error={errors?.cabinId?.message}>
        <Input
          type="text"
          id="cabinId"
          {...register("cabinId", {
            required: "Cabin ID is required",
          })}
        />
      </FormRow>

      {/* Cabin Price */}
      <FormRow label="Cabin Price" error={errors?.cabinPrice?.message}>
        <Input
          type="number"
          id="cabinPrice"
          step="0.01"
          {...register("cabinPrice", {
            required: "Cabin price is required",
          })}
        />
      </FormRow>

      {/* Extras Price */}
      <FormRow label="Extras Price" error={errors?.extrasPrice?.message}>
        <Input
          type="number"
          id="extrasPrice"
          step="0.01"
          {...register("extrasPrice", {
            required: "Extras price is required",
          })}
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

      {/* Observations */}
      <FormRow label="Observations" error={errors?.observations?.message}>
        <Textarea type="text" id="observations" {...register("observations")} />
      </FormRow>

      <Button>Create Booking</Button>
    </Form>
  );
}

export default BookingForm;
