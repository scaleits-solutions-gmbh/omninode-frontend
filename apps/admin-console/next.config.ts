import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-avatar', '@radix-ui/react-checkbox', '@radix-ui/react-collapsible'],
  },
};

export default nextConfig;
