import React from "react";
import { useParams } from "react-router-dom";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const BlogDetails = () => {
  const { slug } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: blog,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["blog-details", slug],
    queryFn: async () => {
      const res = await axiosPublic.get(`/blog-details/${slug}`);
      return res.data.project;
    },
    enabled: !!slug,
  });

  if (isLoading) return <LoadingComponent />;
  if (isError || !blog)
    return (
      <div className="text-center text-red-500">
        Failed to load blog details.
      </div>
    );

  return (
    <div className="container px-4 md:px-10 lg:px-20 xl:px-36 py-10">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full rounded-lg object-cover max-h-[450px] mb-6"
      />

      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center gap-3 mb-6">
        {blog.admin_avatar ? (
          <img
            src={blog.admin_avatar}
            alt={blog.admin_name}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-white">
            {blog.admin_name?.[0]}
          </div>
        )}
        <div className="text-sm text-gray-500">
          By <span className="font-medium">{blog.admin_name}</span> •{" "}
          {blog.readable_time}
        </div>
      </div>

      <p className="text-lg leading-8 text-gray-700 whitespace-pre-line">
        {blog.description}
      </p>
    </div>
  );
};

export default BlogDetails;
