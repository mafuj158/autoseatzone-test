import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const MollieCardForm = () => {
  // 🔒 Refs to store Mollie instance and each component reference
  const mollieRef = useRef(null);
  const componentsRef = useRef({});
  const cardHolderRef = useRef(null);
  const cardNumberRef = useRef(null);
  const expiryDateRef = useRef(null);
  const cvcRef = useRef(null);
  const mountedRef = useRef(false); // 🚫 Prevent duplicate mounting
  const [isReady, setIsReady] = useState(false); // ✅ UI readiness state
  const [isSubmitting, setIsSubmitting] = useState(false); // 🕐 Submission state
  const axiosSecure = useAxiosSecure(); // 🔐 Custom hook for secure Axios instance

  // 📦 Load Mollie.js and initialize the card form components
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.mollie.com/v1/mollie.js";
    script.async = true;

    script.onload = () => {
      // 🛑 Avoid remounting or proceeding if Mollie is unavailable
      if (!window.Mollie || mountedRef.current) return;
      mountedRef.current = true;

      // ⚙️ Create Mollie instance
      const mollie = window.Mollie(`${import.meta.env.VITE_MOLLIE_PROFILE_KEY}`, {
        locale: "en_US",
        testmode: true,
      });
      mollieRef.current = mollie;

      // 🧱 Mount input components
      const mountComponents = () => {
        const cardHolder = mollie.createComponent("cardHolder");
        const cardNumber = mollie.createComponent("cardNumber");
        const expiryDate = mollie.createComponent("expiryDate");
        const verificationCode = mollie.createComponent("verificationCode");

        cardHolder.mount(cardHolderRef.current);
        cardNumber.mount(cardNumberRef.current);
        expiryDate.mount(expiryDateRef.current);
        verificationCode.mount(cvcRef.current);

        componentsRef.current = {
          cardHolder,
          cardNumber,
          expiryDate,
          verificationCode,
        };

        // 🎧 Listen for validation errors on each component
        const addListeners = (component, name) => {
          component.addEventListener("change", (e) => {
            if (e.error && e.touched) {
              console.error(`${name} error:`, e.error);
            }
          });
        };

        addListeners(cardHolder, "Card Holder");
        addListeners(cardNumber, "Card Number");
        addListeners(expiryDate, "Expiry Date");
        addListeners(verificationCode, "CVC");

        setIsReady(true); // ✅ Enable submit button
      };

      // ⏱ Slight delay ensures all DOM refs are rendered
      setTimeout(mountComponents, 100);
    };
    script.onerror = () => {
      console.error("❌ Failed to load Mollie.js");
    };
    // ➕ Append Mollie script to body
    document.body.appendChild(script);

    // 🧹 Cleanup on unmount
    return () => {
      Object.values(componentsRef.current).forEach((comp) => {
        try {
          comp.unmount();
        } catch (err) {
          console.warn("Failed to unmount:", err);
        }
      });
      document.body.removeChild(script);
      mountedRef.current = false;
    };
  }, []);

  // 💳 Backend payment mutation using React Query
  const paymentMutation = useMutation({
    mutationKey: ["payment"],
    mutationFn: async (token) => {
      const response = await axiosSecure.post("/prepare-payment", { cardToken: token });
      return response?.data;
    },
    onSuccess: (response) => {
      console.log(response);
      toast.success(response?.message)
      setIsSubmitting(false); // ✅ Reset submission state
    },
    onError: (error) => {
      console.log(error);
      toast.success(error?.response?.data?.message || "Error completing payment")
      setIsSubmitting(false); // ❌ Handle error state
    },
  });

  // 📤 Submit card details to backend after generating a token
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mollieRef.current) {
      alert("Mollie is not initialized yet.");
      return;
    }

    setIsSubmitting(true);

    const { token, error } = await mollieRef.current.createToken();
    if (error) {
      alert("Error creating token: " + error.message);
      console.error(error);
      setIsSubmitting(false);
      return;
    }

    console.log("✅ Mollie Token:", token);
    paymentMutation.mutate(token); // 🚀 Send token to backend
  };

  // 🖼️ UI form with mounted Mollie card components
  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px", margin: "auto" }}>
      <div ref={cardHolderRef} style={fieldStyle} />
      <div ref={cardNumberRef} style={fieldStyle} />
      <div style={{ display: "flex", gap: "4%" }}>
        <div ref={expiryDateRef} style={{ ...fieldStyle, flex: 1 }} />
        <div ref={cvcRef} style={{ ...fieldStyle, flex: 1 }} />
      </div>
      <button
        type="submit"
        disabled={!isReady || isSubmitting}
        style={{
          padding: "10px 20px",
          marginTop: 20,
          backgroundColor: isReady ? "#EE3131" : "#ccc",
          color: "white",
          border: "none",
          borderRadius: 5,
          cursor: isReady ? "pointer" : "not-allowed",
          width: "100%",
        }}
      >
        {isSubmitting ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

// 💅 Shared styles for Mollie input containers
const fieldStyle = {
  marginBottom: 12,
  border: "1px solid #ccc",
  padding: 8,
  borderRadius: 4,
  minHeight: 42,
};

export default MollieCardForm;
