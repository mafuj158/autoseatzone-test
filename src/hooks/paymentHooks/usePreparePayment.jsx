import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../useAxiosSecure';
import toast from 'react-hot-toast';

const usePreparePayment = () => {
  const axiosSecure = useAxiosSecure();

  const preparePayment = async (paymentData) => {
    try {
      const response = await axiosSecure.post('/prepare-payment', paymentData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Ensure proper content type for FormData
        }
      });
      return response.data;
    } catch (error) {
      // Extract error message from response if available
      const errorMessage = error.response?.data?.message || error.message;
      throw new Error(errorMessage); // Throw error to be caught in onError
    }
  };

  return useMutation({
    mutationFn: preparePayment,
    onSuccess: (data) => {
      toast.success('Payment prepared successfully!');
      // Handle successful payment preparation
      if (data.data) {
        window.location.href = data.data; // Redirect if URL provided
      }
      // Add any additional success handling here
    },
    onError: (error) => {
      console.error('Payment preparation failed:', error);
      toast.error(`Payment failed: ${error.message}`);
      // Add any additional error handling here
    }
  });
};

export default usePreparePayment;