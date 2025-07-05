import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaFolder } from "react-icons/fa";

const HelpCenterSidebar = ({
  onNavLinkClick = () => {},
  helpArticles = [],
}) => {
  const [openCategory, setOpenCategory] = useState(1); // default open section
  const navigate = useNavigate();
  const location = useLocation();
  // Redirect only if at base help-center path
  useEffect(() => {
    if (location.pathname === "/help-center" && helpArticles.length > 0) {
      const defaultSection = helpArticles.find((s) => s.id === 1);
      if (defaultSection && defaultSection.problem_solutions.length > 0) {
        const firstArticleId = defaultSection.problem_solutions[0].id;
        navigate(`/help-center/1/${firstArticleId}`, { replace: true });
      }
    }
  }, [location.pathname, helpArticles, navigate]);

  const handleCategoryClick = (id) => {
    setOpenCategory((prev) => (prev === id ? null : id));
  };

  return (
    <aside className="min-w-[340px] mt-5 bg-white pt-10 pl-5 pr-5 pb-10 rounded-lg shadow-md ">
      {helpArticles.map((section) => (
        <div key={section.id} className="mb-5">
          <h3
            className="font-bold text-lg cursor-pointer flex gap-3 items-center p-3 rounded-lg hover:bg-gray-200"
            onClick={() => handleCategoryClick(section.id)}
          >
            <div className="bg-[#EAECF0] p-2 rounded-lg">
              <FaFolder className="text-gray-500" />
            </div>
            <span>{section.title}</span>
            <span className="bg-[#EAECF0] text-textBlack px-2 py-[3px] rounded-full text-xs">
              {section.problem_solutions.length}
            </span>
          </h3>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openCategory === section.id
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <ul className="pl-6 space-y-2">
              {section.problem_solutions.map((article) => (
                <li
                  key={article.id}
                  className="transition-all duration-300 border-l-[.25px] border-[#00000015]"
                >
                  <NavLink
                    to={`/help-center/${section.id}/${article.id}`}
                    onClick={onNavLinkClick}
                    className={({ isActive }) =>
                      `block pl-4 py-2 text-textBlack text-sm transition-all duration-300 ${
                        isActive
                          ? "bg-[#E8FFF4] text-textBlack border-l-4 border-red-500"
                          : "border-l-4 border-transparent hover:bg-[#F5F5F5]"
                      }`
                    }
                  >
                    {article.question}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </aside>
  );
};

export default HelpCenterSidebar;
