import CommonWrapper from "../common/CommonWrapper";
import blogimg from "@/assets/images/blogimg.png";
import dummyuser from "@/assets/images/dummyuser.png";
import useGetCmsData from "@/hooks/useGetCmsData";
import { useNavigate } from "react-router-dom";

const SingleBlogSection = () => {
  const navigate = useNavigate();
  const { data } = useGetCmsData("/latest-projects");

  const singleBlog = data?.projects[0];

  return (
    <CommonWrapper version="lg">
      <div className="xl:max-w-[1520px]  w-full mx-auto flex flex-col xl:flex-row items-center justify-between mt-12 xl:mt-[100px]">
        {/* Left side: Curved background with content */}
        <div className="w-full relative">
          {/* SVG background container */}
          <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[507px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 860 507"
              preserveAspectRatio="none"
              className="absolute inset-0"
            >
              {/* Background shape with gradient fill */}
              <path
                d="M860 0V462.101V507H0V44.6961L46.4805 0H860Z"
                fill="url(#bgGradient)"
              />
              {/* Border with gradient */}
              <path
                d="M859.5 0.5V462.101V506.5H0.5V44.9089L46.6819 0.5H859.5Z"
                stroke="url(#borderGradient)"
                strokeOpacity="0.5"
                fill="#06163A"
              />
              <defs>
                {/* Background gradient */}
                <linearGradient
                  id="bgGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#1E1E2D" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#2D2D42" stopOpacity="0.9" />
                </linearGradient>
                {/* Border gradient */}
                <linearGradient
                  id="borderGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#5433FF" />
                  <stop offset="50%" stopColor="#20BDFF" />
                  <stop offset="100%" stopColor="#A5FECB" />
                </linearGradient>
              </defs>
            </svg>

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col xl:justify-between">
              <div>
                <h3 className="text-base sm:text-xl md:text-2xl lg:text-[32px] font-medium text-white">
                  {singleBlog?.title}
                </h3>
                <p className="text-xs sm:text-base md:text-lg lg:text-xl leading-[1.5] lg:leading-[30px] text-white opacity-70 mt-4 sm:mt-5 md:mt-6 lg:mt-[30px]">
                  {singleBlog?.description}{" "}
                  <span
                    onClick={() => navigate("/latest-blog-details")}
                    className="underline text-primary hover:cursor-pointer"
                  >
                    {" "}
                    Read More
                  </span>
                </p>
              </div>

              <div>
                <div className="w-full h-px bg-gradient-to-r from-[rgba(204,186,186,0.30)] via-[rgba(92,199,255,0.30)] to-[rgba(92,199,255,0.30)] my-4 sm:my-6 md:my-8 lg:my-10"></div>

                <div className="flex items-center gap-3">
                  <div>
                    <img
                      src={singleBlog?.admin_avatar || dummyuser}
                      alt="Author"
                      className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full "
                    />
                  </div>
                  <div className="text-white">
                    <p className="font-semibold text-sm sm:text-base">
                      Jahid Bhuiya
                    </p>
                    <p className="text-xs sm:text-sm">August 2, 2021</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side: Blog image */}
        <div className="w-full mt-6 xl:mt-0">
          <div className="w-full  h-full xl:h-[507px] aspect-w-4 aspect-h-3">
            <img
              src={blogimg}
              alt="Blog"
              className="w-full h-full object-cover border-2 "
            />
          </div>
        </div>
      </div>
    </CommonWrapper>
  );
};

export default SingleBlogSection;
