import CommonBanner from "@/components/common/CommonBanner";

import ContactForm from "@/components/contactus/ContactForm";
import FaqArea from "@/components/contactus/FaqArea";
import helpimg from '@/assets/images/help-center.png'
import email from '@/assets/images/email.png'
import callus from '@/assets/images/callus.png'
import useGetCmsData from "@/hooks/useGetCmsData";
import LoadingComponent from "@/components/loaders/LoadingComponent";
const ContactUs = () => {
    const { data, isLoading } = useGetCmsData('/contactus-hero')
    console.log(data)
    const contactusBanner = data?.data;
    if (isLoading) {
        return <LoadingComponent />
    }
    return (
        <div>
            <CommonBanner backgroundImage={contactusBanner?.image} title={contactusBanner?.title} description={contactusBanner?.description} cards={[
                {
                    image: helpimg,
                    title: "Help Center",
                    description: "Explore guides, find answers, and get the support you need – all in one place."
                },
                {
                    image: email,
                    title: "Email Address",
                    description: "Send us your request or questions to info@autoseatzone.com"
                },
                {
                    image: callus,
                    title: "Call Us",
                    description: "Got questions? Let’s talk it out. +1(718) 2555335"
                }
            ]} />
            <ContactForm />
            <FaqArea />
        </div>
    );
};

export default ContactUs;