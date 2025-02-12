const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8001";

const fetchWithAuth = async (url, options = {}) => {
  const response = await fetch(url, options);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.detail || `Request failed with status ${response.status}`);
  }
  return data;
};

export const register = async (userData) =>
  fetchWithAuth(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

export const login = async (credentials) =>
  fetchWithAuth(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  export const logout = async (token) =>
    fetchWithAuth(`${API_URL}/auth/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ token }),
    });

export const getUserProfile = async (token) =>
  fetchWithAuth(`${API_URL}/auth/me?token=${token}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateUserProfile = async (token, updateData) =>
  fetchWithAuth(`${API_URL}/auth/me?token=${token}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(updateData),
  });
