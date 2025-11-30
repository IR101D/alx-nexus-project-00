import { ApiProduct } from "@/interfaces";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nexus-backend-4.up.railway.app";
const BASE_URL = `${BASE.replace(/\/$/, "")}/api/products`;

const getProductDetail = async (id: string): Promise<ApiProduct> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch product's detail : ${res.status} ${text}`);
    }
    const data = await res.json();
    return data as ApiProduct;
  } catch (err) {
    throw err;
  }
};

export const updateProduct = async (id: string, product: Partial<ApiProduct>): Promise<ApiProduct> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to update product: ${res.status} ${text}`);
    }
    const data = await res.json();
    return data as ApiProduct;
  } catch (err) {
    throw err;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to delete product: ${res.status} ${text}`);
    }
  } catch (err) {
    throw err;
  }
};

export default {
  getProductDetail,
  updateProduct,
  deleteProduct,
};
