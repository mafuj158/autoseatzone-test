import ArrowRightIcon from '@/assets/icons/ArrowRightIcon';
import EnhanceIcon from '@/assets/icons/EnhanceIcon';
import PhoneIcon from '@/assets/icons/PhoneIcon';
import choosedesign from '@/assets/images/choosedesign.png';
import choosedesignimg from '@/assets/images/choosedesignimg.png';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ChooseDesign = () => {
    return (
        <div className="relative">
            {/* Banner Section */}
            <div
                className="h-full md:pt-24 xl:pt-[370px] py-12 md:py-24 xl:pb-[250px] bg-cover bg-center bg-no-repeat flex items-center relative"
                style={{ backgroundImage: `url(${choosedesign})` }}
            >
                <div className="absolute inset-0 bg-[#06163A] opacity-[.85] z-0"></div>

                <div className="container relative z-10 text-white px-4 sm:px-6 md:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        {/* Left Content */}
                        <div className="lg:w-1/2">
                            <div className="border-3 border-[#EE3131] w-[164px] mb-5 lg:mb-10 mx-auto lg:mx-0"></div>

                            <motion.h3
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="text-3xl text-center lg:text-left md:text-5xl xl:text-[64px] font-bold leading-[40px] sm:leading-[60px] md:leading-[76px]"
                            >
                                Choose Your Design
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-center lg:text-left lg:max-w-[503px] mt-5"
                            >
                                Each seat cover is a masterpiece, crafted with precision and passion. Start your
                                journey towards a more stylish and comfortable drive.
                            </motion.p>

                            <Link to="/product/custom-fit-leather-seat-covers/">
                                <div className="flex justify-center lg:justify-start">
                                    <motion.button
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.4 }}
                                        style={{ letterSpacing: '2px' }}
                                        className="cursor-pointer flex gap-[10px] text-sm xl:text-base items-center leading-[14px] rounded-lg p-4 md:p-[30px] bg-[#EE3131] mt-8"
                                    >
                                        CHOOSE YOUR DESIGN
                                        <EnhanceIcon />
                                    </motion.button>
                                </div></Link>
                        </div>

                        {/* Right Image Block */}
                        <div className="lg:w-1/2 bg-white p-4 md:p-6 rounded-[20px]">
                            <img
                                src={choosedesignimg}
                                alt="Choose Design Visual"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlapping Cards Section (Centered Absolute) */}
            <div className="bg-primary max-w-[1320px] lg:mx-auto p-8 md:p-12 relative rounded-lg mt-6 xl:-mt-[50px] mx-5">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Left side - Call for info */}
                    <div className="flex items-center gap-4 pr-12 md:border-r-[3px] md:border-white md:mr-6">
                        <PhoneIcon />
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-white text-center md:text-left"
                        >
                            <h3 className="text-lg md:text-xl mb-1">Call for More Info</h3>
                            <p className="text-lg md:text-[28px] font-bold">+1 (718) 2555335</p>
                        </motion.div>
                    </div>

                    {/* Middle - Tagline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-white text-center text-sm md:text-lg md:text-[28px] font-bold"
                    >
                        Enjoy Comfort in Every Journey with Auto Seat Zone
                    </motion.div>

                    {/* Right side - Learn more button */}
                    <Link to="/product/custom-fit-leather-seat-covers/">
                        <motion.button
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="cursor-pointer flex items-center gap-2 bg-[#06163A] text-white px-5 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            LEARN MORE
                            <ArrowRightIcon className="w-4 h-4" />
                        </motion.button></Link>
                </div>
            </div>
        </div>
    );
};

export default ChooseDesign;
