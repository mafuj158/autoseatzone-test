import { Link } from "react-router-dom";

const CommonBtn = ({ text, onClick, type = "button", className = "", linkUrl, disabled = false, loading = false }) => {
    if (linkUrl) {
        return (
            <Link to={linkUrl}>
                <div
                    className={`cursor-pointer py-2 xl:px-8 xl:py-4 lg:text-xl font-semibold rounded-lg bg-primary text-white hover:bg-opacity-80 transition ${className}`}
                >
                    {text}
                </div>
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`cursor-pointer py-2 xl:px-8 xl:py-4 lg:text-xl font-semibold rounded-lg bg-primary text-white hover:bg-opacity-80 transition ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''
                } ${className}`}
        >
            {loading ? "Sending..." : text}
        </button>
    );
};

export default CommonBtn;
