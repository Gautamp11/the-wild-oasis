import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newBooking) => createBooking(newBooking),
    onSuccess: (data) => {
      console.log(data);
      toast.success("New booking created");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading };
}
