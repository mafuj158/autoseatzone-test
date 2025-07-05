import CheckoutInputWrapper from "@/components/common/CheckoutInputWrapper";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useExclusiveSeatCover from "@/hooks/paymentHooks/useExclusiveSeatCover";
import useCartItems from "@/hooks/cartHooks/useCartItems";
import AdditionalInfo from "./CheckoutPage/components/AdditionalInfo";
import usePreparePayment from "@/hooks/paymentHooks/usePreparePayment";
import toast from "react-hot-toast";
import useExclusiveSeatCoverId from "@/hooks/paymentHooks/useExclusiveSeatCoverId";
import useToggleExclusiveCover from "@/hooks/paymentHooks/useToggleExclusiveCover";
import ShippingMethod from "./CheckoutPage/components/ShippingMethod";
import CountryStateCityPhone from "./CountryStateCityPhone";
import { useAuth } from "@/providers/AuthProvider";
import useDltCartItem from "@/hooks/cartHooks/useDeleteCartItem";
import OrderSummary from "./CheckoutPage/components/OrderSummary";
import { FaCircleCheck } from "react-icons/fa6";
import ExclusiveSeatProductList from "./CheckoutPage/components/ExclusiveSeatProductList";
import { CreditCard } from "lucide-react";
import PaymentMethodAccordion from "./CheckoutPage/components/PaymentMethodAccordion";
import MollieCardForm from "./CheckoutPage/components/PaywithCard";

