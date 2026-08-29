import { handleServerResponse } from "./api";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";
const headers = { "Content-Type": "application/json" };

export const register = ({ name, avatar, email, password }) =>
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleServerResponse);

export const login = ({ email, password }) =>
  fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({ email, password }),
  }).then(handleServerResponse);

export const checkToken = (token) =>
  fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleServerResponse);
