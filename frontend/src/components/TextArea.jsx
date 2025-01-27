const Textarea = ({ label, value, onChange, error, rows = 4 }) => (
    <div className="w-full">
      {label && <label className="block text-green-700 mb-2">{label}</label>}
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none
          ${error ? 'border-red-300' : 'border-green-200'}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
   );

export default Textarea;