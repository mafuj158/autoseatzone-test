import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/AuthProvider";
import AuthContainer from "@/components/common/AuthContainer";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import loginimg from "@/assets/images/loginbg.png";
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";
import Password from "antd/es/input/Password";

const Login = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "sagorwdpf@gmail.com",
      password: "12345678",
    },
    mode: "onSubmit",
  });
  // const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      await login(data);
        window.location.href = "/product/custom-fit-leather-seat-covers"; // forces hard reload
      // navigate("/product/custom-fit-leather-seat-covers");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${loginimg})` }}
    >
      <div className="absolute inset-0 bg-[rgba(77,77,77,0.2)] backdrop-blur-[9px]"></div>
      <AuthContainer className="w-full max-w-md lg:max-w-[790px]">
        <AuthHeading
          title="Login To Continue"
          description={
            <>
              Don&rsquo;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-blue-300 transition-colors underline"
              >
                Create Account
              </Link>
            </>
          }
        />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CommonInputWrapper
            label="Email"
            type="email"
            name="email"
            register={register}
            placeholder="Enter your email"
            errors={errors}
            validationRules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

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
                message: "Password must be at least 8 characters",
              },
            }}
          />

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember-me"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                {...register("remember")}
              />
              <label htmlFor="remember-me" className="ml-2 text-sm text-white">
                Remember me
              </label>
            </div>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              Forgot Password?
            </Link>
          </div>
          <CommonBtn
            text={isLoading ? "Loggin in...." : "Login"}
            type="submit"
            className="w-full mt-6"
            disabled={isLoading || !isValid}
          />
        </form>
      </AuthContainer>
    </div>
  );
};

export default Login;
