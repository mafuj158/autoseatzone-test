import AuthContainer from "@/components/common/AuthContainer";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { useForm } from "react-hook-form";
import registerimg from "@/assets/images/registerbg.png";
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "@/components/loaders/LoadingComponent";
import { useAuth } from "@/providers/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { register: registerUser, isLoading } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      navigate("/verification", { state: { email: data.email } });
    } catch (error) {
      console.log(error);
    }
  };

  // Password match validation
  const validatePassword = (value) => {
    const password = watch("password");
    if (password !== value) {
      return "Passwords do not match";
    }
    return true;
  };

  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${registerimg})` }}
    >
      <div className="absolute inset-0 bg-[rgba(77,77,77,0.2)] backdrop-blur-[9px]"></div>
      <AuthContainer className="w-full max-w-[890px]">
        <AuthHeading title="Create An Account To Track Your Order & More" />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Full Name & Last Name Section */}
          <div className="grid grid-cols-2 gap-6">
            <CommonInputWrapper
              label="First Name"
              name="first_name"
              register={register}
              placeholder="Enter your first name"
              errors={errors}
              validationRules={{ required: "First name is required" }}
            />
            <CommonInputWrapper
              label="Last Name"
              name="last_name"
              register={register}
              placeholder="Enter your last name"
              errors={errors}
              validationRules={{ required: "Last name is required" }}
            />
          </div>

          {/* Email Section */}
          <CommonInputWrapper
            label="Email"
            type="email"
            name="email"
            register={register}
            placeholder="Enter your email"
            errors={errors}
            validationRules={{ required: "Email is required" }}
          />

          {/* Password & Confirm Password Section */}
          <div className="grid grid-cols-2 gap-6">
            <CommonInputWrapper
              label="Password"
              type="password"
              name="password"
              register={register}
              placeholder="******************"
              errors={errors}
              validationRules={{
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
            <CommonInputWrapper
              label="Confirm Password"
              type="password"
              name="password_confirmation"
              register={register}
              placeholder="******************"
              errors={errors}
              validationRules={{
                required: "Confirm Password is required",
                validate: validatePassword,
              }}
            />
          </div>

          {/* Checkbox */}
          {/* <div className="flex items-center mt-6">
            <input
              type="checkbox"
              className="form-checkbox text-blue-600 focus:outline-none rounded"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
            />
            <label className="ml-3 text-[#DADADA] text-sm">
              I hereby confirm and accept the Terms and Conditions and Privacy
              Policy.
            </label>
            {errors.terms && (
              <p className="mt-1 text-sm text-red-500">
                {errors.terms.message}
              </p>
            )}
          </div> */}

          <div className="mt-10">
            <p className="text-white mb-2 w-full mx-auto text-center">
              By continuing, you are agree to Auto Seat Zone's{" "}
              <span
                onClick={() => navigate("/terms-and-conditions")}
                className="underline cursor-pointer text-blue-500 hover:text-blue-400"
              >
                Terms & Conditions
              </span>{" "}
              ,{" "}
              <span
                onClick={() => navigate("/shipping-policy")}
                className="underline cursor-pointer text-blue-500 hover:text-blue-400"
              >
                Shipping Policy{" "}
              </span>{" "}
              and{" "}
              <span 
              onClick={() => navigate("/privacy-policy")}
              className="underline cursor-pointer text-blue-500 hover:text-blue-400">
                {" "}
                Privacy Policy
              </span>{" "}
              .
            </p>
            {/* Register Button */}
            <CommonBtn
              text={isLoading ? "Creating..." : "Create Account"}
              type="submit"
              className="w-full "
              disabled={isLoading}
            />
          </div>
        </form>
      </AuthContainer>
    </div>
  );
};

export default Register;
