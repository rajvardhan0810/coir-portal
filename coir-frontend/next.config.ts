import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/schermes/:path*",
        destination: "/schemes/:path*",
        permanent: true,
      },
      {
        source: "/schemes/:schemeId/details",
        destination: "/schemes/:schemeId",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

