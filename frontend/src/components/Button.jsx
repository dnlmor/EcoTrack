// components/Button.jsx
const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled }) => {
    const baseStyle = "rounded-lg font-medium transition-colors";
    const variants = {
      primary: "bg-green-600 text-white hover:bg-green-700",
      secondary: "bg-white text-green-600 border-2 border-green-600 hover:bg-green-50",
      outline: "bg-transparent text-green-600 border border-green-600 hover:bg-green-50"
    };
    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3",
      lg: "px-8 py-4 text-lg"
    };
  
    return (
      <button 
        className={`${baseStyle} ${variants[variant]} ${sizes[size]}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

export default Button;