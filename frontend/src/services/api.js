const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/+$/, '');

async function postJson(endpoint, payload) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Unable to reach the server. Please check your connection and try again.');
  }

  let data = null;
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (!response.ok) {
    const message =
      data && typeof data.message === 'string' && data.message.trim()
        ? data.message
        : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data || {};
}

export function registerUser({ name, email, password }) {
  return postJson('/api/auth/register', { name, email, password });
}

export function loginUser({ email, password }) {
  return postJson('/api/auth/login', { email, password });
}