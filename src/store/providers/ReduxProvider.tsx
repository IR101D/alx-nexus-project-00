'use client';
import { Provider } from "react-redux";
import { store } from "..";
import { useEffect } from "react";
import { fetchCartFromApi } from "@/src/store/slices/cartSlice";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Hydrate cart from backend on app start (client-side only)
    if (typeof window !== 'undefined') {
      // dispatch directly via store to avoid hook usage before Provider
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (store.dispatch as any)(fetchCartFromApi());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}