import { OctagonX } from 'lucide-react';
import { Link } from 'react-router-dom';


const PaymentError = () => {
    return (
         <div className="py-20 flex min-h-screen items-center justify-center bg-red-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
       <OctagonX className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Unsucessful!</h2>
        <p className="text-gray-700 mb-6">
         Something Went Wrong! Payment Failed.
        </p>
        <Link
          to="/"
          className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-md transition"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
    );
};

export default PaymentError;