import axios from "axios";
import toast from "react-hot-toast";

const useAxiosSecure = () => {
  const accessToken = localStorage.getItem("accessToken");

  const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        const status = error.response.status;

        if (status === 401 || status === 403) {
          localStorage.removeItem("accessToken");
          toast.error("Session expired. Please log in again.");
          window.location.href = "/"; // ✅ এটি সবার জন্য safe
        } else if (status === 500) {
          toast.error("Internal server error, please try again later.");
        }
      } else if (error.request) {
        toast.error("Network issue, try again.");
      } else {
        toast.error("Request failed.");
      }

      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
