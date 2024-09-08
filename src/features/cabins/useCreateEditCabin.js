import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, updateCabin } from "../../services/apiCabins";

export function useCreateEditCabin(isEditSession) {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (cabinData) =>
      isEditSession ? updateCabin(cabinData) : createCabin(cabinData),

    onSuccess: (data) => {
      toast.success(isEditSession ? "Cabin updated" : "New cabin created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutate };
}
