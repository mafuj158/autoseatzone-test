import { Link } from "react-router-dom";
import Loader from "@/components/common/Loader";
import { cn } from "@/lib/utils";

const CommonSubmitBtn = ({
  children,
  type = "submit",
  link = false,
  className,
  path = "",
  isLoading = false,
  onclick,
}) => {
  return (
    <>
      {link ? (
        <Link to={path} className={cn("w-full rounded-[10px] cursor-pointer text-white text-xl font-medium text-center p-3  flex justify-center items-center common_gradient_bg", className)}  >
          {children}
        </Link>
      ) : (
        <button
          type={type}
          onClick={onclick}
          className={cn("w-full text-xl rounded-[10px] text-white font-medium cursor-pointer text-center p-3  flex justify-center items-center common_gradient_bg ", className)}
        >
          {isLoading ? <Loader size={28} color="white" speed={1} /> : children}
        </button>
      )}
    </>
  );
};

export default CommonSubmitBtn;
