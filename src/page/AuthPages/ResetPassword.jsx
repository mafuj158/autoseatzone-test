import AuthContainer from "@/components/common/AuthContainer";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { useForm } from "react-hook-form";
import resetimg from '@/assets/images/contactbg.png';
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";

const ResetPassword = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const validatePassword = (value) => {
        const password = watch('newPassword');
        return password === value || "Passwords do not match";
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div
            className="relative xl:min-h-screen flex justify-center items-center bg-cover bg-center "
            style={{ backgroundImage: `url(${resetimg})` }}
        >
            <div className="absolute inset-0 bg-[rgba(77,77,77,0.2)] backdrop-blur-[9px]"></div>
            <AuthContainer className="w-full xl:max-w-[790px]">
                <AuthHeading title="Reset Your Password" description="Enter a new password to continue using your account." />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <CommonInputWrapper
                        label="New Password"
                        type="password"
                        register_as="newPassword"
                        register={register}
                        placeholder="******************"
                        errors={errors}
                        validationRules={{ required: "New password is required" }}
                    />
                    <CommonInputWrapper
                        label="Confirm New Password"
                        type="password"
                        register_as="confirmNewPassword"
                        register={register}
                        placeholder="******************"
                        errors={errors}
                        validationRules={{
                            required: "Confirm password is required",
                            validate: validatePassword
                        }}
                    />
                    <CommonBtn text="Reset Password" type="submit" className="w-full mt-6">Reset Password</CommonBtn>
                </form>
            </AuthContainer>
        </div>
    );
};

export default ResetPassword;
