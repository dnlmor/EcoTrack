// services/authService.js
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8001/auth";

export const register = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
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
  const response = await fetch(`${API_URL}/login`, {
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
  const response = await fetch(`${API_URL}/logout`, { // Changed to GET as per AuthDocx.md
    method: "GET",
    headers: { 
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Logout failed");
  }

  return response.json();
};

export const getCurrentUser = async (token) => {
  const response = await fetch(`${API_URL}/me`, {
    method: "GET",
    headers: { 
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get detailed error information
    console.error('Error fetching user data:', errorData); // Log detailed error
    throw new Error(errorData.detail || "Failed to fetch user data");
  }

  return response.json();
};
