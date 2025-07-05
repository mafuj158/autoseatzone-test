import { CircleX, CreditCard, LoaderCircle, PackageOpen } from "lucide-react";

const OrderSummary = ({
  total,
  isOrderSummaryExpanded,
  handleBackToCart,
  isCardFetching,
  isCardLoading,
  cartItems,
  handleRemoveItem,
  isDeleting,
  trustInfoList,
}) => {
  return (
    <div className="w-full h-fit border border-[#E4E7E9] md:w-[424px] bg-white py-5 px-6 rounded-2xl flex flex-col gap-4">
      {/* Mobile Toggle Button - Only visible on mobile */}
      <button
        className="md:hidden flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg mb-2 transition-colors duration-200 hover:bg-gray-100"
        aria-expanded={true}
        aria-controls="order-summary-content"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-gray-800">Order Summary</span>
          <span className="text-red-500 font-medium">
            USD ${total.toFixed(2)}
          </span>
        </div>
      </button>

      {/* Content with smooth animation */}
      <div
        id="order-summary-content"
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOrderSummaryExpanded
            ? "max-h-[2000px] opacity-100"
            : "max-h-0 opacity-0 md:max-h-[2000px] md:opacity-100"
        }`}
      >
        <div className="space-y-4 py-2">
          {/* Back Button */}
          <button
            onClick={handleBackToCart}
            className="cursor-pointer flex items-center gap-2 text-[#EE3131] mb-4 transition-colors duration-200 hover:text-[#c62828]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Back to Cart</span>
          </button>

          <h2 className="hidden md:block text-xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>
          {isCardLoading || isCardFetching ? (
            <div className="flex items-center justify-center min-h-[200px] transition-all duration-300">
              <l-tailspin
                size="40"
                stroke="5"
                speed="0.9"
                color="black"
              ></l-tailspin>
            </div>
          ) : cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 relative border-b pb-4 transition-opacity duration-200"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-20 flex-shrink-0">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg transition-transform duration-200 hover:scale-105"
                    />
                  </div>

                  {/* Product Title */}
                  <div className="flex-1">
                    <p className="text-textBlack font-medium">
                      {item?.exclusive_seat_id
                        ? item?.cover_color_name
                        : item?.seat_type}
                    </p>
                  </div>
                </div>

                {/* Product Details */}
                <div className="grid grid-cols-3 gap-2 text-sm text-textBlack">
                  {[
                    { label: "Model Year", value: item.year },
                    { label: "Car Make", value: item?.brand_name },
                    { label: "Car Model", value: item?.model_name },
                    { label: "Trim", value: item.trim_name },
                    { label: "Design/Color", value: item.cover_color_name },
                    { label: "Number of Seats", value: item.seatCount },
                  ]
                    .filter((detail) => detail.value) // Only include details with values
                    .map((detail, index) => (
                      <div
                        key={index}
                        className="transition-opacity duration-200 hover:opacity-80"
                      >
                        <p className="text-gray-500">{detail.label}</p>
                        <p className="text-[#EE3131]">{detail.value}</p>
                      </div>
                    ))}
                </div>

                {/* Price Display */}
                <div className="flex justify-between items-center pt-2">
                  <div className="text-lg font-semibold transition-colors duration-200 hover:text-gray-700">
                    Price: {item.quantity} x USD $
                    {Number(item.price).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="bg-gray-200 rounded-full p-1 hover:bg-gray-300 transition-colors duration-200 hover:text-primary"
                    aria-label="Remove item"
                  >
                    {isDeleting ? (
                      <LoaderCircle className="animate-spin" />
                    ) : (
                      <CircleX />
                    )}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 transition-opacity duration-200 flex flex-col justify-center items-center text-2xl">
              <PackageOpen size={80} className="mb-2"/>
              Your cart is empty
            </div>
          )}

          {/* Total */}
          <div className="flex gap-4 lg:gap-0 lg:justify-between justify-center items-center mt-6 text-lg font-semibold transition-opacity duration-200">
            <span className="text-gray-800">Total</span>
            <span className="text-red-500">USD ${total.toFixed(2)}</span>
          </div>

          {/* submit button  */}
          <div className="w-full mt-4">
            <button
              type="submit"
              className="cursor-pointer flex justify-center items-center gap-2 w-full bg-[#EE3131] text-white font-bold py-3 rounded-md text-base hover:bg-[#c62828] transition-colors"
            >
              <CreditCard />
              Buy Now
            </button>
          </div>

          {/* Trust Info */}
          <div className="mt-6 grid xl:grid-cols-2 gap-y-[15px] gap-x-2 justify-center lg:justify-start items-center text-sm text-gray-500 transition-opacity duration-200">
            {trustInfoList.map((info, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 hover:text-gray-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="shrink-0 mt-[2px]"
                  aria-hidden="true"
                >
                  <g clipPath="url(#clip0_21897_2344)">
                    <path
                      d="M20.0003 4.8125C20.0003 5.40234 19.7659 5.97266 19.3479 6.39062L8.97681 16.7617C8.10572 17.6328 6.69166 17.6328 5.82056 16.7617L0.652594 11.5977C-0.195062 10.7031 -0.159906 9.29297 0.734626 8.44531C1.59791 7.625 2.94947 7.62891 3.80884 8.44531L7.39869 12.0352L16.1917 3.23828C17.0628 2.36719 18.4768 2.36719 19.3479 3.23828C19.7659 3.65625 20.0003 4.22266 20.0003 4.8125Z"
                      fill="#09B29C"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_21897_2344">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span>{info}</span>
              </div>
            ))}
          </div>

          <h3 className="mt-10 font-medium leading-9 md:text-xl xl:text-2xl text-center text-gray-700 transition-opacity duration-200">
            5000+ Happy Customers
          </h3>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
