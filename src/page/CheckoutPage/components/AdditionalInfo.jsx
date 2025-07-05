import React from 'react';

const AdditionalInfo = () => {
    return (
        <div>
            <div className="bg-white border border-[#E4E7E9] py-5 px-5 xl:px-[50px] rounded-lg">
            <h2 className="text-xl font-medium text-textBlack mb-4">
              Additional Information
            </h2>

            <textarea
              placeholder="Order Note (Optional)"
              className="w-full py-[22px] xl:h-[224px] px-[46px] border placeholder:text-[#00000040] text-lg xl:text-2xl leading-9 border-[#AECBDF] rounded-lg  focus:outline-none"
            />

            <label className="flex items-center gap-3 xl:gap-6 mt-5">
              <input
                type="checkbox"
                className="w-4 h-4 xl:w-6 xl:h-6 border-2 border-red-500 accent-red-500 rounded"
              />
              <span className="lg:text-xl text-textBlack leading-9">
                Send me order updates. (Optional)
              </span>
            </label>
          </div>
        </div>
    );
};

export default AdditionalInfo;