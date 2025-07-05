import { motion } from "framer-motion";
import useGetCmsData from "@/hooks/useGetCmsData";

const OurPromise = () => {

    const { data } = useGetCmsData('/comfort-journey')
    // console.log(data)
    const comfortJourneyHeading = data?.data?.comfort_journey;
    const features = data?.data?.comfort_journeys;
    // console.log(comfortJourneyHeading)
    return (
        <div className='container space-y-6 xl:space-y-10 py-10 xl:py-[150px] overflow-x-hidden'>

            {/* Top Section */}
            <div className='flex gap-[60px] items-start flex-col xl:flex-row'>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}

                    transition={{ duration: 0.6 }}
                    className='w-full lg:min-w-[500px] xl:min-w-[639px] h-[254px]'
                >
                    <img src={comfortJourneyHeading?.image} alt="Comfort Image" className='w-full h-full object-cover rounded-lg' />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}

                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='text-textBlack'
                >
                    <h3 className='text-center xl:text-left text-2xl xl:text-5xl font-semibold xl:leading-[72px]'>
                        {comfortJourneyHeading?.title}
                    </h3>
                    <p className='text-center xl:text-left text-sm lg:text-xl xl:leading-[30px] mt-5'>
                        {comfortJourneyHeading?.description}
                    </p>
                </motion.div>
            </div>

            {/* Features Section */}
            <div className='grid md:grid-cols-2 gap-x-5 gap-y-10 mt-6 xl:mt-[60px]'>
                {features?.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 * index }}
                        className='flex flex-col xl:flex-row gap-7 items-center xl:items-start'
                    >
                        <div className='w-[52px] h-[52px]'>
                            <img src={item.image} alt={item.title} className='w-full h-full object-contain lg:mr-4' />
                        </div>
                        <div className='text-textBlack'>
                            <h4 className='text-center xl:text-left text-2xl xl:text-[28px] lg:leading-[42px] font-semibold mb-2'>{item.title}</h4>
                            <p className='text-sm text-center xl:text-left lg:text-xl lg:leading-[30px]'>{item.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

        </div>
    );
};

export default OurPromise;
