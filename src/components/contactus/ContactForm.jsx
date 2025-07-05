import CommonBtn from "../common/CommonBtn";
import { useForm } from "react-hook-form";
import { motion } from 'framer-motion';
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";

const ContactForm = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const axiosPublic = useAxiosPublic();

    const contactMutation = useMutation({
        mutationKey: ['contact-form'],
        mutationFn: async (formData) => {
            const res = await axiosPublic.post('/contact-us', formData);
            return res.data;
        }
    });

    const onSubmit = (data) => {
        contactMutation.mutate(data, {
            onSuccess: () => {
                toast.success("Message sent!");
                reset();
            },
            onError: (error) => {
                toast.error("Failed to send: " + error.message);
            }
        });
    };

    return (
        <div className="lg:max-w-4xl mx-auto pt-12 xl:pt-[150px]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-5 lg:mx-0 border border-[#a6acbb] rounded-lg"
            >
                <div className="px-5 xl:px-12 py-6 xl:pt-[24px] pb-[60px]">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 xl:mt-[60px] flex flex-col items-center"
                    >
                        <h3 className="text-2xl xl:text-[40px] font-semibold font-pridi">Get In Touch</h3>
                        <p className="xl:max-w-[727px] text-center text-sm xl:text-xl xl:leading-[30px]">
                            Got questions? Fill the form below and we will get back to you.
                        </p>
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col space-y-4 xl:space-y-10 mt-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >

                        {/* Name */}
                        <div className="flex flex-col gap-2">
                            <label className="capitalize lg:text-xl text-textBlack font-medium">Name</label>
                            <input
                                type="text"
                                {...register("name", { required: "Name is required" })}
                                className="w-full text-lg placeholder:text-base font-medium placeholder:font-normal lg:px-4 py-2 lg:py-4 rounded-[8px] border border-[#C2DBEA] bg-[#06163a0d] outline-none text-textBlack shadow-input"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col gap-2">
                            <label className="capitalize lg:text-xl text-textBlack font-medium">Email Address</label>
                            <input
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format"
                                    }
                                })}
                                className="w-full text-lg placeholder:text-base font-medium placeholder:font-normal lg:px-4 py-2 lg:py-4 rounded-[8px] border border-[#C2DBEA] bg-[#06163a0d] outline-none text-textBlack shadow-input"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Subject */}
                        <div className="flex flex-col gap-2">
                            <label className="capitalize lg:text-xl text-textBlack font-medium">Subject</label>
                            <input
                                type="text"
                                {...register("subject", { required: "Subject is required" })}
                                className="w-full text-lg placeholder:text-base font-medium placeholder:font-normal lg:px-4 py-2 lg:py-4 rounded-[8px] border border-[#C2DBEA] bg-[#06163a0d] outline-none text-textBlack shadow-input"
                            />
                            {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
                        </div>

                        {/* Message */}
                        <div className="flex flex-col gap-2">
                            <label className="capitalize lg:text-xl text-textBlack font-medium">Message</label>
                            <textarea
                                {...register("message", { required: "Message is required" })}
                                className="w-full lg:h-[160px] text-lg placeholder:text-base font-medium placeholder:font-normal px-4 py-4 rounded-[8px] border border-[#C2DBEA] bg-[#06163a0d] outline-none text-textBlack shadow-input"
                            ></textarea>
                            {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <CommonBtn
                                className="w-full py-2 lg:py-4"
                                text={contactMutation.isLoading ? "Sending..." : "Send Message"}
                                type="submit"
                                disabled={contactMutation.isLoading}
                            />
                        </div>

                    </motion.form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactForm;
