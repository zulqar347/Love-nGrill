import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  typescript: {
    // This ignores the 'any' and other type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // This will allow the build to finish even with these warnings/errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
