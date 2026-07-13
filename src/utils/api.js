const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "appplication/json" };

const handleSeverResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleSeverResponse);
