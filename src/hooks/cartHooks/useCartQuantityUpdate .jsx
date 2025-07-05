import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";
import toast from "react-hot-toast";

const useCartQuantityUpdate = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const increment = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/increment-cart-item/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cartItems"]);
      toast.success(data?.message || "Item quantity increased");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to increase quantity");
    },
  });

  const decrement = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.post(`/decrement-cart-item/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["cartItems"]);
      toast.success(data?.message || "Item quantity decreased");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to decrease quantity");
    },
  });

  return {
    incrementItem: increment.mutateAsync,
    decrementItem: decrement.mutateAsync,
    incrementingId: increment.variables,
    decrementingId: decrement.variables,
    isIncrementing: increment.isPending,
    isDecrementing: decrement.isPending,
  };
};

export default useCartQuantityUpdate;
