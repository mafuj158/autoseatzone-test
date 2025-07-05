import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { Spin } from "antd";

const ShippingPolicy = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, error } = useQuery({
    queryKey: ["shipping-policy"],
    queryFn: async () => {
      const res = await axiosPublic.get("/shipping-policy");
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg">
        Failed to load Shipping Policy.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md p-6 sm:p-10">
          {/* Title */}
          <h1 className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-8">
            {data?.shipping_title}
          </h1>

          {/* Styled HTML Content */}
          <div
            className="space-y-6 text-gray-700"
            dangerouslySetInnerHTML={{
              __html: data?.shipping_description
                ?.replace(
                  /<h3>/g,
                  '<h3 class="text-lg font-semibold text-red-600 mt-6">'
                )
                .replace(
                  /<p>/g,
                  '<p class="text-base leading-relaxed text-gray-700">'
                )
                .replace(
                  /<ul>/g,
                  '<ul class="list-disc list-inside space-y-2">'
                )
                .replace(/<li>/g, '<li class="pl-2">'),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
