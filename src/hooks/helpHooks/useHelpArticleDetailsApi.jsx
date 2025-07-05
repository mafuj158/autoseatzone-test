import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../useAxiosPublic";

const useHelpArticleDetailsApi = (title_id, problem_solution_id) => {
    const axiosPublic = useAxiosPublic();

    const {
        data,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["help-article-details", title_id, problem_solution_id],
        queryFn: async () => {
            const res = await axiosPublic.get("/help-details", {
                params: { title_id, problem_solution_id }
            });
            return res.data?.data;
        },
        enabled: !!title_id && !!problem_solution_id, // fetch only when both are available
    });

    return { data, isLoading, isError, error, refetch };
};

export default useHelpArticleDetailsApi;
