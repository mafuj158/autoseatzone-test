import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/images/main-logo.png";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/providers/AuthProvider";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isLoading, logout } = useAuth();
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Help Center", path: "/help-center" },
    { name: "Contact Us", path: "/contact" },
    { name: "My Cart", path: "/cart" },
  ];
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (user) {
      logout();
    }
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 py-[33px] bg-[#FBFBFB] hidden xl:block">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Site Logo" className="h-10" />
          </Link>

          {/* Navigation Links */}
          <nav>
            <ul className="flex gap-[50px]">
              {navlinks.map((link, index) => {
                const isActive = location.pathname === link.path;
                return (
                  <li key={index}>
                    <Link
                      to={link.path}
                      className={`leading-7 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "text-textBlack hover:text-primary"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Side Buttons */}
          <div className="flex items-center gap-6">
            <Link
              to="/product/custom-fit-leather-seat-covers/"
              className="text-white bg-primary border rounded-lg text-xl font-semibold py-4 px-8 hover:opacity-90 leading-7"
            >
              Configure Your Design
            </Link>
            {user ? (
              <Link
                onClick={() => handleLogout()}
                className="text-primary hover:text-white hover:bg-primary transition-all duration-150 ease-in bg-white border rounded-lg text-xl font-semibold py-4 px-8 hover:opacity-90 leading-7"
              >
                Log Out
              </Link>
            ) : (
              <Link
                to={"/login"}
                className="text-white bg-[#111946] border rounded-lg text-xl font-semibold py-4 px-8 hover:opacity-90 leading-7"
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <header className="sticky top-0 z-50 py-4 bg-[#FBFBFB] flex justify-between items-center px-4 xl:hidden">
        <Link to="/">
          <img src={logo} alt="Site Logo" className="h-8" />
        </Link>

        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-md focus:outline-none"
        >
          {isMobileMenuOpen ? (
            <FiX className="w-6 h-6 text-textBlack" />
          ) : (
            <FiMenu className="w-6 h-6 text-textBlack" />
          )}
        </button>

        {/* mobile menu  */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: "100%" }}
                transition={{ type: "tween" }}
                className="fixed inset-y-0 h-6/7 right-0 z-50 w-full bg-white shadow-lg"
              >
                <div className="flex flex-col h-full p-6">
                  <div className="flex justify-end mb-8">
                    <button
                      onClick={toggleMobileMenu}
                      className="p-2 rounded-md focus:outline-none"
                    >
                      <FiX className="w-6 h-6 text-textBlack" />
                    </button>
                  </div>

                  <nav className="flex-1">
                    <ul className="space-y-6">
                      {navlinks.map((link, index) => (
                        <li key={index}>
                          <Link
                            to={link.path}
                            onClick={toggleMobileMenu}
                            className={`text-lg block py-2 ${
                              location.pathname === link.path
                                ? "text-primary font-semibold"
                                : "text-textBlack hover:text-primary"
                            }`}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  <div className="mt-auto space-y-4 pt-8">
                    <Link
                      to="/product/custom-fit-leather-seat-covers/"
                      onClick={toggleMobileMenu}
                      className="block w-full text-center text-white bg-primary border rounded-lg text-lg font-semibold py-3 px-6 hover:opacity-90 leading-7"
                    >
                      Configure Your Design
                    </Link>
                  </div>
                </div>
              </motion.div>
              <div
                className="fixed inset-0 z-40 bg-black bg-opacity-50"
                onClick={toggleMobileMenu}
              />
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;
