/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // Use 127.0.0.1 to avoid IPv6 (::1) connection refused when backend is on IPv4
      { source: '/api/proxy/:path*', destination: 'http://127.0.0.1:8000/:path*' },
    ];
  },
};

module.exports = nextConfig;
