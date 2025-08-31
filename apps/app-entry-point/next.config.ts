import type { NextConfig } from "next";

const nextConfig: NextConfig = () => {
  console.warn("nextConfig", process.env.STAGE);
  return {
    async rewrites() {
      const stage = process.env.STAGE;
      if (!stage || stage === "local") {
        return [
          // User Portal → local domain
          {
            source: "/user-portal",
            destination: "http://localhost:3001/user-portal",
          },
          {
            source: "/user-portal/:path*",
            destination: "http://localhost:3001/user-portal/:path*",
          },
          // Management Console → local domain
          {
            source: "/management-console",
            destination: "http://localhost:3002/management-console",
          },
          {
            source: "/management-console/:path*",
            destination: "http://localhost:3002/management-console/:path*",
          },
          // Service Portal → local domain
          {
            source: "/service-portal",
            destination: "http://localhost:3003/service-portal",
          },
          {
            source: "/service-portal/:path*",
            destination: "http://localhost:3003/service-portal/:path*",
          },
        ];
      }
      if (stage === "prod") {
        return [
          // User Portal → prod domain
          {
            source: "/user-portal",
            destination: `https://user-portal.omninode.one/user-portal`,
          },
          {
            source: "/user-portal/:path*",
            destination: `https://user-portal.omninode.one/user-portal/:path*`,
          },
          // Management Console → prod domain
          {
            source: "/management-console",
            destination: `https://management-console.omninode.one/management-console`,
          },
          {
            source: "/management-console/:path*",
            destination: `https://management-console.omninode.one/management-console/:path*`,
          },
          // Service Portal → prod domain
          {
            source: "/service-portal",
            destination: `https://service-portal.omninode.one/service-portal`,
          },
          {
            source: "/service-portal/:path*",
            destination: `https://service-portal.omninode.one/service-portal/:path*`,
          },
        ];
      }
      return [
        // User Portal → stage domain
        {
          source: "/user-portal",
          destination: `https://${stage}.user-portal.omninode.one/user-portal`,
        },
        {
          source: "/user-portal/:path*",
          destination: `https://${stage}.user-portal.omninode.one/user-portal/:path*`,
        },
        // Management Console → stage domain
        {
          source: "/management-console",
          destination: `https://${stage}.management-console.omninode.one/management-console`,
        },
        {
          source: "/management-console/:path*",
          destination: `https://${stage}.management-console.omninode.one/management-console/:path*`,
        },
        // Service Portal → stage domain
        {
          source: "/service-portal",
          destination: `https://${stage}.service-portal.omninode.one/service-portal`,
        },
        {
          source: "/service-portal/:path*",
          destination: `https://${stage}.service-portal.omninode.one/service-portal/:path*`,
        },
      ];
    },
  };
};

export default nextConfig;
