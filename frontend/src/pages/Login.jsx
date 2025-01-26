import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Alert from "../components/Alert";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const { login: loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      loginUser({ username: data.username, token: data.access_token });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
  <Card variant="bordered" className="w-full max-w-lg p-8"> {/* Increased to max-w-lg */}
    <h2 className="text-3xl font-semibold text-green-800 mb-8">Login</h2> {/* Increased text and margin */}
    {error && <Alert message={error} type="error" className="mb-6" />}
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
      label="Email"
      type="email"
      value={form.email}
      onChange={(e) => setForm({ ...form, email: e.target.value })}
      className="h-12 text-lg" // Increased height
      />
      <Input
      label="Password" 
      type="password"
      value={form.password}
      onChange={(e) => setForm({ ...form, password: e.target.value })}
      className="h-12 text-lg"  // Increased height
      />
      <Button type="submit" variant="primary" size="lg" className="w-full py-4 text-lg">
        Login 🌱
      </Button>
    </form>
    <p className="text-base text-green-700 mt-8 text-center">
      Don't have an account?{" "}
      <Link to="/register" className="text-green-600 hover:text-green-700">
        Sign Up
      </Link>
    </p>
  </Card>
</div>
  );
};

export default Login;
