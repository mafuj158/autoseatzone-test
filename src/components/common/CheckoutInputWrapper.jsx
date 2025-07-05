const CheckoutInputWrapper = ({
  label,
  name,
  register,
  type = "text",
  placeholder,
  defaultValue="",
  error,
  ...rest
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label
          htmlFor={name}
          className="text-base sm:text-lg md:text-lg mb-2 opacity-80 font-medium text-textBlack"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className={`w-full py-2 sm:py-3 px-4 sm:px-8 border text-base sm:text-lg md:text-xl leading-7 sm:leading-9 rounded-lg focus:outline-none ${
          error
            ? "border-red-500 placeholder:text-red-400"
            : "border-[#AECBDF] placeholder:text-[#00000040]"
        }`}
        {...register}
        {...rest}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default CheckoutInputWrapper;
