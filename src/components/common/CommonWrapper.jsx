const CommonWrapper = ({ children, className = '' }) => {
    return (
      <div className={`space-y-[150px] px-5 xl:px-0 w-full ${className}`.trim()}>
        {children}
      </div>
    );
  };
  
  export default CommonWrapper;