import { useForm } from "react-hook-form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import { useCreateGuest } from "./useCreateGuest";
import { useState } from "react";
import BookingForm from "./BookingForm";
import { useCabins } from "../cabins/useCabins";
import { useSettings } from "../settings/useSettings";

function AddGuestForm() {
  //   const fakeGuest = {
  //     fullName: "Gautam",
  //     email: "gautam1564p1@gmail.com",
  //     nationality: "Indian",
  //     nationalID: "539252525",
  //     countryFlag: "",
  //   };
  const { mutate, isLoading } = useCreateGuest();
  const [openBookingForm, setOpenBookingForm] = useState(false);
  const [guestDetails, setGuestDetails] = useState({});
  const { cabins } = useCabins();
  const { settings } = useSettings();
  const breakfastPrice = settings?.breakfastPrice;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = (data) => {
    // Trigger the mutation with the form data
    mutate(data, {
      onSuccess: (createdGuest) => {
        setGuestDetails(createdGuest[0]);
        setOpenBookingForm(true);
      },
    });
  };
  const guestId = guestDetails?.id || "";

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name Field */}
        <FormRow label="Full Name" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "Full name is required",
            })}
            disabled={isLoading}
          />
        </FormRow>

        {/* Email Field */}
        <FormRow label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            })}
            disabled={isLoading}
          />
        </FormRow>

        {/* Nationality Field */}
        <FormRow label="Nationality" error={errors?.nationality?.message}>
          <Input
            type="text"
            id="nationality"
            {...register("nationality", {
              required: "Nationality is required",
            })}
            disabled={isLoading}
          />
        </FormRow>

        {/* National ID Field */}
        <FormRow label="National ID" error={errors?.nationalID?.message}>
          <Input
            type="text"
            id="nationalID"
            {...register("nationalID", {
              required: "National ID is required",
            })}
            disabled={isLoading}
          />
        </FormRow>

        {/* Country Flag Field */}
        <FormRow label="Country Flag URL" error={errors?.countryFlag?.message}>
          <Input
            type="url"
            id="countryFlag"
            {...register("countryFlag", {
              // required: "Country flag URL is required",
              // pattern: {
              //   value: /^(http|https):\/\/[^ "]+$/,
              //   message: "Enter a valid URL",
              // },
            })}
            disabled={isLoading}
          />
        </FormRow>

        {/* Guest id */}
        <FormRow label="Guest ID">
          <Input type="text" id="guestId" disabled value={guestId} />
        </FormRow>

        {/* Submit Button */}
        <Button type="submit" disabled={isLoading}>
          Add Guest
        </Button>
      </Form>

      {openBookingForm && (
        <BookingForm
          guestDetails={guestDetails}
          cabins={cabins}
          breakfastPrice={breakfastPrice}
        />
      )}
    </>
  );
}

export default AddGuestForm;
