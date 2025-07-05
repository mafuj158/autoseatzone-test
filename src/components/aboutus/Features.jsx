import CustomizeIcon from '@/assets/icons/CustomizeIcon';
import DeliverIcon from '@/assets/icons/DeliverIcon';
import ExperienceIcon from '@/assets/icons/ExperienceIcon';
import ProductionIcon from '@/assets/icons/ProductionIcon';
import featureimg from '@/assets/images/featureimg.png'
const Features = () => {
    const features = [

        {
            title: "Customize Your Vehicle Design",
            description: "Select your vehicle's year, make, model, and trim to unlock a personalized design experience tailored just for your car.",
            icon: <CustomizeIcon />
        },
        {
            title: "Ultimate Driving Comfort",
            description: "Thoughtfully engineered and crafted to ensure a seamless, precise fit tailored specifically for your vehicle's seats.",
            icon: <CustomizeIcon />
        },
        {
            title: "Precision Production",
            description: "Experienced craftsmen apply their years of refined skill to ensure every detail is brought to life with expert care.",
            icon: <CustomizeIcon />
        },
        {
            title: "Delivered with Care",
            description: "Each custom piece is securely packaged and shipped promptly, arriving ready for installation and everyday use.",
            icon: <CustomizeIcon />
        }
    ];

    return (
        <div className="container px-4 py-[150px] sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-12 flex gap-[60px]">
                <div className='min-w-[640px] h-[254px] '>
                    <img src={featureimg} alt="" className='w-full h-full' />
                </div>
                {/* content */}
                <div className='text-textBlack'>
                    <h3 className='text-5xl font-semibold leading-[72px]'>Comfort In Every
                        <br />  <span className='text-[#EE3131]'>Journey</span></h3>
                    <p className='text-xl leading-[30px] mt-5'>At Auto Seat Zone, we believe in affordable luxury. Our seat covers offer the opulence of high-end products at a price that won’t break the bank. Experience the Auto Seat Zone difference – where quality meets craftsmanship.</p>
                </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-x-5 gap-y-10 md:grid-cols-2">


                {/* Feature List */}
                {features.map((feature, index) => (
                    <div
                        key={index}
                    >
                        <div className="flex items-start gap-7">
                            <div className="flex-shrink-0 mt-1">
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className="text-[28px] font-semibold text-gray-900 leading-[42px] mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-xl leading-[30px]">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;