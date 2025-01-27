// components/Select.jsx
const Select = ({ label, options, value, onChange, error, className = '' }) => (
    <div className="w-full">
      {label && <label className="block text-green-700 mb-3 text-lg">{label}</label>}
      <select
        value={value}
        onChange={onChange}
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
      >
        <option value="">Select option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

export default Select;