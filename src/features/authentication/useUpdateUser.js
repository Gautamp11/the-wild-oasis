import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isLoading, mutate: updateUser } = useMutation({
    mutationFn: (userData) => updateCurrentUser(userData),

    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      //   reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, updateUser };
}
