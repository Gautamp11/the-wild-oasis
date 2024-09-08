import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createGuest } from "../../services/apiGuests";

export function useCreateGuest() {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: (newGuest) => createGuest(newGuest),
    onSuccess: (data) => {
      toast.success("New Guest created");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutate, isLoading };
}
