import { ApiProduct } from "@/interfaces";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nexus-backend-4.up.railway.app";
const BASE_URL = `${BASE.replace(/\/$/, "")}/api/products`;

export const getProducts = async (): Promise<ApiProduct[]> => {
  try {
    const res = await fetch(BASE_URL, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch products: ${res.status} ${text}`);
    }
    const data = await res.json();
    return data as ApiProduct[];
  } catch (err) {
    throw err;
  }
};

export default {
  getProducts,
};
