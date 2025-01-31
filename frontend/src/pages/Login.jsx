// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { login } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Alert from "../components/Alert";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login: loginContext } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await login(form);
      loginContext({
        username: response.username,
        email: form.email,
        access_token: response.access_token
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <Card variant="bordered" className="w-full max-w-lg p-8">
        <h2 className="text-3xl font-semibold text-green-800 mb-8">Login</h2>
        {error && <Alert type="error" message={error} className="mb-6" />}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button 
            type="submit" 
            variant="primary" 
            size="lg" 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login 🌱"}
          </Button>
        </form>

        <p className="text-sm text-green-700 mt-6 text-center">
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