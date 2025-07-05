import { useState } from 'react';
import { motion } from 'framer-motion';

import CommonSectionTitle from '../common/CommonSectionTitle';
import useGetCmsData from '@/hooks/useGetCmsData';

const StarRating = ({ rating = 4, total = 5 }) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = total - filledStars - (hasHalfStar ? 1 : 0);

    const Star = ({ filled, halfFilled = false }) => (
        <div className="w-4 h-4" aria-hidden="true">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={filled ? "#FFC700" : halfFilled ? "url(#half-star)" : "#E0E0E0"}
                className="w-full h-full"
            >
                {halfFilled && (
                    <defs>
                        <linearGradient id="half-star" x1="0" x2="100%" y1="0" y2="0">
                            <stop offset="50%" stopColor="#FF8E00" />
                            <stop offset="50%" stopColor="#E0E0E0" />
                        </linearGradient>
                    </defs>
                )}
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
        </div>
    );

    return (
        <div className="flex gap-1" aria-label={`Rating: ${rating} out of ${total} stars`}>
            {[...Array(filledStars)].map((_, i) => (
                <Star key={`filled-${i}`} filled />
            ))}
            {hasHalfStar && <Star key="half-star" halfFilled />}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} filled={false} />
            ))}
        </div>
    );
};

const TestimonialCard = ({ images, content, author, date, rating = 4 }) => {
    const remainingImages = images.length - 3;
    const hasExtraImages = remainingImages > 0;

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((word) => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <article className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
            <div className="flex flex-row gap-2">
                {images[0] && (
                    <div className="w-full lg:w-[180px] h-[308px] overflow-hidden">
                        <img
                            src={images[0]}
                            alt="Main testimonial"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    </div>
                )}

                {images.length > 1 && (
                    <div className="grid grid-cols-1 gap-2">
                        {images[1] && (
                            <div className="lg:w-[172px] h-[150px] overflow-hidden">
                                <img
                                    src={images[1]}
                                    alt="Secondary testimonial 1"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        )}
                        {images[2] && (
                            <div className="lg:w-[172px] h-[150px] overflow-hidden relative">
                                <img
                                    src={images[2]}
                                    alt="Secondary testimonial 2"
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                {hasExtraImages && (
                                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white font-semibold text-lg">
                                        +{remainingImages}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col">
                <div className="mb-3 mt-1 flex justify-center">
                    <StarRating rating={rating} />
                </div>

                <div className="flex flex-col items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-700 mb-2">
                        {getInitials(author)}
                    </div>
                    <p className="text-textBlack font-medium">{author}</p>
                </div>

                <div className="flex justify-center items-center gap-1">
                    <p className="text-[13px] text-textBlack">{date}</p>
                </div>

                <h3 className="mb-4 text-textBlack leading-[27px] text-lg p-4">
                    <p className="line-clamp-4">{content}</p>
                </h3>
            </div>
        </article>
    );
};

const TestimonialSection = () => {
    const { data } = useGetCmsData('/get-reviews');
    const reviews = data?.data || [];

    const [visibleCount, setVisibleCount] = useState(4);
    const canLoadMore = visibleCount < reviews.length;

    const handleLoadMore = () => {
        setVisibleCount((prev) => Math.min(prev + 4, reviews.length));
    };

    return (
        <section className="py-16 lg:py-24 bg-gray-50">
            <div className="max-w-[1520px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <CommonSectionTitle
                        className="text-center mb-12"
                        text="Customer Testimonials"
                        subtitle="Hear what our satisfied customers have to say about our products"
                    />
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {reviews.slice(0, visibleCount).map((review, index) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <TestimonialCard
                                images={review.images}
                                content={review.comment}
                                author={review.user_name}
                                date={review.created_at}
                                rating={review.rating}
                            />
                        </motion.div>
                    ))}
                </div>

                {canLoadMore && (
                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <button
                            onClick={handleLoadMore}
                            className="bg-primary cursor-pointer hover:bg-primary-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            aria-label="Load more testimonials"
                        >
                            Load More
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default TestimonialSection;
