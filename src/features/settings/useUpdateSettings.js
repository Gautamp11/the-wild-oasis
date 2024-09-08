import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabin, updateCabin } from "../../services/apiCabins";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: updateSetting,

    onSuccess: (data) => {
      toast.success("Setting Updated");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutate };
}
