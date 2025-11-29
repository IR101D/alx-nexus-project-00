import { ApiCartItemRequest, ApiCartResponse } from "@/interfaces";
const BASE = "http://localhost:8080";
const BASE_URL = `${BASE.replace(/\/$/, "")}/api/cart`;

// Minimal API models matching the backend contract


// Guest token helpers (stored locally)
const GUEST_TOKEN_KEY = "guestToken";

export const getGuestToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(GUEST_TOKEN_KEY);
};

export const ensureGuestToken = (): string => {
    if (typeof window === "undefined") return ""; // SSR safe
    let token = getGuestToken();
    if (!token) {
        token = crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
        window.localStorage.setItem(GUEST_TOKEN_KEY, token);
    }
    return token;
};

// Build URL with optional guest token using spec param names
const withGuestToken = (url: string, guestToken?: string | null, paramName: "guestToken"|"arg0" | "arg1" | "arg2" = "arg0") => {
  const u = new URL(url);
  const token = guestToken ?? getGuestToken();
  if (token) u.searchParams.set(paramName, token);
  return u.toString();
};

export const getMyCart = async (guestToken?: string | null): Promise<ApiCartResponse> => {
  const url = withGuestToken(BASE_URL, guestToken, "guestToken");
  const res = await fetch(url, { method: "GET" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to get cart: ${res.status} ${text}`);
  }
  return res.json();
};

export const addItem = async (item: ApiCartItemRequest, guestToken?: string | null): Promise<ApiCartResponse> => {
  // POST /api/cart/items with optional guest token as arg1
  const url = withGuestToken(`${BASE_URL}/items`, guestToken, "guestToken");
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to add item: ${res.status} ${text}`);
  }
  // Ensure we have a guest token for future requests
  ensureGuestToken();
  return res.json();
};

export const updateItem = async (
  productId: number,
  quantity: number,
  guestToken?: string | null
): Promise<ApiCartResponse> => {
  // PUT /api/cart/items/{productId}?arg1=<quantity>&arg2=<guestToken>
  const base = `${BASE_URL}/items/${encodeURIComponent(productId)}`;
  const u = new URL(base);
  u.searchParams.set("quantity", String(quantity));
  const token = guestToken ?? getGuestToken();
  if (token) u.searchParams.set("guestToken", token);
  const res = await fetch(u.toString(), { method: "PUT" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update item: ${res.status} ${text}`);
  }
  return res.json();
};

export const removeItem = async (productId: number, guestToken?: string | null): Promise<ApiCartResponse> => {
  // DELETE /api/cart/items/{productId}?arg1=<guestToken>
  const url = withGuestToken(`${BASE_URL}/items/${encodeURIComponent(productId)}`, guestToken, "guestToken");
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to remove item: ${res.status} ${text}`);
  }
  return res.json();
};

export const clearCart = async (guestToken?: string | null): Promise<void> => {
  // DELETE /api/cart/clear?arg0=<guestToken>
  const url = withGuestToken(`${BASE_URL}/clear`, guestToken, "guestToken");
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to clear cart: ${res.status} ${text}`);
  }
};

const cartService = {
  getMyCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
  getGuestToken,
  ensureGuestToken,
};

export default cartService;
