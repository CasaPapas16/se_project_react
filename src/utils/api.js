const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return res.json().then(
    (error) =>
      Promise.reject(new Error(error.message || `Error: ${res.status}`)),
    () => Promise.reject(new Error(`Error: ${res.status}`)),
  );
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: { ...headers, authorization: `Bearer ${token}` },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

export const removeItem = (itemId, token) => {
  return fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers: { ...headers, authorization: `Bearer ${token}` },
  }).then(handleServerResponse);
};
