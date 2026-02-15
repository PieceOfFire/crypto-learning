import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      proxy: {
        "/api/coingecko": {
          target: "https://api.coingecko.com",
          changeOrigin: true,
          rewrite: (url) => url.replace(/^\/api\/coingecko/, "/api/v3"),
          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              if (env.VITE_COINGECKO_API_KEY) {
                proxyReq.setHeader("x-cg-demo-api-key", env.VITE_COINGECKO_API_KEY);
              }
            });
          },
        },
      },
    },
  };
});
