import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useApplyCoupon = () => {
  const axiosSecure = useAxiosSecure();

  return useMutation({
    mutationFn: async (coupon) => {
      const res = await axiosSecure.post(`/total-amount?code=${coupon}`);
      return res.data;
    },
  });
};

export default useApplyCoupon;
