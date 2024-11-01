/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["tailwindui.com", "res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
