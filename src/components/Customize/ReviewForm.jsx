import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Rate, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CommonBtn from "../common/CommonBtn";
import CommonSectionTitle from "../common/CommonSectionTitle";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [rating, setRating] = useState(0);
  const [fileList, setFileList] = useState([]);
  const { user } = useAuth();
  console.log("user", user);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { mutate: submitReview, isLoading } = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.post("/review", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully!");
      reset();
      setRating(0);
      setFileList([]);
    },
    onError: () => {
      toast.error("Failed to submit review.");
    },
  });

  const onSubmit = (data) => {
    if (!user) {
      toast.error("You must be logged in to submit a review.");
      navigate("/login");
      return;
    }

    if (rating < 1) {
      toast.error("Please select at least 1 star rating.");
      return;
    }
    if (fileList.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("comment", data.review);
    formData.append("rating", rating);

    fileList.forEach((file) => {
      formData.append("image[]", file.originFileObj);
    });

    submitReview(formData);
  };

  const onRateChange = (value) => {
    setRating(value);
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  return (
    <div className="py-[100px] container mx-auto rounded-lg">
      <CommonSectionTitle
        className="text-center mb-8"
        text="What our customers are saying"
      />

      <div className=" w-full  flex flex-col lg:flex-row justify-center items-center lg:items-start space-x-8 ">
        {/* Left side form */}
        <form
          className=" relative w-full mx-auto lg:w-1/2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <textarea
            {...register("review", { required: "Review is required" })}
            className="border-[#00000040] w-full p-5 placeholder:text-[#0F1B3780] border rounded mb-2 focus:outline-none"
            rows={6}
            placeholder="Comment here"
          />
          {errors.review && (
            <p className="text-red-600 mb-2">{errors.review.message}</p>
          )}
          <div className="w-full flex justify-center items-center">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={onUploadChange}
              beforeUpload={() => false}
              multiple={true}
              className=""
            >
              {fileList.length < 4 && (
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
             </Upload>
          </div>
          {/* Right side rating */}
          <div className="py-10 mx-auto text-center  w-full  flex flex-col items-center">
            <Rate className=" " onChange={onRateChange} value={rating} />
            <p className="mt-2 text-gray-600">
              {rating} star{rating !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="flex justify-center   ">
            <CommonBtn
              text={isLoading ? "Submitting..." : "Write Review"}
              type="submit"
              className="mt-4 flex text-white px-6 py-2 rounded"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
