import CopyIcon from "@/assets/icons/CopyIcon";
import FbIcon from "@/assets/icons/FbIcon";
import LinkedinIcon from "@/assets/icons/LinkedinIcon";
import XIcon from "@/assets/icons/XIcon";
import PinterestIcon from "@/assets/icons/PinterestIcon";
const RightSidebar = () => {
    return (
          <div className="lg:w-[340px] w-full shadow-md bg-white p-4 md:p-6 lg:p-8 rounded-lg lg:sticky lg:top-6 lg:self-start">
        {/* Table of Contents */}
        <h4 className="text-gray-900 font-medium text-lg mb-4">Table of Contents</h4>
        <ul className="list-none space-y-2">
          <li
            className="text-gray-600 hover:text-gray-900 cursor-pointer text-sm md:text-base"
            onClick={() => scrollToSection(popularRef)}
          >
            Popular Designs & Color Combinations
          </li>
          <li
            className="text-gray-600 hover:text-gray-900 cursor-pointer text-sm md:text-base"
            onClick={() => scrollToSection(customizeRef)}
          >
            Customize Your Look
          </li>
        </ul>

        {/* Share This Article */}
        <div className="mt-6 md:mt-10 p-4 md:p-5 bg-[#F9FAFB] rounded-lg">
          <h4 className="text-gray-900 font-medium text-lg mb-3 md:mb-4">Share This Article</h4>
          <div className="flex justify-center gap-3 md:gap-4 mt-2 border border-[#00000026] py-6 md:py-10 px-4 md:px-5 rounded-lg">
            <a href="#" className="bg-[#EAECF0] p-1.5 md:p-[5px] rounded-[13px] hover:bg-gray-300 transition">
              <CopyIcon  />
            </a>
            <a href="#" className="bg-[#EAECF0] p-1.5 md:p-[5px] rounded-[13px] hover:bg-gray-300 transition">
              <FbIcon  />
            </a>
            <a href="#" className="bg-[#EAECF0] p-1.5 md:p-[5px] rounded-[13px] hover:bg-gray-300 transition">
              <LinkedinIcon  />
            </a>
            <a href="#" className="bg-[#EAECF0] p-1.5 md:p-[5px] rounded-[13px] hover:bg-gray-300 transition">
              <XIcon />
            </a>
            <a href="#" className="bg-[#EAECF0] p-1.5 md:p-[5px] rounded-[13px] hover:bg-gray-300 transition">
              <PinterestIcon  />
            </a>
          </div>
        </div>

        {/* Was This Helpful Section */}
        <div className="mt-6 md:mt-10 p-4 md:p-5 bg-[#F9FAFB] rounded-lg">
          <h4 className="text-gray-900 font-medium text-lg mb-3 md:mb-4">Was This Helpful?</h4>
          <div className="flex flex-wrap gap-2 md:gap-4 ">
            <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 md:space-x-2 px-2 py-1 rounded hover:bg-gray-100">
              <span role="img" aria-label="happy">😊</span>
              <span className="text-sm md:text-base">Happy</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 md:space-x-2 px-2 py-1 rounded hover:bg-gray-100">
              <span role="img" aria-label="normal">😐</span>
              <span className="text-sm md:text-base">Normal</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900 flex items-center space-x-1 md:space-x-2 px-2 py-1 rounded hover:bg-gray-100">
              <span role="img" aria-label="sad">☹️</span>
              <span className="text-sm md:text-base">Sad</span>
            </button>
          </div>
        </div>
      </div>
    );
};

export default RightSidebar;