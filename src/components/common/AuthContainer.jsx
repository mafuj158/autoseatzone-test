const AuthContainer = ({ children, className = "" }) => {
    return (
      <div
        className={`mx-5 lg:mx-0 rounded-[10px] border border-[#5A778D] bg-[rgba(0,0,0,0.55)] backdrop-blur-[67px] py-12 xl:py-[60px] px-5 lg:px-10 ${className}`}
      >
        {children}
      </div>
    );
  };
  
  export default AuthContainer;
  