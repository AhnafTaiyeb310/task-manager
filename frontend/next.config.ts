import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_API_URL || "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async rewrites() {
    return [
      // Match paths ending with a trailing slash
      {
        source: "/api/:path*/",
        destination: `${BACKEND_URL}/api/:path*/`,
      },
      // Fallback for paths without a trailing slash
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
