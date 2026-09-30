const API_BASE_URL = 'http://localhost:5000/api';

async function apiRequest(endpoint, options = {}) {
  const { method = 'GET', headers = {}, body, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    ...rest
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }

  return data;
}

export { apiRequest, API_BASE_URL };
