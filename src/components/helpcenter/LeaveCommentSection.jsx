import React, { useState, useEffect } from 'react';
import CommonBtn from '../common/CommonBtn';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useAuth } from '@/providers/AuthProvider';

const LeaveCommentSection = ({ solutionId }) => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    // Get user details
    const fullName = `${user?.data?.first_name || ''} ${user?.data?.last_name || ''}`.trim();
    const userEmail = user?.data?.email;

    // Form state
    const [formData, setFormData] = useState({
        name: fullName,
        email: userEmail,
        comment: '',
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const response = await axiosSecure.post(
                `/comment-against-solution/${solutionId}`,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success('Comment posted successfully!');
            setFormData(prev => ({ ...prev, comment: '' }));
        },
        onError: () => {
            toast.error('Failed to post comment');
        }
    });


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!solutionId) {
            toast.error("Invalid solution ID.");
            return;
        }

        if (!formData.comment.trim()) {
            toast.error("Comment cannot be empty");
            return;
        }

        mutate(formData); // ✅
    };


    return (
        <div className="mt-6 md:mt-10 p-4 md:p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg md:text-xl font-semibold mb-4">Leave a Comment</h3>

            <form className="space-y-3 md:space-y-4" onSubmit={handleSubmit}>
                {/* Comment Field */}
                <div>
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                        Comment *
                    </label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        required
                        value={formData.comment}
                        onChange={handleChange}
                        className="w-full h-[150px] md:h-[210px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                        placeholder="Write your comment here..."
                    />
                </div>

                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

                {/* Email Field (read-only) */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        readOnly
                        value={formData.email}
                        className="w-full bg-gray-200 px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    />
                </div>

                {/* Save Info Checkbox */}
                <div className="flex gap-2 items-start">
                    <input
                        type="checkbox"
                        id="saveInfo"
                        className="w-[13px] h-[13px] mt-1 flex-shrink-0"
                    />
                    <label htmlFor="saveInfo" className="text-[#757575] text-sm cursor-pointer">
                        Save my name, email in this browser for the next time I comment.
                    </label>
                </div>

                {/* Submit Button */}
                <CommonBtn
                    type="submit"
                    text={isPending ? "Posting..." : "Post Comment"}
                    className="w-full sm:w-auto"
                    disabled={isPending}
                />
            </form>
        </div>
    );
};

export default LeaveCommentSection;