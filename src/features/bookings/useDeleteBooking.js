import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings";

export function useDeleteBooking(onSuccessCallback) {
  // getting query client here as we need to reset the query so that we can refecth data after mutation
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking deleted");
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, mutate };
}
