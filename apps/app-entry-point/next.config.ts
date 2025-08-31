import type { NextConfig } from "next";

const nextConfig: NextConfig = () => {
  const isDevelopment = process.env.NODE_ENV === "development";
  return {
    async rewrites() {
      if (!isDevelopment) {
        return [];
      }
      return [
        // User Portal (port 3001)
        {
          source: "/user-portal",
          destination: "http://localhost:3001/user-portal",
        },
        {
          source: "/user-portal/:path*",
          destination: "http://localhost:3001/user-portal/:path*",
        },
        // Management Console (port 3002)
        {
          source: "/management-console",
          destination: "http://localhost:3002/app-management-console",
        },
        {
          source: "/management-console/:path*",
          destination: "http://localhost:3002/app-management-console/:path*",
        },
        // Service Portal (port 3003)
        {
          source: "/service-portal",
          destination: "http://localhost:3003/service-portal",
        },
        {
          source: "/service-portal/:path*",
          destination: "http://localhost:3003/service-portal/:path*",
        },
      ];
    },
  };
};

export default nextConfig;
