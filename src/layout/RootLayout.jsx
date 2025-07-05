/* eslint-disable no-unused-vars */
import LoadingComponent from "@/components/loaders/LoadingComponent";
import { useAuth } from "@/providers/AuthProvider";
import Footer from "@/shared/Footer"
import Header from "@/shared/Header"
import Topbar from "@/shared/Topbar";
import { Toaster } from "react-hot-toast";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom"

const RootLayout = () => {
    const { user,isUserLoading } = useAuth();
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/forget-password' || location.pathname === '/confirm' || location.pathname === '/verification' || location.pathname === '/reset-password';
    
    if (isUserLoading) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <LoadingComponent/>
            </div>
        );
    }
    
    return (
        <div className="w-full font-primary bg-[#FBFBFB]">
            {
                !isAuthPage && <Topbar />
            }
            <Header />
            <main className="w-full min-h-screen">
                <Outlet />
            </main>
            {
                !isAuthPage && <Footer />
            }
            <ScrollRestoration />
            <Toaster />
        </div>
    )
}

export default RootLayout