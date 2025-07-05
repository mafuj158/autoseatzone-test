import { useRef } from "react";

const ReviewsSection = ({ comments = [] }) => {
  const customizeRef = useRef(null);

  return (
    <>
      {/* Reviews Section */}
      <div
        ref={customizeRef}
        id="customize-look"
        className="mt-6 md:mt-10 p-4 md:p-6 bg-white rounded-lg shadow-sm"
      >
        <h3 className="text-lg md:text-xl font-semibold mb-4">Reviews</h3>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments available yet.</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="py-7 review-container flex items-start space-x-3 md:space-x-4 pb-4 border-b last:border-b-0"
            >
              {/* Avatar */}
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                {comment.user?.name?.charAt(0)?.toUpperCase() || "A"}
              </div>

              {/* Comment Body */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-1 gap-1">
                  <h4 className="text-sm text-textBlack font-semibold leading-5">
                    {comment.user?.name || "Anonymous"}
                  </h4>
                  <span className="text-[#CE0000] text-xs underline leading-5 whitespace-nowrap">
                    {comment.created_at || "Just now"}
                  </span>
                </div>
                <p className="text-gray-800 text-sm leading-6">
                  {comment.comment}
                </p>
                <span className="text-blue-500 cursor-pointer hover:underline text-sm mt-2 inline-block">
                  Reply
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ReviewsSection;
