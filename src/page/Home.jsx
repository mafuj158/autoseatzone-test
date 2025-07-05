import CommonBanner from "@/components/common/CommonBanner";
import IntroVideo from "@/components/home/IntroVideo";
import Brands from "@/components/home/Brands";
import OurPromise from "@/components/home/OurPromise";
import TestimonialSection from "@/components/home/TestimonialSection";
import BlogSection from "@/components/aboutus/BlogSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ChooseDesign from "@/components/home/ChooseDesign";
import useGetCmsData from "@/hooks/useGetCmsData";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import MollieCardForm from "./CheckoutPage/components/PaywithCard";

const Home = () => {
    const { data, isLoading } = useGetCmsData('/home-banner')
    // console.log(data)
    const homeBanner = data?.data?.home_banner;


    if (isLoading) {
        return <LoadingComponent />
    }

    return (
        <div>
            <MollieCardForm/>
            <CommonBanner backgroundImage={homeBanner?.image} title={homeBanner?.title} description={homeBanner?.description} />
            <div className="mt-12 xl:mt-[100px]">
                <IntroVideo />
            </div>
            <Brands />
            <OurPromise />
            <WhyChooseUs />
            <ChooseDesign />
            <BlogSection />
            <TestimonialSection />
        </div>
    );
};

export default Home;
