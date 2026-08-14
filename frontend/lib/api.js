// Backend bilan ishlash uchun markazlashgan fetch wrapper.
// Kontrakt: docs/API_CONTRACT.md

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

function buildQuery(params = {}) {
  const entries = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== null && value !== ""
  );
  if (entries.length === 0) return "";
  const search = new URLSearchParams();
  entries.forEach(([key, value]) => search.set(key, value));
  return `?${search.toString()}`;
}

async function apiFetch(path, options = {}) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch (err) {
    throw new Error(
      "Serverga ulanib bo'lmadi. Backend ishlab turganini tekshiring."
    );
  }

  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }

  if (!res.ok) {
    const message =
      (data && data.error) || `So'rovda xatolik yuz berdi (${res.status})`;
    throw new Error(message);
  }

  return data;
}

// --- Items ---

export function getItems(params = {}) {
  return apiFetch(`/api/items${buildQuery(params)}`);
}

export function getItem(id) {
  return apiFetch(`/api/items/${id}`);
}

export function createItem(payload) {
  return apiFetch(`/api/items`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateItemStatus(id, status) {
  return apiFetch(`/api/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export function deleteItem(id) {
  return apiFetch(`/api/items/${id}`, { method: "DELETE" });
}

// --- Recycling points ---

export function getPoints(params = {}) {
  return apiFetch(`/api/points${buildQuery(params)}`);
}

export function getPoint(id) {
  return apiFetch(`/api/points/${id}`);
}
