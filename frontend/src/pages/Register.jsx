import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/Card";
import Alert from "../components/Alert";

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
      <Card variant="bordered">
        <h2 className="text-2xl font-semibold text-green-800 mb-6">Register</h2>
        {error && <Alert message={error} type="error" />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Username"
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" variant="primary" size="lg">
            Start Your Green Journey 🌱
          </Button>
        </form>
        <p className="text-sm text-green-700 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:text-green-700">
            Log In
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;