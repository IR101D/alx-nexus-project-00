import { CheckoutRequest, CheckoutResponse, ShippingAddress, TrackOrderRequest, TrackOrderResponse } from "@/interfaces";
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

// Track order status by orderId or trackingCode along with email
export const trackOrder = async (
  params: TrackOrderRequest
): Promise<TrackOrderResponse> => {
  const url = `${BASE_URL}/track`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        orderId: params.orderId,
        trackingCode: params.trackingCode,
        email: params.email,
      } satisfies TrackOrderRequest),
    });

    if (!res.ok) {
      const text = await res.text();
      // Return a friendly message instead of throwing
      return {
        orderId: params.orderId,
        email: params.email,
        steps: [],
        message:
          "Unable to fetch tracking information at the moment. Please verify your details and try again.",
      } as TrackOrderResponse;
    }

    const data = (await res.json()) as TrackOrderResponse;
    return data;
  } catch (error) {
    // Network or parsing error: return friendly message
    return {
      orderId: params.orderId,
      email: params.email,
      steps: [],
      message:
        "We couldn't load your tracking details due to a network issue. Please check your connection and try again.",
    } as TrackOrderResponse;
  }
};

const ordersService = {
  checkoutOrder,
  trackOrder,
};

export default ordersService;
