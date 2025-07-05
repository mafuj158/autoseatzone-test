import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import CommonBanner from "@/components/common/CommonBanner";
import CommonBlogCard from "@/components/common/CommonBlogCard";
import SingleBlogSection from "@/components/blog/SingleBlogSection";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import useGetCmsData from "@/hooks/useGetCmsData";
import useGetBlogs from "@/hooks/bloogsHook/useGetBlogs";

const Blog = () => {
  const [page, setPage] = useState(1);
   const blogSectionRef = useRef(null); // 👈 create ref

  // Scroll to blog section on page change
  useEffect(() => {
    blogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [page]);

  const { data: cmsData, isLoading: cmsLoading } =
    useGetCmsData("/blog-banner");
  const blogBanner = cmsData?.banner;

  const { data: blogsData, isLoading: blogsLoading } = useGetBlogs(page);
  const blogs = blogsData?.projects || [];
  const pagination = blogsData?.pagination;

  if (cmsLoading || blogsLoading) {
    return <LoadingComponent />;
  }

  const totalPages = pagination?.last_page || 1;

  return (
    <div>
      {/* Common Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <CommonBanner
          backgroundImage={blogBanner?.image}
          title={blogBanner?.title}
          description={blogBanner?.description}
        />
      </motion.div>

      {/* Single Blog Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <SingleBlogSection />
      </motion.div>

      {/* Blog Cards */}
      <motion.div
  ref={blogSectionRef}
  className="container xl:px-5 2xl:px-0 grid md:grid-cols-2 lg:grid-cols-3 gap-5 xl:mt-[60px]"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
        {blogs.map((blog) => (
          <motion.div
            className="mt-12 xl:mt-0"
            key={blog.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CommonBlogCard
              key={blog.id}
              img={blog.image}
              title={blog.title}
              desc={blog.description}
              authorImg={blog.admin_avatar || "/default-avatar.png"}
              authorName={blog.admin_name}
              date={blog.readable_time}
              id={blog.id}
              slug={blog.slug}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 mb-20 gap-4 font-medium text-lg">
          {/* Previous */}
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className={`transition-all duration-200 ${
              page === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-400 hover:text-red-500"
            }`}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            const formatted = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                className={`transition-all duration-200 ${
                  page === pageNum
                    ? "text-red-600 font-semibold"
                    : "text-gray-800 hover:text-red-400"
                }`}
              >
                {formatted}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className={`transition-all duration-200 ${
              page === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-red-600 hover:text-red-700"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
