import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const useHelpTypeApi = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["help-types"],
    queryFn: async () => {
      const res = await axiosPublic.get("/help-type");
      return res.data.data;
    },
  });
  // If `data` is undefined or not an array, fallback to empty array
  const helpTypes = Array.isArray(data) ? data : [];

  return { helpTypes, isLoading, isError, error, refetch };
};

export default useHelpTypeApi;
