/** @type {import('next').NextConfig} */
const nextConfig = {  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloundinary.com',
        port: '',
      },
    ],
  },};

export default nextConfig;
