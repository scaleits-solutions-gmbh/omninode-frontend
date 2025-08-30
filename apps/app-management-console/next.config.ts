import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['frontend-common-kit'],
  basePath: '/app-management-console',
};

export default nextConfig;
