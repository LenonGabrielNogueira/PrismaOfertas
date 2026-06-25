/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true
    },
    allowedDevOrigins: [
        '192.168.1.13',
        'localhost',
    ],
};

export default nextConfig;