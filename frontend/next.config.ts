import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: ["res.cloudinary.com"], // Cloudinary hostname
    },
    reactStrictMode: true,
};

export default nextConfig;
