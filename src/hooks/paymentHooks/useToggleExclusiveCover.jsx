// hooks/useToggleExclusiveCover.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
 // your secured axios
import toast from "react-hot-toast";
import useAxiosSecure from "../useAxiosSecure";

const useToggleExclusiveCover = () => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure()

  const mutation = useMutation({
    mutationFn: async ({ id, enabled }) => {
      const endpoint = enabled
        ? `/add-exclusive-seat-cover/${id}`
        : `/remove-exclusive-seat-cover/${id}`;
      const { data } = await axiosSecure.post(endpoint);
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success(
        variables.enabled
          ? "Exclusive cover added!"
          : "Exclusive cover removed!"
      );
      queryClient.invalidateQueries(["exclusive-seat-cover"]);
    },
    onError: (error) => {
  console.error("Toggle error:", error?.response || error?.message || error);
  toast.error("Something went wrong!");
}

  });

  return mutation;
};

export default useToggleExclusiveCover;
