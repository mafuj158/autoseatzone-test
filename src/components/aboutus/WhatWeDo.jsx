
import CommonSectionTitle from "../common/CommonSectionTitle";
import IntroVideo from "../home/IntroVideo";


const WhatWeDo = ({ className = '' }) => {
    // Constants for maintainable strings
    const SECTION_TITLE = "What We Do";
    const DESCRIPTION = "We specialize in crafting premium, custom-fit car seat covers that blend protection, comfort, and style—tailored precisely for your vehicle.";
    const VIDEO_LABEL = "A short video about what we do";

    return (
        <section className={`container py-12 lg:py-[150px] ${className}`}>
            <header className="mb-10">
                <CommonSectionTitle
                    className="text-center font-pridi font-semibold"
                    text={SECTION_TITLE}
                />
                <p className="font-secondary text-center mt-[10px] max-w-[1009px] mx-auto text-xl leading-[30px] text-textBlack">
                    {DESCRIPTION}
                </p>
            </header>

            <div className="mt-[60px]">
                <h2 className="text-center lg:text-left text-xl text-textBlack mb-[30px]">
                    {VIDEO_LABEL}
                </h2>
                <IntroVideo />
            </div>
        </section>
    );
};



export default WhatWeDo;