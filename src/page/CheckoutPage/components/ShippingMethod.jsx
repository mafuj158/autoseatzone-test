import React from 'react';

const ShippingMethod = () => {
    return (
        <div>
            <div className="bg-white border border-[#E4E7E9] py-5 px-[50px] rounded-lg">
                        <h2 className="text-xl font-medium text-textBlack mb-4">Shipping Method</h2>
                        <div className="flex gap-3 xl:gap-5 items-center text-textBlack xl:text-2xl xl:leading-9">
                            <div className="w-4 h-4 xl:w-9 xl:h-9">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37 37" fill="none">
                                    <circle cx="18.5" cy="18.5" r="18" stroke="black" stroke-opacity="0.25" />
                                </svg>
                            </div>
                            <p className="">Expedited Shipping</p>
                        </div>
                    </div>
        </div>
    );
};

export default ShippingMethod;