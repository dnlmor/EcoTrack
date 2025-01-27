// components/Badge.jsx
const Badge = ({ label, type = 'default' }) => {
    const types = {
      default: "bg-green-100 text-green-800",
      success: "bg-green-500 text-white",
      warning: "bg-yellow-100 text-yellow-800",
      info: "bg-blue-100 text-blue-800"
    };
   
    return (
      <span className={`${types[type]} px-3 py-1 rounded-full text-sm font-medium`}>
        {label}
      </span>
    );
   };

export default Badge;