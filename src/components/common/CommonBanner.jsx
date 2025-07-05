import { motion } from "framer-motion";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import configure from "@/assets/images/configure-design.png";
import production from "@/assets/images/production.png";
import steering from "@/assets/images/steering.png";
import { Link } from "react-router-dom";

const CommonBanner = ({
  backgroundImage,
  title,
  description,
  cards: customCards,
}) => {
  const defaultCards = [
    {
      image: configure,
      title: "Unique Design",
      description:
        "Crafted with modern trends in mind, ideal for any business style.",
    },
    {
      image: production,
      title: "Easy Customization",
      description:
        "Quickly adjust colors, fonts, and layout to match your brand identity.",
    },
    {
      image: steering,
      title: "Responsive Layout",
      description: "Optimized for all devices — desktop, tablet, and mobile.",
    },
  ];

  const cards =
    customCards && customCards.length > 0 ? customCards : defaultCards;

  return (
    <div className="relative">
      {/* Banner Section */}
      <div
        className="h-full  md:pt-24 xl:pt-[370px] py-12 md:py-24 xl:pb-[250px] bg-cover bg-center bg-no-repeat flex items-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-[.74] z-0"></div>

        <div className="container relative z-10 text-white px-4 sm:px-6 md:px-8">
          <div className="border-3 mx-auto lg:mx-0 border-[#EE3131] w-[164px] mb-5"></div>

          {/* Motion for Title */}
          <motion.h3
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl text-center lg:text-left md:text-5xl xl:text-[64px] font-bold leading-[40px] sm:leading-[60px] md:leading-[76px]"
          >
            {title}
          </motion.h3>

          {/* Motion for Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center lg:text-left lg:max-w-[503px] mt-5"
          >
            {description}
          </motion.p>

          {/* Motion for Button */}
          <Link to="/product/custom-fit-leather-seat-covers">
            <div className="flex justify-center lg:justify-start">
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{ letterSpacing: "2px" }}
                className="cursor-pointer flex gap-[10px] text-sm xl:text-base items-center leading-[14px] rounded-lg p-4 md:p-[30px] bg-[#EE3131] mt-8"
              >
                CHOOSE YOUR DESIGN
                <ArrowRightIcon />
              </motion.button>
            </div>
          </Link>
        </div>
      </div>

      {/* Overlapping Cards */}
      <div className="xl:max-w-[1320px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="xl:-mt-24 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-8 relative z-20">
          {cards.map((card, index) => {
            const cardContent = (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                className="bg-[#06163A] text-white rounded-2xl p-6 sm:p-8 cursor-pointer hover:opacity-90 transition"
              >
                <div className="flex gap-4 items-center">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                  />
                  <h4 className="text-lg sm:text-xl font-semibold mb-2">
                    {card.title}
                  </h4>
                </div>
                <p className="mt-4 text-sm sm:text-base">{card.description}</p>
              </motion.div>
            );

            return card.title === "Help Center" ? (
              <Link to="/help-center" key={index}>
                {cardContent}
              </Link>
            ) : (
              cardContent
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommonBanner;
