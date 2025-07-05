import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useCartItems = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["cartItems"],
    queryFn: async () => {
      const res = await axiosSecure.get("/show-cart-items");
      return res.data.data;
    },
  });
};

export default useCartItems;
