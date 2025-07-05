// hooks/useExclusiveSeatCover.js
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useExclusiveSeatCoverId = () => {
  const axiosSecure = useAxiosSecure();
  return useQuery({
    queryKey: ["exclusive-seat-cover"],
    queryFn: async () => {
      const res = await axiosSecure.get("/show-exclusive-seat-cover");
      const result = res.data?.data || [];

      // Extract only exclusive_seat_id values into an array
      const exclusiveSeatIds = result.map(item => item.exclusive_seat_id);

      return exclusiveSeatIds;
    },
  });
};

export default useExclusiveSeatCoverId;
