/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/insight/:slug",
        destination: "/insights/:slug",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
