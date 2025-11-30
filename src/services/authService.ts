import {RegisterRequest ,RegisterResponse  } from "@/interfaces";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nexus-backend-4.up.railway.app";
const BASE_URL = `${BASE.replace(/\/$/, "")}/api/auth`;


export const register = async (payload: RegisterRequest): Promise<RegisterResponse> => {
  const url = `${BASE_URL}/register`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // Try to parse error message if provided
      try {
        const data = await res.json();
        return { message: data?.message || "Sign up failed. Please try again." };
      } catch {
        const text = await res.text();
        return { message: text || "Sign up failed. Please try again." };
      }
    }

    const data = (await res.json()) as RegisterResponse;
    return data;
  } catch (e) {
    return { message: "Network error. Please check your connection and try again." };
  }
};

const authService = { register };

export default authService;
