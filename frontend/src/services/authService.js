// services/authService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: userData.username,
      email: userData.email,
      password: userData.password
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Registration failed");
  }

  return response.json();
};

export const login = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Invalid credentials");
  }

  return response.json();
};

export const logout = async (token) => {
  const response = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Logout failed");
  }

  return response.json();
};