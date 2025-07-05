import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/page/Home";
import RootLayout from "@/layout/RootLayout";
import Register from "@/page/AuthPages/Register";
import Login from "@/page/AuthPages/Login";
import ForgetPassword from "@/page/AuthPages/ForgetPassword";
import ResetPassword from "@/page/AuthPages/ResetPassword";
import ConfirmCode from "@/page/AuthPages/ConfirmCode";
import VerificationCode from "@/page/AuthPages/VerificationCode";
import AboutUs from "@/page/AboutUs";
import ContactUs from "@/page/ContactUs";
const Blog = lazy(() => import("@/page/Blog"));
// import Blog from "@/page/Blog";
import HelpCenterLayout from "@/layout/HelpCenterLayout";
import Customize from "@/page/Customize";
import Cart from "@/page/Cart";
import Checkout from "@/page/Checkout";
import ArticleContent from "@/page/HelpcenterPage/ArticleContent";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "@/page/PaymentPages/PaymentSuccess";
import HelpCenterNotion from "@/page/HelpcenterPage/HelpCenterNotion";

import LoadingComponent from "@/components/loaders/LoadingComponent";
import TermsAndConditions from "@/page/PolicyPages/TermsAndConditions";
import ShippingPolicy from "@/page/PolicyPages/ShippingPolicy";
import PrivacyPlicy from "@/page/PolicyPages/PrivacyPolicy";
import BlogDetails from "@/page/BlogDetails";
import SingleBlogDetails from "@/components/blog/SingleBlogDetails";
import PaymentError from "@/page/PaymentPages/PaymentError";
import ReturnPolicy from "@/page/PolicyPages/ReturnPolicy";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog-details/:slug",
        element: <BlogDetails />,
      },
      {
        path: "/latest-blog-details",
        element: <SingleBlogDetails />,
      },
      {
        path: "/product/custom-fit-leather-seat-covers/",
        element: <Customize />,
      },
      //   {
      //     path: "/help-center",
      //     element: <HelpCenterLayout />,
      //   },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/success-payment",
        element: <PaymentSuccess />,
      },
      {
        path: "/error-payment",
        element: <PaymentError />,
      },
      {
        path: "/blog",
        element: (
          <Suspense fallback={<LoadingComponent />}>
            <Blog />,
          </Suspense>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/terms-and-conditions",
        element: <TermsAndConditions />,
      },
      {
        path: "/shipping-policy",
        element: <ShippingPolicy />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPlicy />,
      },
      {
        path: "/return-policy",
        element: <ReturnPolicy />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/confirm",
        element: <ConfirmCode />,
      },
      {
        path: "/verification",
        element: <VerificationCode />,
      },
      {
        path: "/help-center",
        element: <HelpCenterNotion />,
      },
    ],
  },
  /**
   * 
   *  {
    path: "/help-center",
    element: <HelpCenterLayout />,
    children: [
      {
        path: ":categoryId/:articleId",
        element: <ArticleContent />
      }

    ]
  },
   * 
   */
  {
    path: "*",
    element: () => <h1>Page Not Found</h1>,
  },
]);

export default router;
