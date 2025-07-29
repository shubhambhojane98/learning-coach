import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // proxy this
        destination: "http://localhost:5000/api/:path*", // to your Express backend
      },
    ];
  },
};

export default nextConfig;
