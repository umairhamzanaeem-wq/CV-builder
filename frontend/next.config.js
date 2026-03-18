/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const backendUrl =
      process.env.BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://127.0.0.1:8000";

    return [
      // Local dev defaults to localhost backend. In production, set BACKEND_URL on Vercel.
      { source: "/api/proxy/:path*", destination: `${backendUrl}/:path*` },
    ];
  },
};

module.exports = nextConfig;
