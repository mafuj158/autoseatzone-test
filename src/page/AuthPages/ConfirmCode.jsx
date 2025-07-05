import AuthContainer from "@/components/common/AuthContainer";
import CommonInputWrapper from "@/components/common/CommonInputWrapper";
import { useForm } from "react-hook-form";
import confirmimg from '@/assets/images/registerbg.png';
import AuthHeading from "@/components/common/AuthHeading";
import CommonBtn from "@/components/common/CommonBtn";

const ConfirmCode = () => {
    const { register, handleSubmit, setFocus, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const code = Object.values(data).join('');
        console.log("Entered Code:", code);
    };

    return (
        <div
            className="relative min-h-screen flex justify-center items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${confirmimg})` }}
        >
            <div className="absolute inset-0 bg-[rgba(77,77,77,0.2)] backdrop-blur-[9px]"></div>
            <AuthContainer className="w-full max-w-[790px]">
                <AuthHeading
                    title="Confirm Code"
                    description="Enter the confirmation code sent to your email address: abcdef@gmail.com"
                />
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex justify-between max-w-[300px] mx-auto">
                        {[1, 2, 3, 4, 5].map((_, index) => (
                            <input
                                key={index}
                                {...register(`digit${index + 1}`, { required: "Required" })}
                                type="text"
                                maxLength="1"
                                className="w-12 h-12 text-center text-lg border text-white border-gray-300 rounded focus:outline-none"
                                onInput={(e) => {
                                    const value = e.target.value;
                                    if (value.length === 1 && index < 4) {
                                        setFocus(`digit${index + 2}`);
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <CommonBtn text="Continue" type="submit" className="w-full mt-6">Confirm</CommonBtn>
                    <p className="text-center font-medium mt-6 text-white">
                        Didn’t receive the code? <span className="underline cursor-pointer font-semibold">Resend </span> in 25 seconds
                    </p>
                </form>
            </AuthContainer>
        </div>
    );
};

export default ConfirmCode;
