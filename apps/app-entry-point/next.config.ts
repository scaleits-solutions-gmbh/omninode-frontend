/** @type {import('next').NextConfig} */
const isLocal = process.env.STAGE === 'local';

const nextConfig = {
  async rewrites() {
    if (!isLocal) return []; // no local proxying in prod/preview
    return [
      { source: '/user-portal/:path*',        destination: 'http://localhost:3001/user-portal/:path*' },
      { source: '/management-console/:path*', destination: 'http://localhost:3002/management-console/:path*' },
      { source: '/service-portal/:path*',     destination: 'http://localhost:3003/service-portal/:path*' },
    ];
  },
};

module.exports = nextConfig;