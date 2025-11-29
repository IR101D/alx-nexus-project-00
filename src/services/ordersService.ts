import { CheckoutRequest, CheckoutResponse, ShippingAddress } from "@/interfaces";
import cartService from "./cartService";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nexus-backend-4.up.railway.app";
const BASE_URL = `${BASE.replace(/\/\/$/, "")}/api/orders`;

// Helper to append optional guestToken as query param if provided
const withGuestToken = (url: string, guestToken?: string | null) => {
  const u = new URL(url);
  const token = guestToken ?? cartService.getGuestToken();
  if (token) u.searchParams.set("guestToken", token);
  return u.toString();
};

export const checkoutOrder = async (
  shippingAddress: ShippingAddress,
  email?: string,
  guestToken?: string | null
): Promise<CheckoutResponse> => {
  // Ensure a token exists for guests for future flows
  cartService.ensureGuestToken();

  const payload: CheckoutRequest = {
    shippingAddress,
    guestToken: guestToken ?? cartService.getGuestToken(),
      email:email?? ''
  };

  const url = `${BASE_URL}/checkout`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to checkout: ${res.status} ${text}`);
  }
  return res.json();
};

const ordersService = {
  checkoutOrder,
};

export default ordersService;
