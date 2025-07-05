import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../useAxiosSecure";

const useExclusiveSeatCover = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["exclusiveSeatCover"],
    queryFn: async () => {
      const res = await axiosSecure.get("/exclusive-seat-cover");
      return res?.data?.data;
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default useExclusiveSeatCover;
