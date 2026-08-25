const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

const handleResponse = (res) => {
  if (res.ok) return res.json();

  return res.json().then(
    (error) =>
      Promise.reject(new Error(error.message || `Error: ${res.status}`)),
    () => Promise.reject(new Error(`Error: ${res.status}`)),
  );
};

export const register = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);

export const login = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleResponse);
