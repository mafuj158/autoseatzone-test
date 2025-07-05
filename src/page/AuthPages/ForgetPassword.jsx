import AuthContainer from "@/components/common/AuthContainer";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { useForm } from "react-hook-form";
import forgetimg from '@/assets/images/forgetbg.png';
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${forgetimg})` }}
        >
             <div className="absolute inset-0 bg-[rgba(77,77,77,0.2)] backdrop-blur-[9px]"></div>
            <AuthContainer className="w-full max-w-[790px]">
                <AuthHeading title="Recover your Password" description='Please provide your registered email address to receive a password reset code.' />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <CommonInputWrapper
                        label="Email Address"
                        type="email"
                        register_as="email"
                        register={register}
                        placeholder="Enter your registered email"
                        errors={errors}
                        validationRules={{ required: "Email is required" }}
                    />
                    <CommonBtn text="Send Code" type="submit" className="w-full mt-6"></CommonBtn>
                </form>
            </AuthContainer>
        </div>
    );
};

export default ForgetPassword;
