import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { ensureGuestToken } from "@/src/services/cartService";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    try {
      ensureGuestToken();
    } catch (e) {
    }
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
