import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
 <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-xl border border-green-100">
   <h2 className="text-2xl font-semibold text-green-800 mb-6">Register</h2>
   {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
   <form onSubmit={handleSubmit} className="space-y-4">
     <div>
       <label htmlFor="username" className="block text-green-700 mb-1">
         Username
       </label>
       <input
         id="username"
         type="text"
         placeholder="Username"
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
         value={form.username}
         onChange={(e) => setForm({ ...form, username: e.target.value })}
       />
     </div>
     <div>
       <label htmlFor="email" className="block text-green-700 mb-1">
         Email
       </label>
       <input
         id="email"
         type="email"
         placeholder="Email"
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
         value={form.email}
         onChange={(e) => setForm({ ...form, email: e.target.value })}
       />
     </div>
     <div>
       <label htmlFor="password" className="block text-green-700 mb-1">
         Password
       </label>
       <input
         id="password"
         type="password"
         placeholder="Password"
         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
         value={form.password}
         onChange={(e) => setForm({ ...form, password: e.target.value })}
       />
     </div>
     <button
       type="submit"
       className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
     >
       Start Your Green Journey 🌱
     </button>
   </form>
   <p className="text-sm text-gray-600 mt-4 text-center">
     Already have an account?{" "}
     <a href="/login" className="text-green-600 hover:text-green-700 hover:underline">
       Log In
     </a>
   </p>
 </div>
</div>
  );
};

export default Register;
