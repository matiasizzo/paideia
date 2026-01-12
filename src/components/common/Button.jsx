export const Button = ({ 
  children, 
  variant = "primary", 
  size = "md", 
  className = "",
  ...props 
}) => {
  const baseStyles = "font-raleway font-semibold rounded-lg transition-all duration-300";
  
  const variants = {
    primary: "bg-paideia-primary text-white hover:bg-paideia-primary-light",
    secondary: "bg-paideia-coral text-paideia-primary hover:bg-paideia-mint",
    outline: "border-2 border-paideia-primary text-paideia-primary hover:bg-paideia-cream",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
