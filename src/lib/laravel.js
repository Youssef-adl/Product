/**
 * Laravel API Utility
 * Centralizes all communication with the Laravel backend at http://localhost:8000/api
 */

const LARAVEL_API = process.env.LARAVEL_API_URL || "http://localhost:8000/api";

/**
 * Make a request to the Laravel API.
 * @param {string} path - e.g. "/products", "/login"
 * @param {object} options - fetch options (method, body, token, etc.)
 */
export async function laravelFetch(path, { method = "GET", body, token } = {}) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${LARAVEL_API}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data?.message || `Laravel API error: ${res.status}`);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}
