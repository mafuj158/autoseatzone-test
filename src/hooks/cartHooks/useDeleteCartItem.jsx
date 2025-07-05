import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useDltCartItem = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { mutate: removeItem, isPending: isDeleting } = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.post(`/remove-from-cart/${id}`);
    },
    onSuccess: (_data, id) => {
      // Update cached cartItems by removing the deleted item immediately
      queryClient.setQueryData(["cartItems"], (old) => {
        if (!old) return [];
        return old.filter((item) => item.id !== id);
      });
    },
    onError: (error) => {
      console.error("Failed to remove item from cart", error);
    },
  });

  return { removeItem, isDeleting };
};

export default useDltCartItem;
