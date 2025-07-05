import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import toast from "react-hot-toast";
import AuthContainer from "@/components/common/AuthContainer";
import codeimg from '@/assets/images/forgetbg.png';
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";
import { Input } from 'antd';

const VerificationCode = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(25);
  const [canResend, setCanResend] = useState(false);

  // Get email from location state or fallback
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email in state, redirect back or handle appropriately
      toast.error("Email address not found");
      navigate('/register');
    }
  }, [location.state, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const verifyCode = async ({ email, otp }) => {
    const res = await axiosPublic.post('/verify-email', { email, otp });
    return res.data;
  };

  const resendCode = async () => {
    try {
      await axiosPublic.post('/resend-verification', { email });
      toast.success('Verification code resent!');
      setCountdown(25);
      setCanResend(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to resend code');
    }
  };

  const verifyMutation = useMutation({
    mutationFn: verifyCode,
    onSuccess: (data) => {
      toast.success('Verified Successfully!');
      navigate('/login');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to verify!');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 5) {
      toast.error("Please enter all 5 digits");
      return;
    }

    if (!email) {
      toast.error("Email not found");
      return;
    }

    verifyMutation.mutate({ email, otp });
  };

  if (!email) {
    return null; // or a loading spinner while checking for email
  }

  return (
    <div
      className="min-h-screen flex justify-center py-20 bg-cover bg-center"
      style={{ backgroundImage: `url(${codeimg})` }}
    >
      <AuthContainer className="w-full max-w-[790px]">
        <AuthHeading
          title="Confirm Code"
          description={`Enter the confirmation code sent to your email address: ${email}`}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center">
            <Input.OTP
              length={5}
              value={otp}
              onChange={setOtp}
              inputType="numeric"
              className="justify-center"
            />
          </div>

          <CommonBtn
            text={verifyMutation.isPending ? "Verifying..." : "Continue"}
            type="submit"
            className="w-full mt-6"
            disabled={verifyMutation.isPending}
          />

          <p className="text-center font-medium mt-6 text-white">
            {!canResend ? (
              `Didn't receive the code? Resend in ${countdown} seconds`
            ) : (
              <span 
                className="underline cursor-pointer font-semibold"
                onClick={resendCode}
              >
                Resend Code
              </span>
            )}
          </p>
        </form>
      </AuthContainer>
    </div>
  );
};

export default VerificationCode;