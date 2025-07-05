
import aboutbg from '@/assets/images/registerbg.png';
import BlogSection from '@/components/aboutus/BlogSection';
import WhatWeDo from '@/components/aboutus/WhatWeDo';
import CommonBanner from '@/components/common/CommonBanner';
import OurMission from '@/components/home/OurMission';
import OurPromise from '@/components/home/OurPromise';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import LoadingComponent from '@/components/loaders/LoadingComponent';
import useGetCmsData from '@/hooks/useGetCmsData';
const AboutUs = () => {
    const { data, isLoading } = useGetCmsData('/get-banner')
    const aboutUsBanner = data?.data;

    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <div>
            <CommonBanner backgroundImage={aboutUsBanner?.image} title={aboutUsBanner?.title} description={aboutUsBanner?.description} />
            <OurPromise />
            <WhyChooseUs />
            <OurMission />
            <WhatWeDo />
            <BlogSection />
        </div>
    );
};

export default AboutUs;