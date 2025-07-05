import { CreditCard } from "lucide-react";
import PaymentMethodAccordion from "./PaymentMethodAccordion";

const ExclusiveSeatProductList = ({
  productOptions,
  handleExclusiveCover,
  selectedIds,
  toggleMutation,
  register,
  errors,
  total
}) => {
  return (
    <div className="space-y-10 bg-white border border-[#E4E7E9] py-[50px] px-[30px] rounded-lg">
      {productOptions &&
        productOptions.map((option) => (
          <div
            key={option.id}
            className="bg-[#EFF5FF] py-5 rounded-lg border border-[#F03535]"
          >
            <div className="xl:w-[515px] mx-auto xl:h-[293px] p-2 xl:p-0">
              <img
                src={option.image}
                alt={option.title}
                className="w-full h-full object-cover rounded-md mb-4"
              />
            </div>
            <h3 className="text-[#EE3131] lg:text-xl font-bold lg:leading-[30px] text-center mt-[10px]">
              {option.title}
            </h3>
            <p className="lg:max-w-[828px] mx-auto text-textBlack text-sm lg:text-xl lg:leading-[30px] text-center mt-[10px] mb-5">
              {option.description}
            </p>
            <div className="text-center text-lg xl:text-[32px] lg:leading-[30px] font-bold mb-4">
              USD $
              {typeof option?.price === "number"
                ? option.price.toFixed(2)
                : parseFloat(option?.price || 0).toFixed(2)}
            </div>
            <label className="border border-[#00000040] w-fit mx-auto py-[10px] px-10 rounded-lg flex items-center justify-center space-x-2 text-sm">
              <input
                onClick={() => handleExclusiveCover(option?.id)}
                type="checkbox"
                checked={selectedIds.includes(option.id)}
                className="w-7 h-7 border-2 border-red-500 accent-red-500 rounded"
                readOnly
                disabled={
                  toggleMutation.isLoading &&
                  toggleMutation.variables?.id === option.id
                }
              />
              <span className="lg:text-xl leading-[30px]">
                Yes! Add Initials or Logo Embroidery
              </span>
            </label>
          </div>
        ))}

      
    </div>
  );
};

export default ExclusiveSeatProductList;
