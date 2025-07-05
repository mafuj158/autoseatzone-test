import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const useGetBlogs = (page = 1) => {
  const axiosPublic = useAxiosPublic();

  const fetchBlogs = async () => {
    const response = await axiosPublic.get(`/blogs?page=${page}`);
    return response.data;
  };

  return useQuery({
    queryKey: ["blogs", page],
    queryFn: fetchBlogs,
  });
};

export default useGetBlogs;
