import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select, Spin, message } from "antd";
import certified from "@/assets/images/certified.png";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import coverimg from "@/assets/images/blogimg.png";
import toast from "react-hot-toast";
import { useCart } from "@/providers/CartProvider";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Configure = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [selections, setSelections] = useState({
    year: null,
    brand_name: null,
    model_name: null,
    trim_name: null,
    color_name: null,
    seat_type_name: null,
  });

  useEffect(() => {
    const savedSelections = localStorage.getItem("configureSelections");
    if (savedSelections) {
      const parsed = JSON.parse(savedSelections);
      setSelections(parsed);
      mutate(parsed); // trigger fetching dependent data
    }
  }, []);

  const [productId, setProductId] = useState(null);

  const { addToCart, addToCartLoading, addToCartPending } = useCart();

  const [options, setOptions] = useState({
    year: [],
    brand_name: [],
    model_name: [],
    trim_name: [],
    color_name: [],
    seat_type_name: [],
  });

  const [productDetails, setProductDetails] = useState({
    price: null,
    stock: null,
    seatType: null,
  });

  const [openStates, setOpenStates] = useState({
    year: false,
    brand_name: false,
    model_name: false,
    trim_name: false,
    color_name: false,
    seat_type_name: false,
  });

  const [productImage, setProductImage] = useState(coverimg);
  const [colorOptions, setColorOptions] = useState([]);

  const axiosPublic = useAxiosPublic();

  // Fetch years initially
  useQuery({
    queryKey: ["years"],
    queryFn: async () => {
      const res = await axiosPublic.get("/year");
      if (!res.data.status) throw new Error("Failed to fetch years");
      const years = res.data.data.map((item) => item.year);
      setOptions((prev) => ({ ...prev, year: years }));
      return years;
    },
  });

  // Fetch data based on selections
  const { mutate, isLoading } = useMutation({
    mutationFn: async (currentSelections) => {
      const params = new URLSearchParams();
      Object.entries(currentSelections).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });
      const res = await axiosPublic.post(
        `/product-filter?${params.toString()}`
      );
      if (!res.data.status) throw new Error("Failed to fetch data");
      return res.data;
    },
    onSuccess: (data, variables) => {
      const updatedOptions = { ...options };
      const lastSelectedKey = Object.keys(selections).findLast(
        (key) => selections[key] !== null
      );

      const requiredFields = { ...selections };
      delete requiredFields.trim_name;

      const allSelected = Object.values(requiredFields).every(
        (val) => val !== null
      );

      if (allSelected) {
        setProductDetails({
          price: data.data.price,
          stock: data.data.stock,
          seatType: data.data.seat_type_name,
        });
        setProductId(data.data.id);
        return;
      }

      if (
        lastSelectedKey === "model_name" &&
        data.data.trims &&
        data.data.cover_colors
      ) {
        // Handle trims and colors
        updatedOptions.trim_name = data.data.trims.map(
          (item) => item.trim_name
        );

        const uniqueColors = [];
        const seen = new Set();
        data.data.cover_colors.forEach((item) => {
          if (item.color_name && item.image && !seen.has(item.color_name)) {
            uniqueColors.push({
              color_name: item.color_name,
              image: item.image,
            });
            seen.add(item.color_name);
          }
        });

        setColorOptions(uniqueColors);
        updatedOptions.color_name = uniqueColors.map((c) => c.color_name);
      } else if (lastSelectedKey === "color_name") {
        // ✅ Handle seat types fetched from color selection
        if (Array.isArray(data.data)) {
          updatedOptions.seat_type_name = data.data
            .map((item) => item.seat_type_name)
            .filter(Boolean);
        } else if (Array.isArray(data.data.seat_types)) {
          updatedOptions.seat_type_name = data.data.seat_types
            .map((item) => item.seat_type_name)
            .filter(Boolean);
        }
      } else {
        // Generic fallback logic
        if (!lastSelectedKey || lastSelectedKey === "year") {
          updatedOptions.brand_name = [
            ...new Set(
              data.data.map((item) => item.brand_name).filter(Boolean)
            ),
          ];
        }
        if (
          !lastSelectedKey ||
          ["year", "brand_name"].includes(lastSelectedKey)
        ) {
          updatedOptions.model_name = [
            ...new Set(
              data.data.map((item) => item.model_name).filter(Boolean)
            ),
          ];
        }
        if (
          !lastSelectedKey ||
          ["year", "brand_name", "model_name"].includes(lastSelectedKey)
        ) {
          updatedOptions.trim_name = [
            ...new Set(data.data.map((item) => item.trim_name).filter(Boolean)),
          ];
        }
        if (
          !lastSelectedKey ||
          ["year", "brand_name", "model_name", "trim_name"].includes(
            lastSelectedKey
          )
        ) {
          const uniqueColors = [];
          const seen = new Set();
          data.data.forEach((item) => {
            if (item.color_name && item.image && !seen.has(item.color_name)) {
              uniqueColors.push({
                color_name: item.color_name,
                image: item.image,
              });
              seen.add(item.color_name);
            }
          });
          setColorOptions(uniqueColors);
          updatedOptions.color_name = uniqueColors.map(
            (color) => color.color_name
          );
        }
      }

      setOptions(updatedOptions);

      // Update image if color is selected
      if (selections.color_name) {
        const selectedColor = colorOptions.find(
          (color) => color.color_name === selections.color_name
        );
        if (selectedColor) {
          setProductImage(selectedColor.image);
        }
      }
    },
    onError: (error) => {
      message.error(error.message || "Failed to fetch data");
    },
  });

  const handleChange = (key, value) => {
    const newSelections = { ...selections };

    // Reset all subsequent selections
    let reset = false;
    Object.keys(newSelections).forEach((k) => {
      if (reset) newSelections[k] = null;
      if (k === key) {
        newSelections[k] = value;
        reset = true;
      }
    });

    setSelections(newSelections);
    localStorage.setItem("configureSelections", JSON.stringify(newSelections));
    setProductDetails({ price: null, stock: null, seatType: null });

    setOpenStates((prev) => ({ ...prev, [key]: false }));

    const keys = Object.keys(selections);
    const currentIndex = keys.indexOf(key);
    if (currentIndex >= 0 && currentIndex < keys.length - 1) {
      const nextKey = keys[currentIndex + 1];
      setTimeout(() => {
        setOpenStates((prev) => ({ ...prev, [nextKey]: true }));
      }, 100);
    }

    if (key === "color_name") {
      if (value === null) {
        setProductImage(coverimg);
      } else {
        const selectedColor = colorOptions.find(
          (color) => color.color_name === value
        );
        if (selectedColor) {
          setProductImage(selectedColor.image);
        }
      }
      mutate(newSelections);
      return;
    }

    if (value !== null) {
      mutate(newSelections);
    }
  };

  const selectConfigs = [
    { key: "year", label: "Year", placeholder: "Select Year" },
    { key: "brand_name", label: "Brand", placeholder: "Select Brand" },
    { key: "model_name", label: "Model", placeholder: "Select Model" },
    { key: "trim_name", label: "Trim", placeholder: "Select Trim" },
    { key: "color_name", label: "Color", placeholder: "Select Color" },
    {
      key: "seat_type_name",
      label: "Number of Rows",
      placeholder: "Select number of rows",
    },
  ];

  const getDisabledState = (key) => {
    switch (key) {
      case "year":
        return false;
      case "brand_name":
        return !selections.year;
      case "model_name":
        return !selections.brand_name;
      case "trim_name":
      case "color_name":
        return !selections.model_name;
      case "seat_type_name":
        return !selections.color_name;
      default:
        return true;
    }
  };

  const getOptionsForSelect = (key) => {
    if (key === "color_name") {
      return colorOptions.map((color) => ({
        value: color.color_name,
        label: color.color_name,
      }));
    }
    return options[key].map((option) => ({
      value: option,
      label: option,
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("User is not logged in");
      navigate("/login");
      return;
    }

    if (!productId) {
      toast.error("Product ID is missing");
      return;
    }

    try {
      const selectedTrimName = selections.trim_name || "Not Known";

      await addToCart({ id: productId, selected_trim: selectedTrimName });
      localStorage.removeItem("configureSelections"); // clear cache
      navigate("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className=" mx-auto px-0 md:px-4 py-2 xl:py-10 flex flex-col lg:flex-row gap-4 xl:gap-8 overflow-x-hidden ">
      {/* Image Section */}
      <div className="w-full lg:w-[769px] h-[200px] md:h-[300px] lg:h-[621px]">
        <img
          src={productImage}
          alt="Car Seat Cover"
          className="rounded-xl w-full h-full object-cover"
        />
      </div>

      {/* Form + Info Section */}
      <div className="w-full  lg:w-1/2 rounded-xl xl:px-[30px]">
        <h2 className="text-center text-xl lg:text-2xl xl:text-[28px] font-medium xl:leading-[42px] mb-2 xl:mb-3 text-[#232323]">
          Vehicle And Design Configurator
        </h2>
        <p className="text-center text-xs xl:text-base text-gray-500 mb-4 xl:mb-6">
          Choose year, brand, model, trim, color, and seat options to customize
          your vehicle.
        </p>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2   md:gap-x-[15px] lg:gap-x-0  gap-y-4 xl:gap-y-[30px] mb-6 ">
              {selectConfigs.map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col xl:gap-2  mx-auto ">
                  <label className="text-sm text-[#969696] selectLabel">
                    {label}
                  </label>
                  <Select
                    open={openStates[key]}
                    onDropdownVisibleChange={(visible) =>
                      setOpenStates((prev) => ({ ...prev, [key]: visible }))
                    }
                    className="customSelect "
                    size="large"
                    value={selections[key]}
                    onChange={(value) => handleChange(key, value)}
                    style={{ width: "100%" }}
                    disabled={getDisabledState(key)}
                    loading={isLoading}
                    options={getOptionsForSelect(key)}
                    showSearch
                    optionFilterProp="label"
                    allowClear
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>

            {productDetails.price && (
              <div className="text-center mb-2 xl:mb-5 xl:mt-10">
                <div className="flex flex-col gap-2">
                  <div className="text-lg md:text-xl lg:text-2xl xl:text-[28px] font-medium">
                    Price: ${productDetails.price}
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              className={`cursor-pointer  w-full bg-red-600 text-white py-3 rounded-lg text-lg hover:bg-red-700 transition ${
                !productDetails.price ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={
                !productDetails.price || addToCartLoading || addToCartPending
              }
            >
              {addToCartLoading || addToCartPending ? "Adding..." : "Buy Now"}
            </button>

            <div className="w-[300px] h-[63px] mt-7 mx-auto">
              <img src={certified} alt="certified" className="w-full h-full" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Configure;
