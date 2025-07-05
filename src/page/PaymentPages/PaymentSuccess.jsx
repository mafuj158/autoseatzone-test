import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="py-20 flex min-h-screen items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
        <p className="text-gray-700 mb-6">
          Thank you for your order. Your payment was processed successfully.
        </p>
        <Link
          to="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
