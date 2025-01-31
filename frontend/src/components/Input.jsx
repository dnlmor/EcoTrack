const Input = ({ label, type = 'text', value, onChange, error, placeholder, className = '' }) => (
    <div className="w-full">
      {label && <label className="block text-green-700 mb-3 text-lg">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full 
          px-6 
          py-4 
          text-lg 
          border-1
          rounded-xl 
          focus:ring-1 
          focus:ring-green-500 
          focus:outline-none
          bg-green-100
          shadow-sm
          ${error ? 'ring-red-300' : 'ring-0'} 
          ${className}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
   
   export default Input;