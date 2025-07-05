const AuthHeading = ({ title, description }) => {
    return (
        <div className="text-center mb-6 lg:mb-10 text-white">
            <h2 className="text-2xl lg:text-4xl xl:text-[40px] font-semibold leading-10">{title}</h2>
            {description && (
                <p className="lg:max-w-[392px] text-sm mx-auto mt-1 lg:mt-[10px] md:text-lg font-medium leading-[30px]">{description}</p>
            )}
        </div>
    );
};

export default AuthHeading;
