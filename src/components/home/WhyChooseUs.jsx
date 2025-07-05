import CommonSectionTitle from "../common/CommonSectionTitle";
import { motion } from 'framer-motion'; // Import motion

const reasons = [
    {
        id: 1,
        title: "Custom-Fit Perfection",
        description: "We design seat covers specifically for your vehicle's make, model, and trim—ensuring a snug, factory-like fit every time.",
        icon: "🚗", // Replace with the actual icon you want to use
    },
    {
        id: 2,
        title: "Premium Craftsmanship",
        description: "Each cover is handcrafted by skilled artisans using high-quality materials and precise stitching for a flawless finish.",
        icon: "🪡",
    },
    {
        id: 3,
        title: "Long-Lasting Protection",
        description: "Protect your original seats from spills, stains, wear, and UV damage—while adding a touch of style to your interior.",
        icon: "☀️",
    },
    {
        id: 4,
        title: "Stylish & Functional Designs",
        description: "Choose from a variety of colors, textures, and stitching styles to match your taste and elevate your driving experience.",
        icon: "🎨",
    },
    {
        id: 5,
        title: "Fast & Secure Delivery",
        description: "From order to installation, we make the process quick, smooth, and reliable—so your custom seat covers arrive ready to impress.",
        icon: "🚚",
    },
    {
        id: 6,
        title: "Customer Satisfaction First",
        description: "We’re committed to top-tier service and support. Your satisfaction drives everything we do.",
        icon: "👍",
    },
];

const WhyChooseUs = () => {
    return (
        <div className="bg-[#06163A] mt-12 xl:mt-[150px] py-12 xl:py-[100px] text-white">
            <CommonSectionTitle className="text-center text-white" text="Why Choose Us" />
            <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-[87px] gap-12 lg:gap-y-[120px] px-8 mt-12 xl:mt-[100px]">
                {reasons.map((reason) => (
                    <motion.div
                        key={reason.id}
                        className="rounded-lg transition-colors"
                        whileInView={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="flex justify-center md:justify-start gap-2 mb-4">
                            <div className="text-2xl lg:text-4xl">{reason.icon}</div>
                            <h3 className="text-lg md:text-xl uppercase lg:text-[26px] font-semibold">{reason.title}</h3>
                        </div>
                        <p className="text-center md:text-left text-sm lg:text-[22px] text-[#DADADA]">{reason.description}</p>
                    </motion.div>

                ))}
            </div>
        </div>
    );
};

export default WhyChooseUs;
