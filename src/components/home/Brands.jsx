import React from "react";
import Marquee from "react-fast-marquee";
import CommonSectionTitle from "../common/CommonSectionTitle";
import useGetCmsData from "@/hooks/useGetCmsData";

const Brands = () => {
    const { data } = useGetCmsData('/vehicle-cover');
    console.log(data)
      const covers = Array.isArray(data?.data?.vehicle_covers) ? data?.data?.vehicle_covers : [];
    console.log(covers)


    const title = data?.data?.vehicle_cover?.title || "Find The Perfect Fit Seat Covers For Your Vehicle";

    const duplicatedLogos = [...covers, ...covers, ...covers];

    return (
        <div className="container pt-12 xl:pt-[150px]">
            <CommonSectionTitle className="text-center mb-4" text={title} />

            <Marquee
                direction="left"
                speed={40}
                pauseOnHover={true}
                gradient={true}
                gradientColor="#FBFBFB"
                className="py-4 overflow-hidden"
            >
                {duplicatedLogos?.map((cover, index) => (
                    <div
                        key={index}
                        className="mr-6 xl:mr-20 inline-flex items-center"
                    >
                        <img
                            src={cover.image}
                            alt={`Brand Logo ${index}`}
                            className="max-w-20 xl:max-w-[180px] h-16 w-auto object-contain"
                        />
                    </div>
                ))}
            </Marquee>

        </div>
    );
};

export default Brands;
