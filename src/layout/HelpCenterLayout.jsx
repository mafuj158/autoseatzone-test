import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import Footer from "@/shared/Footer";
import Header from "@/shared/Header";
import HelpCenterSidebar from "@/shared/HelpCenterSidebar";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import Topbar from "@/shared/Topbar";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import useHelpTypeApi from "@/hooks/helpHooks/useHelpTypeApi";
import LoadingComponent from "@/components/loaders/LoadingComponent";

const HelpCenterLayout = () => {
  const {
    helpTypes: helpArticles,
    isLoading,
    isError,
    error,
  } = useHelpTypeApi();

  //   console.log("Help Articles:", helpArticles);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavLinkClick = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <div className="w-full bg-[#FBFBFB] font-primary flex flex-col min-h-screen">
      <Topbar />
      <Header />

      <main className="container flex flex-1 gap-10 py-4 relative">
        {/* Mobile sidebar toggle button */}
        <button
          className={`lg:hidden fixed top-35 right-4 z-30 border-primary border bg-white text-primary p-2 rounded-full shadow-md transition-all ${
            sidebarOpen ? "transform rotate-180" : ""
          }`}
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? (
            <GoSidebarExpand size={24} />
          ) : (
            <GoSidebarCollapse size={24} />
          )}
        </button>

        {/* Mobile Sidebar (overlay) */}
        <div
          className={`fixed top-0 left-0 h-full bg-white z-40 p-4 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <HelpCenterSidebar
            helpArticles={helpArticles}
            onNavLinkClick={handleNavLinkClick}
          />
        </div>

        {/* Backdrop for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block lg:w-1/4 min-w-[300px] ">
          <HelpCenterSidebar helpArticles={helpArticles} />
        </aside>
        {/* Main Content */}
        <section className="flex-1 w-full  h-fit ">
          <Outlet context={{ helpArticles }} />
        </section>
      </main>

      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default HelpCenterLayout;
