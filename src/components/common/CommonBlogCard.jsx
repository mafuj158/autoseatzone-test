import DOMPurify from "dompurify";
import { useState } from "react";
import { Link } from "react-router-dom";
import authorimg from "@/assets/images/authorimg.png";
const CommonBlogCard = ({
  img,
  title,
  slug,
  desc,
  authorImg,
  authorName,
  date,
  id,
}) => {
  const [expanded, setExpanded] = useState(null);
  const sanitizedDesc = DOMPurify.sanitize(desc);
  const previewLength = 150;
  const previewDesc =
    sanitizedDesc.length > previewLength
      ? sanitizedDesc.slice(0, previewLength) + ""
      : sanitizedDesc;

  return (
    <div className="rounded-[20px] flex flex-col justify-between overflow-hidden gap-5 border border-[#2B5590] bg-[#0A192F] text-white lg:h-[700px]">
      <img src={img} alt="Blog" className="rounded-[10px]  h-[250px]" />
      <div className="py-4 lg:py-2  xl:py-[30px] px-5">
        <h3 className="text-xl xl:text-[26px] font-pridi font-semibold">
          {title}
        </h3>
        <p
          className="font-dmsans text-sm xl:text-[22px] mt-5"
          dangerouslySetInnerHTML={{
            __html: expanded === id ? sanitizedDesc : previewDesc,
          }}
        />
        <Link
          to={`/blog-details/${slug}`}
          className=" text-sm xl:text-lg font-semibold text-[#4C8DDD]"
        >
          {expanded === id ? "Read Less" : "Read More..."}
        </Link>
        <div className="border border-[#ffffff1a] mb-8 mt-6"></div>
        <div className="flex items-center gap-3 mt-5">
          <img
            src={authorimg}
            alt="Author"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold">{authorName}</p>
            <p className="text-sm text-gray-300">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonBlogCard;
