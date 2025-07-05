import { createContext, useContext, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "./AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { accessToken } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartTotals, setCartTotals] = useState(0);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [deletingItemId, setDeletingItemId] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [totalPrice, setTotalPrice] = useState(0);

  // Add to Cart Mutation
  const {
    mutateAsync: addToCart, // ✅ fix here
    isLoading: addToCartLoading,
    isPending: addToCartPending,
  } = useMutation({
    mutationFn: async ({ id, selected_trim }) => {
      console.log("vitore", selected_trim)
      const query = selected_trim
        ? `?selected_trim=${encodeURIComponent(selected_trim)}`
        : "";
      const response = await axiosSecure.post(`/add-to-cart/${id}${query}`);
      return response?.data;
    },

    onSuccess: (response) => {
      toast.success(response?.message || "Product added to cart");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add product to cart"
      );
      console.error("Error adding cart item:", error);
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartDiscount,
        cartTotals,
        deletingItemId,
        addToCart,
        totalPrice,
        addToCartLoading,
        addToCartPending,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartProvider;
