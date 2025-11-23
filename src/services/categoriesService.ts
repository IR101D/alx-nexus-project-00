import { Category } from "@/interfaces";

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://nexus-backend-4.up.railway.app";
const BASE_URL = `${BASE.replace(/\/$/, "")}/api/categories`;

export const getCategories = async (): Promise<Category[]> => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to fetch categories: ${res.status} ${text}`);
    }
    const data = await res.json();
    return data as Category[];
  } catch (err) {
    throw err;
  }
};

export const addCategory = async (
  category: Omit<Category, "id" | "createdAt" | "updatedAt">
): Promise<Category> => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Failed to add category: ${res.status} ${text}`);
    }
    const data = await res.json();
    return data as Category;
  } catch (err) {
    throw err;
  }
};

export default {
  getCategories,
  addCategory,
};
