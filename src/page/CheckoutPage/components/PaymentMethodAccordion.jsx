import { Collapse } from "antd";
import PaywithCard from "./PaywithCard";
import cardIcon from "@/assets/icons/atm-card.png";
import { Circle, CircleDot, Landmark } from "lucide-react";
import { useState } from "react";

const PaymentMethodAccordion = ({ register, errors }) => {
  const [activeKey, setActiveKey] = useState(["1"]);

  const handleChange = (key) => {
    setActiveKey(key.length == 0 ? activeKey : key);
  };

  const items = [
    {
      key: "1",
      label: (
        <div className="flex items-center space-x-3 lg:space-x-5">
          <span>
            {activeKey[0] === "1" ? (
              <CircleDot className="text-red-600  h-6 w-6" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>
          <span className="flex items-center gap-3 lg:text-2xl font-medium leading-9 text-textBlack">
            Pay With Card
            <img className="h-8 w-8" src={cardIcon} alt="card" />
          </span>
        </div>
      ),
      children: <PaywithCard register={register} errors={errors} />,
    },
    {
      key: "2",
      label: (
        <div className="flex items-center space-x-3 lg:space-x-5 ">
          <span>
            {activeKey[0] === "2" ? (
              <CircleDot className="text-red-600  h-6 w-6" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>
          <span className="uppercase flex items-center gap-2  lg:text-2xl font-medium leading-9 text-textBlack">
            Bank <Landmark className="text-blue-800" />
          </span>
        </div>
      ),
      children: <div className="!py-0 !px-0 !my-0"></div>,
    },
    {
      key: "3",
      label: (
        <div className="flex items-center space-x-3 lg:space-x-5 ">
          <span>
            {activeKey[0] === "3" ? (
              <CircleDot className="text-red-600  h-6 w-6" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>
          <span className="uppercase flex items-center gap-2  lg:text-2xl font-medium leading-9 text-textBlack">
            Pay Over Time
          </span>
        </div>
      ),
      children: <div className="!py-0 !px-0 !my-0"></div>,
    },
    {
      key: "4",
      label: (
        <div className="flex items-center space-x-3 lg:space-x-5 ">
          <span>
            {activeKey[0] === "4" ? (
              <CircleDot className="text-red-600  h-6 w-6" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>
          <span className="uppercase flex items-center gap-2  lg:text-2xl font-medium leading-9 text-textBlack">
            Pay in full today
          </span>
        </div>
      ),
      children: <div className="!py-0 !px-0 !my-0"></div>,
    },
    {
      key: "5",
      label: (
        <div className="flex items-center space-x-3 lg:space-x-5 ">
          <span>
            {activeKey[0] === "5" ? (
              <CircleDot className="text-red-600  h-6 w-6" />
            ) : (
              <Circle className="text-gray-400" />
            )}
          </span>
          <span className="uppercase flex items-center gap-2  lg:text-2xl font-medium leading-9 text-textBlack">
            Pay later
          </span>
        </div>
      ),
      children: <div className="!py-0 !px-0 !my-0"></div>,
    },
  ];

  return (
    <Collapse
      accordion
      activeKey={activeKey}
      onChange={handleChange}
      items={items}
      expandIconPosition="end"
      expandIcon={() => null} // Remove default icon
    />
  );
};

export default PaymentMethodAccordion;
