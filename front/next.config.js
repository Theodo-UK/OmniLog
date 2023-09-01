/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        typedRoutes: true,
        serverComponentsExternalPackages: ['@prisma/client','bcryptjs']
    },
};

module.exports = nextConfig;
