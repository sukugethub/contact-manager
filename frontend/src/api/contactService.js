// Use relative URL so Vite dev server can proxy /api to the backend during development
const API_URL = "/api/contacts";

// Parse response and throw on non-OK
async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch (e) {
    try {
      data = await res.text();
    } catch (e2) {
      data = null;
    }
  }

  if (!res.ok) {
    const message = (data && (data.message || JSON.stringify(data))) || res.statusText;
    throw new Error(message);
  }

  return data;
}

// Get all contacts
export const getContacts = async () => {
  const res = await fetch(API_URL);
  return handleResponse(res);
};

// Search contacts by name
export const searchContact = async (name) => {
  const res = await fetch(`${API_URL}/search/${encodeURIComponent(name)}`);
  return handleResponse(res);
};

// Add a new contact
export const addContact = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};