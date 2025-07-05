import { motion } from "framer-motion"; // 👈 Import motion
import CommonBtn from "../common/CommonBtn";
import CommonSectionTitle from "../common/CommonSectionTitle";
import IntroVideo from "./IntroVideo";

const OurMission = () => {
    return (
        <div className="container mx-auto px-4">
            <div className="flex flex-col-reverse lg:flex-row gap-[60px] items-center">

                {/* Video Section */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full lg:w-1/2"
                >
                    <div className="xl:w-[656px] h-auto rounded-xl">
                        <IntroVideo />
                    </div>
                </motion.div>

                {/* Content Section */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full lg:w-1/2"
                >
                    <CommonSectionTitle text="Our Mission" className="text-center mb-3 lg:mb-5" />

                    <div className="space-y-5 text-textBlack">
                        <p className="text-center lg:text-left text-sm lg:text-lg lg:leading-[30px]">
                            At the heart of everything we do lies a simple belief: the journey should be just as exceptional as the destination. Our mission is to redefine the driving experience by offering premium, custom-fit leather car seat covers that combine comfort, durability, and timeless style.
                        </p>

                        <p className="text-center lg:text-left text-sm lg:text-lg lg:leading-[30px]">
                            Every vehicle has its own story, and we believe its interior should reflect that individuality. That&apos;s why we don&rsquo;t just produce seat covers—we carefully craft them. From concept to final stitch, our process is rooted in precision, passion, and true craftsmanship. <br /> With years of experience, we&apos;ve perfected the art of creating seat covers that not only elevate your car&#39;s style but also offer lasting durability. Designed for a flawless fit, our covers protect your original upholstery while enhancing overall comfort. <br />
                            Our skilled artisans handpick premium leather, focusing on quality, feel, and finish. Every stitch is placed with intention, delivering a refined touch of luxury that transforms your everyday drive into something truly memorable.
                        </p>
                    </div>

                    <div className="mt-10">
                        <CommonBtn
                            className="bg-[#EE3131] hover:bg-[#D42A2A] text-white px-8 py-3 rounded-lg transition-colors duration-300 w-full lg:w-fit"
                            text='Customize Your Car Seat Covers'
                        />
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default OurMission;
