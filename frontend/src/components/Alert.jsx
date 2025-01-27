// components/Alert.jsx
const Alert = ({ message, type = 'info', onClose }) => {
    const types = {
      info: "bg-blue-50 text-blue-800 border-blue-200",
      success: "bg-green-50 text-green-800 border-green-200",
      warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
      error: "bg-red-50 text-red-800 border-red-200"
    };
   
    return (
      <div className={`${types[type]} border rounded-lg p-4 flex justify-between items-center`}>
        <p>{message}</p>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ×
          </button>
        )}
      </div>
    );
   };

export default Alert;