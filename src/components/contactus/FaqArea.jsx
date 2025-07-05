import useGetCmsData from "@/hooks/useGetCmsData";
import FaqSection from "./FaqSection";

const formatTitle = (type) => {
    switch (type) {
        case 'shipping':
            return 'Shipping & Delivery';
        case 'orders':
            return 'Orders';
        case 'refund':
            return 'Refund & Exchange';
        default:
            return type.charAt(0).toUpperCase() + type.slice(1);
    }
};

const FaqArea = () => {
    const { data } = useGetCmsData('/get-faq');
    const faqData = data?.data || [];

    return (
        <div id='faqArea' className="container px-5 py-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12">
                Frequently Asked Questions
            </h2>

            <div className="lg:space-y-16">
                {faqData.map(({ type, faqs }) => (
                    <FaqSection
                        key={type}
                        title={formatTitle(type)}
                        data={faqs}
                    />
                ))}
            </div>
        </div>
    );
};

export default FaqArea;
