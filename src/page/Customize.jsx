
import CarVideo from '@/components/Customize/CarVideo';
import TestimonialSection from '@/components/home/TestimonialSection';
import seatimg from '@/assets/images/seatimg.png'
import { Link } from 'react-router-dom';
import Configure from '@/components/Customize/Configure';
import useGetCmsData from '@/hooks/useGetCmsData';
import DOMPurify from 'dompurify';
import LoadingComponent from '@/components/loaders/LoadingComponent';
import ReviewForm from '@/components/Customize/ReviewForm';



const Customize = () => {
    const { data, isLoading } = useGetCmsData('/configuration-page')
    console.log(data)
    const videoUrl1 = data?.data?.video;
    const videoUrl2 = data?.data?.video_url;
    // console.log(videoUrl1)
    const steps = data?.data?.description;

    const video1 = data?.data?.video;
    const video2 = data?.data?.video_url;
    const video3 = data?.data?.meta_video;
    const metaData = data?.data?.metadata;
    const subDescription = data?.data?.sub_description;

    const colorTitle = data?.data?.sub_title;

    const color1 = data?.data?.image;
    const color2 = data?.data?.bg_image;
    console.log(metaData)

    if (isLoading) {
        return <LoadingComponent />
    }



    return (
        <div className='container'>
            <div className="px-4 py-2 xl:py-10 flex flex-col lg:flex-row gap-4 xl:gap-8 items-start">


                {/* Configuration Section */}
                <Configure />
                {/* Steps Section */}

            </div>
            <div className="mt-8">
                <h3 className="  lg:text-left text-lg md:text-xl lg:text-2xl xl:text-[28px] text-[#232323] font-medium mb-5">Customize Your Seat Covers – Tailored Just for Your Vehicle</h3>
                <p className="mb-6   lg:text-left lg:text-2xl text-textBlack">We make seat covers that fit like a glove—because they’re made specifically for your car. To get started, follow the steps below to provide us with the key details we need:</p>

                {steps && (
                    <div
                        className="prose max-w-none space-y-6 lg:space-y-10 text-textBlack"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(steps),
                        }}
                    />
                )}

            </div>
            <div className='mt-10'>
                <CarVideo videoUrl={video1} />
            </div>
            {/*  */}
            <p className='  lg:text-left md:text-xl lg:text-2xl mt-5'>Our Premium Custom and Exact Fit Leather Seat Covers ensures full protection for your vehicle’s seat at a reduced cost.Choose from over 35 unique design combinations from the ‘Color / Design’ options. Our seat covers are made with your vehicle’s exact model and trim in mind. This ensures a perfect fit for the front and rear seats.Experience luxury and comfort with our Full Set Custom Fit Leather Seat Covers. These seat covers, crafted from the finest quality leather, are not just accessories, but an upgrade to your driving experience. They are designed to provide an exact fit for your car seats, ensuring a seamless blend with your vehicle’s interior.Every stitch, every cut, and every seam is executed with precision, reflecting our unwavering commitment to providing you with a product that is both functional and luxurious. The durable leather enhances the aesthetics of your car interior and provides improved comfort and protection for your seats.</p>
            <div className='mt-[75px]'>
                <CarVideo videoUrl={video2} />
            </div>
            <p className='  lg:text-left md:text-xl lg:text-2xl mt-5'>{colorTitle}</p>

            {/* Split colors into two rows: 12 and 11 */}
            {/* Color Palette Section - Part 1 */}
            <div className="w-full mt-16 flex flex-col gap-16">

                {/* Palette 1 */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                    {/* Left Side Content */}
                    <div className="lg:w-1/2 w-full flex justify-center border border-[#E4E7E9] p-4">
                        <div className="w-full max-w-[300px] aspect-square">
                            <img
                                src={color2}
                                alt="Color Palette 2"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                    </div>


                    {/* Right Side Image */}
                    <div className="lg:w-1/2 w-full flex justify-center border border-[#E4E7E9] p-4">
                        <div className="w-full max-w-[300px] aspect-square">
                            <img
                                src={color1}
                                alt="Color Palette 2"
                                className="w-full h-full rounded-lg object-cover"
                            />
                        </div>
                    </div>
                </div>


            </div>


            {metaData && (() => {
                const sanitized = DOMPurify.sanitize(metaData);

                // Split based on numbered list: 1.&nbsp;, 2.&nbsp;, ...
                const parts = sanitized.split(/(?=\d+\.\&nbsp;)/);

                // First part is the title/intro text
                const intro = parts.shift();

                return (
                    <div className="mt-10 text-textBlack md:text-xl lg:text-2xl space-y-4">
                        <div
                            dangerouslySetInnerHTML={{ __html: intro }}
                            className="prose max-w-none"
                        />
                        {parts.map((item, idx) => (
                            <div
                                key={idx}
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: item }}
                            />
                        ))}
                    </div>
                );
            })()}



            <div className='mt-[30px]'>
                <p className='  lg:text-left md:text-xl lg:text-2xl text-textBlack'>Our seat covers are more than just accessories; they are a statement of style and a testament to our craftsmanship. Each cover is meticulously designed to transform your vehicle’s interior, making every journey a luxurious experience.
                    Choose Auto Seat Zone custom-fit leather Seat Covers – where quality meets craftsmanship. Experience the difference today!</p></div>

            <div className='my-10'>
                <CarVideo videoUrl={video3} /></div>
            <div className='mt-10'>
                <h3 className='  lg:text-left md:text-xl lg:text-2xl text-textBlack mb-6'>Why should you consider investing in our custom-fit leather seat covers? Here are a few reasons:</h3>
                {data?.data?.sub_description && (() => {
                    const parseSubDescription = (sub_description) => {
                        const parts = sub_description.split(/\r?\n\r?\n\r?\n\r?\n/);

                        const intro = parts[0];
                        const reasonRegex = /^\d\.\s?(.+?):\s?(.+)$/;
                        const reasons = [];
                        let outro = '';

                        for (let i = 1; i < parts.length; i++) {
                            const match = parts[i].match(reasonRegex);
                            if (match) {
                                reasons.push({ title: match[1], description: match[2] });
                            } else {
                                outro += parts[i] + '\n\n';
                            }
                        }

                        return { intro, reasons, outro };
                    };

                    const { intro, reasons, outro } = parseSubDescription(data.data.sub_description);

                    return (
                        <div className="mt-10 space-y-6 text-textBlack">
                            {/* Intro */}
                            {intro && (
                                <p className="text-xl lg:text-2xl">
                                    {intro}
                                </p>
                            )}

                            {/* Reason list */}
                            {reasons.length > 0 && (
                                <div className="space-y-4">
                                    {reasons.map((reason, idx) => (
                                        <div key={idx} className="text-xl lg:text-2xl">
                                            <h4>
                                                {idx + 1}. <span className="font-bold">{reason.title}</span>: {reason.description}
                                            </h4>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Outro */}
                            {outro && (
                                <p className="text-xl lg:text-2xl whitespace-pre-line">
                                    {outro.trim()}
                                </p>
                            )}
                        </div>
                    );
                })()}

                <p className='md:text-xl lg:text-2xl mt-10'>Our seat covers are more than just accessories; they are a statement of style and a testament to our craftsmanship. Each cover is meticulously designed to transform your vehicle’s interior, making every journey a luxurious experience.Choose Auto Seat Zone’s Custom Fit Leather Seat Covers – where quality meets craftsmanship. Experience the difference today!</p>
                <p className='md:text-xl lg:text-2xl mt-10'>Do you have any questions? Check our <Link to="/help-center"><span className='text-[#EE3131]'>Help Center</span></Link> or <Link to="/contact">
                    <span className='text-[#EE3131]'>Contact us</span></Link>. You can also Chat with us using our live chat option below.</p>
            </div>
            <ReviewForm/>
            <TestimonialSection />
        </div>
    );
};

export default Customize;
