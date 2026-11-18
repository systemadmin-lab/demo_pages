import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow HMR and client hydration when opening the local site by its IP address.
  allowedDevOrigins: ["127.0.0.1"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Compile the Tailwind entry stylesheet.
      "globals.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
