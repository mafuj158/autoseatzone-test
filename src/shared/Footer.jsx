import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/images/footerlogo.png";
import useGetCmsData from "@/hooks/useGetCmsData";

const Footer = () => {
  const { data } = useGetCmsData('/social-links');

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "FAQS", path: "/contact#faqArea" },
    // { name: "Track Your Order", path: "/track-order" },
    { name: "Shipping & Return Policy", path: "/return-policy" },
    { name: "Blog", path: "/blog" },
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Contact Us", path: "/contact" },
    { name: "Signup", path: "/register" },
    { name: "Login", path: "/login" },
  ];

  const customerservicehours = [
    { name: "Monday 10.30 - 16.30 EST" },
    { name: "Tuesday 10.30 - 16.30 EST" },
    { name: "Wednesday 10.30 - 16.30 EST" },
    { name: "Thursday 10.30 - 16.30 EST" },
    { name: "Friday 10.30 - 16.30 EST" },
    { name: "Saturday Closed" },
    { name: "Sunday Closed" },
  ];

  return (
    <footer className="bg-[#06163A] mt-12 xl:mt-40 pt-14 pb-10 text-[#BDBDBD]">
      <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 justify-between">
        {/* Logo & Description */}
        <motion.div
          className="max-w-[383px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-[186px] h-[66px] mb-4">
            <img
              src={logo}
              alt="Company Logo"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="leading-relaxed text-sm text-[#F7F7F7]">
            At Auto Seat Zone, we believe in affordable luxury. Our seat covers offer the opulence of high-end products at a price that won’t break the bank. Experience the Auto Seat Zone difference – where quality meets craftsmanship.
          </p>

          {/* Social Media Icons */}
          <div className="xl:flex gap-2 mt-5 hidden">
            {data?.data?.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white rounded-full inline-flex items-center justify-center"
              >
                <img
                  src={social.icon}
                  alt={`${social.name} icon`}
                  className="w-6 h-6 object-contain"
                />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white font-bold mb-4 text-xl lg:text-[25px] leading-[30px]">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <Link to={link.path} className="uppercase text-[#BDBDBD] hover:text-[#EE3131]">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Customer Service */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-white font-bold mb-4 text-xl lg:text-[25px] leading-[30px]">
            Customer Service
          </h3>
          <ul className="space-y-3 text-sm font-medium">
            {customerservicehours.map((hour, index) => (
              <li key={index} className="text-[#BDBDBD]">
                {hour.name}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
