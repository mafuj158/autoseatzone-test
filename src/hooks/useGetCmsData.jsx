import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useGetCmsData = (url) => {
    const axiosPublic = useAxiosPublic();

    const { data, isLoading, refetch } = useQuery({
        queryKey: ['cmsData', url],
        queryFn: async () => {
            const response = await axiosPublic.get(url);
            return response.data;
        },
        enabled: !!url,
    });

    return { data, isLoading, refetch };
};

export default useGetCmsData;
