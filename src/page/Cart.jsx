import ArrowIcon from "@/assets/icons/ArrowIcon";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import useApplyCoupon from "@/hooks/cartHooks/useApplyCoupon";
import useCartItems from "@/hooks/cartHooks/useCartItems";
import useCartQuantityUpdate from "@/hooks/cartHooks/useCartQuantityUpdate ";
import useDltCartItem from "@/hooks/cartHooks/useDeleteCartItem";
import { CircleX, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Cart = () => {
  const { removeItem, isDeleting } = useDltCartItem();
  const {
    incrementItem,
    decrementItem,
    isIncrementing,
    isDecrementing,
    incrementingId,
    decrementingId,
  } = useCartQuantityUpdate();
  const { data, isLoading } = useCartItems();
  const [cartItems, setCartItems] = useState([]);

  const [coupon, setCoupon] = useState("");

  const {
    mutateAsync: applyCouponAsync,
    isPending: isCouponLoading,
    isSuccess,
    error,
    data: couponData,
  } = useApplyCoupon();

  useEffect(() => {
    if (data) {
      setCartItems(data);
    }
  }, [data]);

  const handleIncrease = async (id) => {
    await incrementItem(id);
  };

  const handleDecrease = async (id) => {
    await decrementItem(id);
  };

  const handleDltCartItem = (id) => {
    removeItem(id);
  };

  const handleApplyCoupon = async () => {
    if (!coupon) return;

    try {
      const data = await applyCouponAsync(coupon);
      if (data?.status) {
        data.message === "Coupon applied successfully"
          ? toast.success(data.message)
          : toast.error(data.message);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to apply coupon");
    }
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = 0;
  const tax = subtotal * 0.1;
  const total = subtotal + tax - discount;

  if (isLoading || isDeleting) {
    return <LoadingComponent />;
  }

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Table */}
        <div className="bg-white p-4 sm:p-6 w-full lg:w-3/4 space-y-4 overflow-x-auto">
          <h3 className="text-xl sm:text-2xl text-textBlack">Cart Items</h3>

          {/* Table Header */}
          <div className="hidden md:grid grid-cols-[3fr_1fr_1fr_1fr] bg-[#06163A] text-white text-sm font-semibold px-4 py-4">
            <span className="mx-auto">Products</span>
            <span className="mx-auto">Price</span>
            <span className="mx-auto">Quantity</span>
            <span className="text-end">Sub-Total</span>
          </div>

          {/* Cart Items */}
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-[3fr_1fr_1fr_1fr] items-start md:items-center gap-4 border-t px-2 py-4 text-sm"
              >
                <div className="flex flex-col md:flex-row gap-4">
                  <div
                    onClick={() => !isDeleting && handleDltCartItem(item?.id)}
                    className={`self-start mt-5 mr-3 hover:text-primary cursor-pointer ${
                      isDeleting ? "opacity-50 pointer-events-none" : ""
                    }`}
                  >
                    <CircleX />
                  </div>

                  <div className="w-20 h-20">
                    <img
                      src={item.image}
                      alt="Product"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <p className="font-medium text-base sm:text-lg text-textBlack mb-2">
                  {item?.exclusive_seat_id ? item?.cover_color_name : item?.seat_type}
                    </p>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm text-textBlack">
                      {item.year && (
                        <div>
                          <p>Model Year</p>
                          <p className="text-[#EE3131]">{item.year}</p>
                        </div>
                      )}
                      {item.brand_name && (
                        <div>
                          <p>Car Make</p>
                          <p className="text-[#EE3131]">{item.brand_name}</p>
                        </div>
                      )}
                      {item.model_name && (
                        <div>
                          <p>Car Model</p>
                          <p className="text-[#EE3131]">{item.model_name}</p>
                        </div>
                      )}
                      {item.trim_name && (
                        <div>
                          <p>Trim Name</p>
                          <p className="text-[#EE3131]">{item.trim_name}</p>
                        </div>
                      )}
                      {item.cover_color_name && (
                        <div>
                          <p>Design/Color</p>
                          <p className="text-[#EE3131]">
                            {item.cover_color_name}
                          </p>
                        </div>
                      )}
                      {item.seat_type && (
                        <div>
                          <p>Number of Rows</p>
                          <p className="text-[#EE3131]">                  {item?.exclusive_seat_id ? item?.cover_color_name : item?.seat_type}
</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Price */}
                <span className="text-[#EE3131] text-base sm:text-xl font-semibold md:justify-self-center">
                  ${item.price}
                </span>

                {/* Quantity Counter */}
                <div className="flex justify-start md:justify-between items-center space-x-2 border w-fit border-textBlack text-xl">
                  <button
                    onClick={() => handleDecrease(item.id)}
                    className={`text-xl font-bold px-2 ${
                      isDecrementing && decrementingId === item.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-textBlack cursor-pointer"
                    } text-white`}
                    disabled={isDecrementing && decrementingId === item.id}
                  >
                    -
                  </button>
                  <span className="px-4">
                    {item.quantity.toString().padStart(2, "0")}
                  </span>
                  <button
                    onClick={() => handleIncrease(item.id)}
                    className={`text-xl font-bold px-2 ${
                      isIncrementing && incrementingId === item.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-textBlack cursor-pointer"
                    } text-white`}
                    disabled={isIncrementing && incrementingId === item.id}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <span className="text-[#EE3131] text-base sm:text-xl font-semibold md:justify-self-end">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-16 h-64">
              <ShoppingCart size={40} />
              <h3 className="text-textBlack text-5xl mt-4">
                No Data Available
              </h3>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        <div className="w-full lg:w-1/4 space-y-6">
          {/* Coupon Section */}
          <div className="bg-white border border-[#E4E7E9] rounded-md p-4 sm:p-6">
            <p className="font-medium text-lg text-textBlack mb-4">
              Coupon Code
            </p>
            <input
              type="text"
              placeholder="Code here..."
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="w-full border border-[#E4E7E9] px-4 py-3 rounded"
            />
            <button
              onClick={handleApplyCoupon}
              className={`${
                isCouponLoading || !coupon ? "bg-gray-300" : "bg-[#EE3131]"
              } cursor-pointer mt-4 w-full text-sm text-white py-2 font-bold rounded-md`}
              disabled={isCouponLoading || !coupon}
            >
              {isCouponLoading ? "Applying..." : "Apply Coupon"}
            </button>
          </div>

          {/* Totals */}
          <div className="bg-white border border-[#E4E7E9] rounded-md p-4 sm:p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span>Sub-total</span>
              <span className="text-red-500">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Discount</span>
              <span className="text-red-500">
                ${couponData?.discount ? couponData.discount : 0}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span className="text-red-500">${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-red-600">
                $
                {couponData?.total_amount
                  ? couponData.total_amount
                  : total.toFixed(2)}
              </span>
            </div>
            <Link to="/checkout">
              <div className="w-full mt-4">
                <button className="cursor-pointer flex justify-center items-center gap-2 w-full bg-[#EE3131] text-white font-bold py-3 rounded-md text-base">
                  Proceed to Checkout <ArrowIcon />
                </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