const Checkout = () => {
  const { user } = useAuth();
  const { removeItem, isDeleting } = useDltCartItem();
  const {
    data: cartData,
    isLoading: isCardLoading,
    isFetching: isCardFetching,
    refetch: refetchCartItems,
  } = useCartItems();

  const { mutate: preparePayment, isPending: isPaymentPreparing } =
    usePreparePayment();
  const [cartID, setCartID] = useState(null);

  const {
    data: productOptions,
    isLoading: isproductOptionsLoading,
    isError,
    error,
  } = useExclusiveSeatCover();

  const toggleMutation = useToggleExclusiveCover();

  const { data: productOptionsId = [], isLoading: isIdProductOptionsLoading } =
    useExclusiveSeatCoverId();

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBillingCountry, setSelectedBillingCountry] = useState(null);
  const [selectedBillingState, setSelectedBillingState] = useState(null);
  const [selectedBillingCity, setSelectedBillingCity] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    if (productOptionsId) {
      setSelectedIds(productOptionsId);
    }
  }, [productOptionsId]);

  const handleExclusiveCover = (id) => {
    const isCurrentlySelected = selectedIds.includes(id);
    const newEnabled = !isCurrentlySelected;

    toggleMutation.mutate(
      { id, enabled: newEnabled },
      {
        onSuccess: () => {
          // Refetch the cart items after successful toggle
          refetchCartItems();
        },
        onError: (error) => {
          console.error("Toggle error:", error);
          toast.error("Failed to toggle cover option");
        },
      }
    );

    // Optimistically update UI:
    setSelectedIds((prev) =>
      newEnabled ? [...prev, id] : prev.filter((item) => item !== id)
    );
  };

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      setCartItems(cartData);
    }
  }, [cartData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(
      "card data ➡️➡️",
      data?.cardName,
      data?.cardNumber,
      data?.expiryDate,
      data?.cvc
    );
    // Create FormData object
    const formData = new FormData();

    // Manually append each form field
    formData.append("email", data.email);
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("street_address", data.street);
    formData.append("appartment", data.apartment || ""); // Optional field
    formData.append("city", data.city);
    formData.append("zip_code", data.zip);
    formData.append("country", data.country);
    formData.append("state", data.state);
    formData.append("shipping_phone", data.phone);

    // Append billing address if enabled
    if (showBillingAddress) {
      formData.append("billingStreet", data.billingStreet);
      formData.append("billingApartment", data.billingApartment || "");
      formData.append("billingCity", data.billingCity);
      formData.append("billingZip", data.billingZip);
      formData.append("billingCountry", data.billingCountry);
      formData.append("billingState", data.billingState);
      formData.append("billingPhone", data.billingPhone);
    }

    // Append cart items
    formData.append("cartItemsCount", cartItems.length);
    cartItems.forEach((item, index) => {
      formData.append(`cartItems[${index}].id`, item.id);
      formData.append(`cartItems[${index}].quantity`, item.quantity);
      formData.append(`cartItems[${index}].price`, item.price);
      // Add other item properties as needed
    });

    // Call the payment hook
    // preparePayment(formData, {
    //   onSuccess: (response) => {
    //     if (response.data.data) {
    //       window.location.href = response.data.data;
    //     }
    //   },
    //   onError: (error) => {
    //     console.error("Payment error:", error);
    //     toast.error(error.message || "Payment processing failed");
    //   },
    // });
  };

  const navigate = useNavigate();

  const [showBillingAddress, setShowBillingAddress] = useState(false);
  const [isOrderSummaryExpanded, setIsOrderSummaryExpanded] = useState(true);

  const trustInfoList = [
    "Seat Airbag Compatible",
    "Heated Seat Compatible",
    "Custom Fit Seat Covers",
    "Cool Seat Compatible",
  ];

  const handleRemoveItem = (id) => {
    // setCartItems(cartItems.filter((item) => item.id !== id));
    removeItem(id);
  };

  const handleBackToCart = () => {
    navigate("/cart");
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen px-4 py-8 md:px-8 lg:px-16 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left Column - Form Section */}
          <div className="flex-1 space-y-6">
            {/* Email */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
                Email Address
              </h2>

              <CheckoutInputWrapper
                name="email"
                type="email"
                defaultValue={user?.data?.email}
                placeholder="Enter your email"
                register={register("email", {
                  required: "Email is required",
                })}
                error={errors.email}
              />
            </div>

            {/* Shipping Details */}
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Shipping Details
              </h2>

              <div className="flex flex-col md:flex-row gap-4">
                <CheckoutInputWrapper
                  name="firstName"
                  placeholder="First Name"
                  register={register("firstName", {
                    required: "First Name is required",
                  })}
                  error={errors.firstName}
                />
                <CheckoutInputWrapper
                  name="lastName"
                  placeholder="Last Name"
                  register={register("lastName", {
                    required: "Last Name is required",
                  })}
                  error={errors.lastName}
                />
              </div>

              <CheckoutInputWrapper
                name="street"
                placeholder="Street Address"
                register={register("street", {
                  required: "Street is required",
                })}
                error={errors.street}
              />

              <CheckoutInputWrapper
                name="apartment"
                placeholder="Apartment, Suite, Unit (Optional)"
                register={register}
                // No required here as it's optional
              />

              {/* country list  */}
              <CountryStateCityPhone
                selectedCountry={selectedCountry}
                selectedState={selectedState}
                selectedCity={selectedCity}
                setSelectedCountry={setSelectedCountry}
                setSelectedCity={setSelectedCity}
                setSelectedState={setSelectedState}
                register={register}
                errors={errors}
              />

              <div className="flex flex-col md:flex-row gap-4">
                <CheckoutInputWrapper
                  name="zip"
                  placeholder="Postcode / Zip"
                  register={register("zip", {
                    required: "ZIP is required",
                  })}
                  error={errors.zip}
                />
              </div>

              <div className="mt-7 mb-5 ">
                <label className="flex items-center text-lg gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    onClick={() => setShowBillingAddress(!showBillingAddress)}
                    className="h-6 w-6 accent-red-500 cursor-pointer "
                  />
                  Use a different billing address (optional)
                </label>
              </div>
              {/* Billing Address - Conditionally Rendered */}
              {showBillingAddress && (
                <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm space-y-4 transition-all duration-300 ease-in-out">
                  <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                    Billing Address
                  </h2>

                  {/*  billing country list */}
                  <CountryStateCityPhone
                    countryField="billing-country"
                    stateField="billing-state"
                    cityField="billing-city"
                    phoneField="billing-phone"
                    selectedCountry={selectedBillingCountry}
                    selectedState={selectedBillingState}
                    selectedCity={selectedBillingCity}
                    setSelectedCountry={setSelectedBillingCountry}
                    setSelectedCity={setSelectedBillingCity}
                    setSelectedState={setSelectedBillingState}
                    register={register}
                  />

                  <CheckoutInputWrapper
                    name="billingApartment"
                    placeholder="Apartment, Suite, Unit (Optional)"
                    register={register}
                  />
                  <div className="flex flex-col md:flex-row gap-4">
                    <CheckoutInputWrapper
                      name="billingZip"
                      placeholder="Postcode / Zip"
                      register={register}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* shipping method */}
            <ShippingMethod />

            {/* additional information */}
            <AdditionalInfo />

            {/* product options */}
            {isproductOptionsLoading ? (
              <div className="flex items-center justify-center min-h-[200px] transition-all duration-300">
                <l-tailspin
                  size="40"
                  stroke="5"
                  speed="0.9"
                  color="black"
                ></l-tailspin>
              </div>
            ) : (
              <ExclusiveSeatProductList
                productOptions={productOptions}
                handleExclusiveCover={handleExclusiveCover}
                selectedIds={selectedIds}
                toggleMutation={toggleMutation}
                register={register}
                errors={errors}
                total={total}
              />
            )}

            <div>
              {/* Guarantee Message */}
              <div className="flex items-center justify-center space-x-3 xl:space-x-3 pt-4">
                <FaCircleCheck className="text-green-600 text-2xl" />

                <span className="xl:text-xl text-textBlack leading-9">
                  30-day Return &amp; Money Back Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Right side: Order Summary */}
          <OrderSummary
            total={total}
            isOrderSummaryExpanded={isOrderSummaryExpanded}
            handleBackToCart={handleBackToCart}
            isCardFetching={isCardFetching}
            isCardLoading={isCardLoading}
            cartItems={cartItems}
            handleRemoveItem={handleRemoveItem}
            isDeleting={isDeleting}
            trustInfoList={trustInfoList}
          />
        </div>
      </form>
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        {/* pay with card  */}
        {/* <PaywithCard register={register} errors={errors} /> */}
        <PaymentMethodAccordion register={register} errors={errors} />
        {/* Pay Now Button */}
        <div className=" pt-5 pb-5">
          {/* Total Price show*/}
          <div className="flex gap-4 lg:gap-0 lg:justify-between justify-center items-center mt-6 text-lg font-semibold transition-opacity duration-200">
            <span className="text-gray-800">Total</span>
            <span className="text-red-500">USD ${total.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#EE3131] text-white font-semibold py-3 rounded-md flex justify-center gap-5"
          >
            <CreditCard />
            <span>PAY NOW</span>
          </button>
        </div>
      </div>
      <MollieCardForm/>
    </div>
  );
};

export default Checkout;
