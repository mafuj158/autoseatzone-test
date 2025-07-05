import { useState } from "react";
import { Collapse } from "antd";
import { motion } from "framer-motion";
import PlusIcon from "@/assets/icons/PlusIcon";

const FaqSection = ({ title, data }) => {
    const [activeKey, setActiveKey] = useState([]);

    const handleChange = (key) => {
        setActiveKey(key);
    };

    return (
        <section>
            <h3 className="md:text-2xl lg:text-[32px] leading-[42px] font-medium mb-6">
                {title}
            </h3>

            <Collapse
                bordered={false}
                activeKey={activeKey}
                onChange={handleChange}
                expandIcon={({ isActive }) => (
                    <motion.div
                        animate={{ rotate: isActive ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center justify-center"
                    >
                        <PlusIcon />
                    </motion.div>
                )}
                expandIconPosition="end"
                className="faq-accordion bg-transparent"
            >
                {data?.map(({ key, question, answer }) => (
                    <Collapse.Panel
                        key={key}
                        header={
                            <p className="md:text-xl lg:text-2xl font-semibold text-[#333]">
                                Q: {question}
                            </p>
                        }
                        className="faq-item"
                        style={{
                            border: "1px solid #0F1B37",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            marginBottom: "12px",
                        }}
                    >
                        <div className="px-4 pb-4 pt-2">
                            <p className="md:text-lg lg:text-[22px] font-medium lg:leading-9 text-textBlack">
                                {answer}
                            </p>
                        </div>
                    </Collapse.Panel>
                ))}
            </Collapse>

            <style jsx global>{`
                .faq-accordion .ant-collapse-header {
                    padding: 16px !important;
                    display: flex !important;
                    align-items: center !important;
                }
                .faq-accordion .ant-collapse-content-box {
                    padding: 0 !important;
                }
            `}</style>
        </section>
    );
};

export default FaqSection;
