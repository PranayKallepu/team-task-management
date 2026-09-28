export const API_URL = "http://localhost:5000/api/v1";

/**
 * A reusable fetch wrapper for making API calls.
 * Automatically handles JSON stringification, parsing, and error throwing.
 */
export async function apiClient(endpoint, options = {}) {
  const url = endpoint.startsWith("http") ? endpoint : `${API_URL}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // Only stringify the body if it's an object and not already a string/FormData
  let body = options.body;
  if (body && typeof body === "object" && !(body instanceof FormData)) body = JSON.stringify(body);

  const res = await fetch(url, { ...options, headers, body });

  let data = null;
  try {
    // Some responses might be empty (204 No Content), so we safely parse
    data = await res.json();
  } catch (e) {
    data = {};
  }

  // Throw an error so the caller's try/catch block can handle it cleanly
  if (!res.ok) throw new Error(data?.message || `API Error: ${res.status} ${res.statusText}`);

  // We return 'res' as well so you can still access headers (like 'set-cookie')
  return { res, data };
}
